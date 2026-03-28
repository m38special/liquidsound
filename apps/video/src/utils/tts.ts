import {
  PollyClient,
  SynthesizeSpeechCommand,
  Engine,
  OutputFormat,
  VoiceId,
} from "@aws-sdk/client-polly";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@liquid-sound/storage";
import { createHash } from "crypto";

// Lazy init for Polly client
let _polly: PollyClient | null = null;
const getPolly = (): PollyClient =>
  _polly ??
  (_polly = new PollyClient({
    region: process.env.AWS_REGION ?? "us-east-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  }));

export interface TTSResult {
  audioUrl: string;
  durationMs: number;
}

/**
 * Synthesize speech for a slide's text via AWS Polly, upload to R2, and return
 * the public URL + estimated duration in milliseconds.
 */
export async function synthesizeSlideAudio(text: string): Promise<TTSResult> {
  const polly = getPolly();

  const command = new SynthesizeSpeechCommand({
    Text: text,
    Engine: Engine.NEURAL,
    OutputFormat: OutputFormat.MP3,
    VoiceId: VoiceId.Joanna,
    SampleRate: "24000",
  });

  const response = await polly.send(command);

  if (!response.AudioStream) {
    throw new Error(`Polly returned no audio stream for text: "${text.slice(0, 40)}..."`);
  }

  // Collect audio stream into a buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of response.AudioStream as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }
  const audioBuffer = Buffer.concat(chunks);

  // Deterministic key based on text hash so identical slides reuse existing audio
  const hash = createHash("sha256").update(text).digest("hex").slice(0, 16);
  const objectKey = `tts/${hash}.mp3`;

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: objectKey,
      Body: audioBuffer,
      ContentType: "audio/mpeg",
    })
  );

  const audioUrl = `${R2_PUBLIC_URL}/${objectKey}`;

  // Polly neural @ 24 kHz MP3 — estimate duration from bitrate (128 kbps standard)
  // More accurate: 128kbps = 16 KB/s
  const durationMs = Math.ceil((audioBuffer.byteLength / ((128 * 1000) / 8)) * 1000);

  return { audioUrl, durationMs };
}
