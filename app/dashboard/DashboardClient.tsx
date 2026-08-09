"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Day = { day: number; level: string; task: string; status: string };
type Student = {
  name: string;
  streak: number;
  level: string;
  completion: number;
};

const LEVEL_FLAVOR: Record<string, { name: string; tagline: string }> = {
  Beginner: { name: "BOOTSTRAPPING", tagline: "still running npm install..." },
  Intermediate: { name: "COMPILING", tagline: "tests passing, mostly." },
  Pro: { name: "SHIPPED", tagline: "main branch only. straight to prod." },
};

function getNextThreshold(level: string, thresholds: Record<string, number>) {
  if (level === "Beginner") return thresholds["Intermediate"];
  if (level === "Intermediate") return thresholds["Pro"];
  return null;
}

function getLevelProgress(streak: number, thresholds: Record<string, number>, level: string) {
  const next = getNextThreshold(level, thresholds);
  if (next === null) return 100;
  const base = thresholds[level] ?? 0;
  const pct = ((streak - base) / (next - base)) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

function getFlameStyle(streak: number) {
  const capped = Math.min(streak, 20);
  const scale = 0.7 + (capped / 20) * 1.1;
  const glow = capped / 20;
  return {
    transform: `scale(${scale})`,
    filter: `drop-shadow(0 0 ${4 + glow * 16}px rgba(255,207,160,${0.15 + glow * 0.55}))`,
    opacity: streak === 0 ? 0.25 : 1,
    display: "inline-block",
    transition: "all 0.4s ease",
  };
}

export default function DashboardClient({
  student,
  days,
  levelThresholds,
}: {
  student: Student;
  days: Day[];
  levelThresholds: Record<string, number>;
}) {
  const { name, streak, level, completion } = student;
  const [toast, setToast] = useState<string | null>(null);

  // Safe fallbacks — nothing renders "undefined" even if data is incomplete
  const safeName = name && name.trim().length > 0 ? name : "";
  const safeDays = Array.isArray(days) ? days : [];
  const safeCompletion = typeof completion === "number" ? completion : 0;
  const safeLevel = level || "Beginner";

  const doneCount = safeDays.filter((d) => d.status === "done").length;
  const missedDay = safeDays.find((d) => d.status === "missed");
  const todayTask = safeDays.find((d) => d.status === "pending");

  // 3 distinct states, driven by real data — never overlap
  const isEmptyProfile = !safeName && doneCount === 0;
  const isMissedDay = !!missedDay && !isEmptyProfile;
  const isBrandNewFirstDay =
    !isEmptyProfile && !isMissedDay && streak === 0 && doneCount === 0;

  const nextThreshold = getNextThreshold(safeLevel, levelThresholds);
  const levelProgress = getLevelProgress(streak, levelThresholds, safeLevel);
  const flavor = LEVEL_FLAVOR[safeLevel] ?? { name: safeLevel, tagline: "" };

  const achievements = [
    { label: "First task done", earned: doneCount >= 1 },
    { label: "7-day streak", earned: streak >= 7 || isMissedDay },
    { label: "Halfway there", earned: safeCompletion >= 0.5 },
    { label: "21-day streak", earned: streak >= 21 },
  ];
  const hasAnyAchievement = achievements.some((a) => a.earned);

  const levelColor =
    safeLevel === "Pro"
      ? "text-[#F7B6C2] bg-[#F7B6C2]/10 border-[#F7B6C2]/30"
      : safeLevel === "Intermediate"
      ? "text-[#9FE6C9] bg-[#9FE6C9]/10 border-[#9FE6C9]/30"
      : "text-[#C6B8FA] bg-[#C6B8FA]/10 border-[#C6B8FA]/30";

  useEffect(() => {
    const key = "abtalks-last-level";
    const lastSeen = localStorage.getItem(key);

    if (lastSeen && lastSeen !== safeLevel) {
      setToast(`✔ level_up.sh executed — ${lastSeen} → ${safeLevel}`);
      import("canvas-confetti").then(({ default: confetti }) => {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#C6B8FA", "#9FE6C9", "#FFCFA0", "#F7B6C2"],
        });
      });
      const timer = setTimeout(() => setToast(null), 4000);
      localStorage.setItem(key, safeLevel);
      return () => clearTimeout(timer);
    }
    localStorage.setItem(key, safeLevel);
  }, [safeLevel]);

  return (
    <main className="min-h-screen bg-[#13141B] text-[#EAEAF0] font-sans pb-20">
      <nav className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-5xl mx-auto">
        <Link href="/" className="font-mono text-sm tracking-widest text-[#9FE6C9]">
          ABTALKS
        </Link>
        <span className="text-sm text-[#8A8D9A] font-mono">
          {isEmptyProfile ? "whoami: unknown" : safeName || "guest"}
        </span>
      </nav>

      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* STATE 1: Empty profile — no name, nothing done, nothing to show */}
        {isEmptyProfile && (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center mb-8 font-mono">
            <p className="text-lg font-semibold mb-2 text-[#C6B8FA]">
              whoami: unknown. let's fix that.
            </p>
            <p className="text-[#8A8D9A] text-sm mb-5">
              no profile detected yet — nothing broken, just empty.
            </p>
            <Link
              href="/day/1"
              className="inline-block bg-[#C6B8FA] text-[#13141B] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#d8cdfd] transition"
            >
              run first commit →
            </Link>
          </div>
        )}

        {/* STATE 2: Brand new, has a profile, just hasn't started */}
        {isBrandNewFirstDay && (
          <div className="bg-white/[0.03] border border-[#C6B8FA]/20 rounded-2xl p-8 text-center mb-8 font-mono">
            <p className="text-lg font-semibold mb-2 text-[#C6B8FA]">
              whoami: unknown. let's fix that.
            </p>
            <p className="text-[#8A8D9A] text-sm mb-5">
              streak.length === 0 — day 1 is one task away.
            </p>
            <Link
              href="/day/1"
              className="inline-block bg-[#C6B8FA] text-[#13141B] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#d8cdfd] transition"
            >
              start day 1 →
            </Link>
          </div>
        )}

        {/* STATE 3: Missed a day — reset streak, keep level, not punishing */}
        {isMissedDay && (
          <div className="bg-[#FFCFA0]/10 border border-[#FFCFA0]/30 rounded-2xl p-5 mb-6 flex items-start gap-3">
            <span className="text-lg">👀</span>
            <div className="font-mono">
              <p className="text-[#FFCFA0] font-semibold text-sm mb-1">
                git status: 1 day uncommitted
              </p>
              <p className="text-xs text-[#8A8D9A] leading-relaxed">
                day {missedDay?.day} went unsubmitted. streak reset to 0, but
                HEAD still points to {safeLevel} — level only drops with
                future task difficulty, not instantly.
              </p>
            </div>
          </div>
        )}

        <section className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-3">
              STREAK
            </p>
            {isMissedDay ? (
              <>
                <p className="text-4xl font-bold mb-1 text-[#FFCFA0]">
                  0 <span className="text-lg text-[#8A8D9A]">days</span>
                </p>
                <p className="text-sm text-[#8A8D9A] font-mono">reset — recommit today</p>
              </>
            ) : isBrandNewFirstDay || isEmptyProfile ? (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <span style={getFlameStyle(0)} className="text-3xl">🔥</span>
                  <p className="text-xl font-bold">0 commits today</p>
                </div>
                <p className="text-sm text-[#8A8D9A] font-mono">
                  git log --oneline → (no commits yet)
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <span style={getFlameStyle(streak)} className="text-3xl">🔥</span>
                  <p className="text-4xl font-bold">
                    {streak} <span className="text-lg text-[#8A8D9A]">days</span>
                  </p>
                </div>
                <p className="text-sm text-[#8A8D9A]">Keep it going ✦</p>
              </>
            )}
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-3">
              LEVEL
            </p>
            <span
              className={`inline-block font-mono text-sm font-semibold px-3 py-1 rounded-full border mb-2 ${levelColor}`}
            >
              {flavor.name}
            </span>
            <p className="text-xs text-[#8A8D9A] italic mb-4">{flavor.tagline}</p>
            {nextThreshold !== null ? (
              <>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#9FE6C9] rounded-full transition-all"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <p className="text-xs text-[#8A8D9A] font-mono">
                  {isMissedDay
                    ? "level kept — rebuild the streak"
                    : nextThreshold - streak > 0
                    ? `${nextThreshold - streak} more day(s) to next level`
                    : "ready to level up"}
                </p>
              </>
            ) : (
              <p className="text-xs text-[#8A8D9A] font-mono">top level reached 🎉</p>
            )}
          </div>
        </section>

        <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-xs text-[#8A8D9A] tracking-widest">
              OVERALL PROGRESS
            </p>
            <p className="text-sm text-[#EAEAF0] font-mono">
              {Math.round(safeCompletion * 100)}%
            </p>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C6B8FA] rounded-full transition-all"
              style={{ width: `${safeCompletion * 100}%` }}
            />
          </div>
        </section>

        <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
          <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-3">
            TODAY'S TASK
          </p>
          {todayTask ? (
            <>
              <p className="font-semibold mb-1">Day {todayTask.day}</p>
              <p className="text-[#8A8D9A] text-sm mb-4">
                {todayTask.task || "task details coming soon."}
              </p>
              <Link
                href={`/day/${todayTask.day}`}
                className="inline-block bg-[#FFCFA0] text-[#13141B] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#ffdcb8] transition"
              >
                Open task →
              </Link>
            </>
          ) : (
            <p className="text-[#8A8D9A] text-sm font-mono">
              all clear — 0 pending tasks. 🎉
            </p>
          )}
        </section>

        <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-4">
            ACHIEVEMENTS
          </p>
          {!hasAnyAchievement ? (
            <p className="text-[#8A8D9A] text-sm font-mono">
              no achievements yet — complete a task to earn your first one.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.label}
                  className={`rounded-xl border p-3 text-center ${
                    a.earned
                      ? "border-[#F7B6C2]/30 bg-[#F7B6C2]/10 text-[#F7B6C2]"
                      : "border-white/10 bg-white/[0.02] text-[#8A8D9A]"
                  }`}
                >
                  <p className="text-xs leading-snug">{a.label}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {toast && (
        <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-xs bg-[#1B1D26] border border-[#9FE6C9]/40 rounded-xl px-4 py-3 font-mono text-xs text-[#9FE6C9] shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}