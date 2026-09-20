import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { Terminal } from "@/components/terminal/Terminal";

const PLAYGROUND_DESCRIPTION =
  "Interactive developer terminal for exploring Dasari Sambasiva Naidu's profile, projects, skills and experience. Type /help to get started.";

export const metadata: Metadata = {
  title: "Playground",
  description: PLAYGROUND_DESCRIPTION,
  alternates: { canonical: "/playground" },
  openGraph: {
    title: "Playground | Dasari Sambasiva Naidu",
    description: PLAYGROUND_DESCRIPTION,
    url: "/playground",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Dasari Sambasiva Naidu | Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playground | Dasari Sambasiva Naidu",
    description: PLAYGROUND_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function PlaygroundPage() {
  return (
    <main className="pt-16" style={{ background: "#0d1117", minHeight: "100vh" }}>
      <h1 className="sr-only">Developer terminal playground</h1>
      <Terminal />
    </main>
  );
}
