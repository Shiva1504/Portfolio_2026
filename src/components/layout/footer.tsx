import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="hud-label text-[10px] normal-case tracking-normal">
          <span className="text-primary">shiva.os</span>
          <span className="mx-2 text-border" aria-hidden>·</span>
          all systems operational
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" aria-hidden />
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.fullName} · Built with Next.js, Tailwind CSS, Framer Motion &amp; three.js
        </p>
      </div>
    </footer>
  );
}
