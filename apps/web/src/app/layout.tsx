import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "LiQUiD SOUND — Sound. Frequency. Creation.",
  description:
    "A next-generation music and creative content studio operating at the intersection of sound design, sacred geometry, and digital art.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
