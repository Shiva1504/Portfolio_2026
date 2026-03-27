import type { Metadata } from "next";
import { Terminal } from "@/components/terminal/Terminal";

export const metadata: Metadata = {
  title: "Playground — Sambasiva Naidu",
  description: "Interactive developer terminal. Type /help to get started.",
};

export default function PlaygroundPage() {
  return (
    <main className="pt-16" style={{ background: "#0d1117", minHeight: "100vh" }}>
      <Terminal />
    </main>
  );
}
