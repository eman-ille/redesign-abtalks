import Link from "next/link";
import data from "../../../data/data.json";
import SubmissionForm from "./SubmissionForm";

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const dayNumber = Number(day);

  const task = data.days.find((d) => d.day === dayNumber);

  return (
    <main className="min-h-screen bg-[#13141B] text-[#EAEAF0] font-sans pb-20">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-3xl mx-auto">
        <Link href="/" className="font-mono text-sm tracking-widest text-[#9FE6C9]">
          ABTALKS
        </Link>
        <Link href="/dashboard" className="text-sm text-[#8A8D9A] hover:text-white transition">
          ← Dashboard
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        {!task ? (
          // Edge case: someone visits a day number that doesn't exist in data.json
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-lg font-semibold mb-2">Task not found</p>
            <p className="text-[#8A8D9A] text-sm mb-4">
              Day {day} doesn't exist yet. Go back to your dashboard to find today's task.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-[#C6B8FA] text-[#13141B] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#d8cdfd] transition"
            >
              Back to dashboard
            </Link>
          </div>
        ) : (
          <>
            <p className="font-mono text-xs text-[#C6B8FA] tracking-widest mb-3">
              DAY {task.day} · {task.level.toUpperCase()}
            </p>
            <h1 className="text-3xl font-bold mb-4">Today's task</h1>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
              <p className="text-[#EAEAF0] leading-relaxed">{task.task}</p>
              <span
                className={`inline-block mt-4 text-xs font-semibold px-3 py-1 rounded-full border ${
                  task.status === "done"
                    ? "text-[#9FE6C9] bg-[#9FE6C9]/10 border-[#9FE6C9]/30"
                    : "text-[#FFCFA0] bg-[#FFCFA0]/10 border-[#FFCFA0]/30"
                }`}
              >
                {task.status === "done" ? "Completed" : "Pending"}
              </span>
            </div>

            <SubmissionForm day={task.day} initialStatus={task.status} />
          </>
        )}
      </div>
    </main>
  );
}