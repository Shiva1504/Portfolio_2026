import type { Metadata } from "next";
import { Syne, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-2026-theta-three.vercel.app"),
  title: "Sambasiva Naidu | Software Engineer",
  description:
    "Software engineer focused on outcomes, not frameworks. I design systems, ship products, and optimize what's slow across APIs, web apps, AI, and infrastructure.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Laravel Developer",
    "Next.js Developer",
    "REST API",
    "PHP",
    "TypeScript",
    "Pune",
    "India",
  ],
  authors: [{ name: "Dasari Sambasiva Naidu" }],
  openGraph: {
    title: "Sambasiva Naidu | Software Engineer",
    description:
      "Software engineer focused on outcomes, not frameworks. APIs, web apps, AI, and infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sambasiva Naidu | Software Engineer",
    description:
      "Software engineer focused on outcomes, not frameworks. APIs, web apps, AI, and infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${syne.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
