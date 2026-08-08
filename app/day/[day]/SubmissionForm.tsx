"use client";

import { useState } from "react";

export default function SubmissionForm({
  day,
  initialStatus,
}: {
  day: number;
  initialStatus: string;
}) {
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Mocked submission — no real backend, just saving to localStorage
    // so it "remembers" this across page refreshes on your machine.
    const submission = { day, githubLink, linkedinLink, submittedAt: Date.now() };
    localStorage.setItem(`day-${day}-submission`, JSON.stringify(submission));

    setStatus("done");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[#9FE6C9]/10 border border-[#9FE6C9]/30 rounded-2xl p-6 text-center">
        <p className="text-[#9FE6C9] font-semibold mb-1">Submitted 🎉</p>
        <p className="text-sm text-[#8A8D9A]">
          Day {day} marked as done. Great work — see you tomorrow.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4"
    >
      <p className="font-mono text-xs text-[#8A8D9A] tracking-widest mb-1">
        SUBMIT YOUR WORK
      </p>

      <div>
        <label className="block text-sm text-[#EAEAF0] mb-1.5">
          GitHub link
        </label>
        <input
          type="url"
          required
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          placeholder="https://github.com/your-username/repo"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#EAEAF0] placeholder:text-[#8A8D9A] outline-none focus:border-[#C6B8FA] transition"
        />
      </div>

      <div>
        <label className="block text-sm text-[#EAEAF0] mb-1.5">
          LinkedIn post link
        </label>
        <input
          type="url"
          required
          value={linkedinLink}
          onChange={(e) => setLinkedinLink(e.target.value)}
          placeholder="https://linkedin.com/posts/..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#EAEAF0] placeholder:text-[#8A8D9A] outline-none focus:border-[#C6B8FA] transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#C6B8FA] text-[#13141B] font-semibold py-3 rounded-full hover:bg-[#d8cdfd] transition"
      >
        Mark day {day} as done
      </button>
    </form>
  );
}