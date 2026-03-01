import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {profile.fullName}
        </p>
        <p>Built with Next.js, Tailwind CSS & Framer Motion</p>
      </div>
    </footer>
  );
}
