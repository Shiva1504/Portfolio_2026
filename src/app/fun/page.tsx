import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FunLab } from "@/components/fun/fun-lab";

export const metadata: Metadata = {
  title: "Fun | Sambasiva Naidu",
  description:
    "physics.lab — hand-written mini simulations: throw the tech stack around, spring-load the name, slingshot satellites into orbit.",
};

export default function FunPage() {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.22 0.06 265 / 60%), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 100%, oklch(0.2 0.07 295 / 40%), transparent 60%)",
        }}
      />
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 px-4 sm:px-6">
        <FunLab />
      </main>
      <Footer />
    </>
  );
}
