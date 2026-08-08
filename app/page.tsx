import Link from "next/link";

// A small grid of squares that mimics a coding-streak / contribution graph.
// Hardcoded for visual preview only — real data lives on /dashboard.
function StreakGrid() {
  const intensities = [
    0, 1, 0, 2, 1, 0, 0, 1, 2,
    1, 2, 1, 3, 2, 1, 0, 2, 3,
    0, 1, 2, 3, 3, 2, 1, 1, 2,
    1, 2, 3, 4, 3, 2, 2, 3, 4,
    2, 3, 4, 4, 3, 3, 4, 4, 3,
    3, 4, 4, 5, 4, 4, 5, 5, 4,
    4, 5, 5, 5, 5, 5, 5, 5, 5,
  ];

  const colors = [
    "bg-white/5",
    "bg-[#3a3652]",
    "bg-[#564f80]",
    "bg-[#7d72b8]",
    "bg-[#a596e8]",
    "bg-[#C6B8FA]",
  ];

  return (
    <div className="grid grid-cols-9 gap-1.5">
      {intensities.map((level, i) => (
        <div
          key={i}
          className={`w-3.5 h-3.5 rounded-[3px] ${colors[level]} opacity-0 animate-[fadeIn_0.4s_ease-out_forwards]`}
          style={{ animationDelay: `${i * 12}ms` }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#13141B] text-[#EAEAF0] font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-5xl mx-auto">
        <span className="font-mono text-sm tracking-widest text-[#9FE6C9]">
          ABTALKS
        </span>
        <Link
          href="/dashboard"
          className="text-sm text-[#8A8D9A] hover:text-white transition"
        >
          Dashboard →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 sm:pt-16 pb-20 grid gap-12 sm:grid-cols-2 sm:items-center">
        <div>
          <p className="font-mono text-xs text-[#C6B8FA] tracking-widest mb-4">
            60 DAYS · ONE TASK A DAY
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-6">
            Show up.
            <br />
            Every day.
          </h1>
          <p className="text-[#8A8D9A] max-w-sm mb-8 leading-relaxed">
            ABTalks is a 60-day build streak. One small coding task a day.
            Miss nothing, and watch yourself go from Beginner to Pro —
            no shortcuts, just consistency.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-[#C6B8FA] text-[#13141B] font-semibold px-6 py-3 rounded-full hover:bg-[#d8cdfd] transition"
          >
            Start your streak
          </Link>
        </div>

        {/* Signature visual: the streak grid */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-xs text-[#8A8D9A]">
              streak_history.log
            </span>
            <span className="font-mono text-xs text-[#C6B8FA]">
              ✦ 12 days
            </span>
          </div>
          <StreakGrid />
          <div className="flex items-center gap-2 mt-5 text-xs text-[#8A8D9A] font-mono">
            <span>less</span>
            <div className="w-3 h-3 rounded-[2px] bg-white/5" />
            <div className="w-3 h-3 rounded-[2px] bg-[#564f80]" />
            <div className="w-3 h-3 rounded-[2px] bg-[#7d72b8]" />
            <div className="w-3 h-3 rounded-[2px] bg-[#C6B8FA]" />
            <span>more</span>
          </div>
        </div>
      </section>

      {/* Level system preview */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-24">
        <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-6">
          HOW LEVELING WORKS
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              level: "Beginner",
              days: "Day 0–6",
              desc: "Fresh start. Small, guided tasks to build the habit.",
              color: "text-[#EAEAF0] border-white/10",
            },
            {
              level: "Intermediate",
              days: "Day 7–20",
              desc: "Streak holds. Tasks get sharper and less hand-held.",
              color: "text-[#9FE6C9] border-[#9FE6C9]/30",
            },
            {
              level: "Pro",
              days: "Day 21+",
              desc: "Full independence. You're building real things now.",
              color: "text-[#F7B6C2] border-[#F7B6C2]/30",
            },
          ].map((tier) => (
            <div
              key={tier.level}
              className={`rounded-xl border bg-white/[0.02] p-5 ${tier.color}`}
            >
              <p className="font-mono text-xs mb-2 opacity-70">{tier.days}</p>
              <p className="font-semibold text-lg mb-2">{tier.level}</p>
              <p className="text-sm text-[#8A8D9A] leading-relaxed">
                {tier.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}