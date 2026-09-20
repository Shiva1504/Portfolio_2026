"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

/**
 * Live HUD readouts — the small "the system is on" details.
 * Clock renders empty until mounted to avoid a hydration mismatch.
 */

export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`hud-label tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {time ? `${time} IST` : "--:--:-- IST"}
    </span>
  );
}

export function SystemStatus({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal animate-pulse-signal" />
      </span>
      <span className="hud-label">{profile.availability}</span>
    </span>
  );
}
