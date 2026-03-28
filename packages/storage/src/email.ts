import { Resend } from "resend";

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

// Lazy init: Resend SDK must not be called at module load time.
let _resend: Resend | null = null;
const getResend = (): Resend => _resend ?? (_resend = new Resend(process.env.RESEND_API_KEY));

export const resend = new Proxy({} as Resend, {
  get: (_, prop) => {
    const client = getResend();
    const value = client[prop as keyof Resend];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});
