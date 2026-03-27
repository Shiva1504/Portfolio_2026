import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sambasiva Naidu — Full Stack Developer (Laravel + Next.js)",
  description:
    "Full Stack Developer building production ERP systems with Laravel (APIs) and Next.js (Frontend). REST APIs, deployment & server management.",
  keywords: [
    "Full Stack Developer",
    "Laravel Developer",
    "Next.js Developer",
    "ERP Developer",
    "REST API",
    "PHP",
    "TypeScript",
    "Pune",
    "India",
  ],
  authors: [{ name: "Dasari Sambasiva Naidu" }],
  openGraph: {
    title: "Sambasiva Naidu — Full Stack Developer (Laravel + Next.js)",
    description:
      "Building & maintaining production ERP systems. APIs, deployment & server management.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sambasiva Naidu — Full Stack Developer (Laravel + Next.js)",
    description:
      "Building & maintaining production ERP systems. APIs, deployment & server management.",
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
