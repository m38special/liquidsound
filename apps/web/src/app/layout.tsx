import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LiQUiD SOUND",
  description: "AI-powered music content platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
