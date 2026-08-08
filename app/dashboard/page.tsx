import Link from "next/link";
import data from "../../data/data.json";

// ---- Small helpers (plain JS, no magic) ----

function getNextThreshold(level: string, thresholds: Record<string, number>) {
  if (level === "Beginner") return thresholds["Intermediate"];
  if (level === "Intermediate") return thresholds["Pro"];
  return null; // Pro has no "next" level
}

function getLevelProgress(streak: number, thresholds: Record<string, number>, level: string) {
  const next = getNextThreshold(level, thresholds);
  if (next === null) return 100; // already Pro
  const base = thresholds[level] ?? 0;
  const pct = ((streak - base) / (next - base)) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

export default function Dashboard() {
  const { student, days, levelThresholds } = data;
  const { name, streak, level, completion } = student;

  // Edge case: empty profile (no name / totally fresh)
  const isEmptyProfile = !name || (streak === 0 && days.every((d) => d.status !== "done"));

  // Today's task = first "pending" day in the list
  const todayTask = days.find((d) => d.status === "pending");

  // Edge case: streak is 0
  const isStreakZero = streak === 0;

  const nextThreshold = getNextThreshold(level, levelThresholds);
  const levelProgress = getLevelProgress(streak, levelThresholds, level);

  const doneCount = days.filter((d) => d.status === "done").length;

  // Simple achievements derived from the data itself
  const achievements = [
    { label: "First task done", earned: doneCount >= 1 },
    { label: "7-day streak", earned: streak >= 7 },
    { label: "Halfway there", earned: completion >= 0.5 },
    { label: "21-day streak", earned: streak >= 21 },
  ];

  const levelColor =
    level === "Pro"
      ? "text-[#F7B6C2] bg-[#F7B6C2]/10 border-[#F7B6C2]/30"
      : level === "Intermediate"
      ? "text-[#9FE6C9] bg-[#9FE6C9]/10 border-[#9FE6C9]/30"
      : "text-[#C6B8FA] bg-[#C6B8FA]/10 border-[#C6B8FA]/30";

  return (
    <main className="min-h-screen bg-[#13141B] text-[#EAEAF0] font-sans pb-20">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-5xl mx-auto">
        <Link href="/" className="font-mono text-sm tracking-widest text-[#9FE6C9]">
          ABTALKS
        </Link>
        <span className="text-sm text-[#8A8D9A]">
          {isEmptyProfile ? "Guest" : name}
        </span>
      </nav>

      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Empty profile edge case */}
        {isEmptyProfile && (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center mb-8">
            <p className="text-lg font-semibold mb-2">Welcome to ABTalks 👋</p>
            <p className="text-[#8A8D9A] text-sm">
              You haven't started yet. Complete your first task to begin your streak.
            </p>
          </div>
        )}

        {/* Streak + Level row */}
        <section className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Streak card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-3">
              STREAK
            </p>
            {isStreakZero ? (
              <>
                <p className="text-2xl font-bold mb-1">Start your streak today</p>
                <p className="text-sm text-[#8A8D9A]">
                  Complete today's task to get to day 1.
                </p>
              </>
            ) : (
              <>
                <p className="text-4xl font-bold mb-1">
                  {streak} <span className="text-lg text-[#8A8D9A]">days</span>
                </p>
                <p className="text-sm text-[#8A8D9A]">Keep it going ✦</p>
              </>
            )}
          </div>

          {/* Level card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-3">
              LEVEL
            </p>
            <span
              className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border mb-4 ${levelColor}`}
            >
              {level}
            </span>
            {nextThreshold !== null ? (
              <>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#9FE6C9] rounded-full transition-all"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <p className="text-xs text-[#8A8D9A]">
                  {nextThreshold - streak > 0
                    ? `${nextThreshold - streak} more day(s) to next level`
                    : "Ready to level up"}
                </p>
              </>
            ) : (
              <p className="text-xs text-[#8A8D9A]">You've hit the top level 🎉</p>
            )}
          </div>
        </section>

        {/* Overall progress bar */}
        <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-xs text-[#8A8D9A] tracking-widest">
              OVERALL PROGRESS
            </p>
            <p className="text-sm text-[#EAEAF0]">
              {Math.round(completion * 100)}%
            </p>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C6B8FA] rounded-full transition-all"
              style={{ width: `${completion * 100}%` }}
            />
          </div>
        </section>

        {/* Today's task */}
        <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
          <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-3">
            TODAY'S TASK
          </p>
          {todayTask ? (
            <>
              <p className="font-semibold mb-1">Day {todayTask.day}</p>
              <p className="text-[#8A8D9A] text-sm mb-4">{todayTask.task}</p>
              <Link
                href={`/day/${todayTask.day}`}
                className="inline-block bg-[#FFCFA0] text-[#13141B] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#ffdcb8] transition"
              >
                Open task →
              </Link>
            </>
          ) : (
            <p className="text-[#8A8D9A] text-sm">
              All caught up — no pending task right now. 🎉
            </p>
          )}
        </section>

        {/* Achievements */}
        <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-4">
            ACHIEVEMENTS
          </p>
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
        </section>
      </div>
    </main>
  );
}