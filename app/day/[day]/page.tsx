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
  const isMissed = task?.status === "missed";

  return (
    <main className="min-h-screen bg-[#13141B] text-[#EAEAF0] font-sans pb-20">
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
              DAY {task.day} · {(task.level || "Beginner").toUpperCase()}
            </p>
            <h1 className="text-3xl font-bold mb-4">Today's task</h1>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
              <p className="text-[#EAEAF0] leading-relaxed">
                {task.task || "Task details coming soon."}
              </p>
              <span
                className={`inline-block mt-4 text-xs font-mono font-semibold px-3 py-1 rounded-full border ${
                  task.status === "done"
                    ? "text-[#9FE6C9] bg-[#9FE6C9]/10 border-[#9FE6C9]/30"
                    : isMissed
                    ? "text-[#FFCFA0] bg-[#FFCFA0]/10 border-[#FFCFA0]/30"
                    : "text-[#8A8D9A] bg-white/5 border-white/10"
                }`}
              >
                {task.status === "done"
                  ? "Completed"
                  : isMissed
                  ? "Missed — uncommitted"
                  : "Pending"}
              </span>
            </div>

            {isMissed ? (
              <div className="bg-[#FFCFA0]/10 border border-[#FFCFA0]/30 rounded-2xl p-6 mb-6 font-mono">
                <p className="text-[#FFCFA0] font-semibold text-sm mb-2">
                  git status: 1 day uncommitted 👀
                </p>
                <p className="text-xs text-[#8A8D9A] leading-relaxed mb-4">
                  This one went unsubmitted. It won't count against your
                  level — but you can still catch up and submit it late
                  if you'd like it marked done.
                </p>
                <SubmissionForm day={task.day} initialStatus={task.status} />
              </div>
            ) : (
              <SubmissionForm day={task.day} initialStatus={task.status} />
            )}
          </>
        )}
      </div>
    </main>
  );
}