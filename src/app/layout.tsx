import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
