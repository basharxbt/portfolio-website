"use client";

import { useEffect, useRef, useState } from "react";

// ✏️ Replace these with your real details
const EMAIL = "you@example.com";
const LINKS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    stroke: [
      "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
      "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    ],
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/your-username",
    href: "https://linkedin.com/in/your-username",
    fill: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.84v1.54h.05c.54-1.01 1.84-2.08 3.79-2.08 4.05 0 4.82 2.67 4.82 6.14V21h-4v-4.97c0-1.19-.02-2.71-1.65-2.71-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75Z",
  },
  {
    label: "GitHub",
    value: "github.com/your-username",
    href: "https://github.com/your-username",
    fill: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
  },
  {
    label: "X (Twitter)",
    value: "x.com/your-username",
    href: "https://x.com/your-username",
    fill: "M18.9 2H22l-7.2 8.2L23.3 22h-6.6l-5.2-6.8L5.6 22H2.5l7.7-8.8L1.9 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z",
  },
];

// Update this each new year
const YEAR = 2026;

const css = `
@keyframes ct-in {
  from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes ct-pulse {
  0%, 100% { transform: scale(1); opacity: .5; }
  50%      { transform: scale(1.25); opacity: .9; }
}
.ct-in { opacity: 0; animation: ct-in .8s cubic-bezier(.22,1,.36,1) forwards; animation-delay: var(--d, 0s); }
.ct-pulse { animation: ct-pulse 6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .ct-in { opacity: 1; animation: none; }
  .ct-pulse { animation: none; }
}
`;

const field =
  "mt-2 w-full rounded-xl bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-slate-500 ring-1 ring-white/10 transition focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-indigo-400";

export default function Contact() {
  const root = useRef(null);
  const [inView, setInView] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const reveal = inView ? "ct-in" : "opacity-0";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Sends the message to /api/contact, which saves it in MongoDB.
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      setStatus("sent");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section
      id="contact"
      ref={root}
      className="relative w-full max-w-none shrink-0 overflow-hidden bg-slate-950 lg:ml-72 lg:w-[calc(100%-18rem)]"
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="ct-pulse pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="ct-pulse pointer-events-none absolute -left-24 bottom-24 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        {/* Heading */}
        <div className={`max-w-3xl ${reveal}`}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-sm text-slate-200 ring-1 ring-white/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </p>
          <h2 className="mt-6 font-[family-name:var(--font-geist-sans)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              great together.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            Have a project, a job opportunity or just a question? Send me a
            message and I&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Links */}
          <div className={`lg:col-span-2 ${reveal}`} style={{ "--d": "0.1s" }}>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.label === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07] hover:ring-indigo-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
                      {l.fill ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-[18px] w-[18px]"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d={l.fill} />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          {l.stroke.map((d) => (
                            <path key={d} d={d} />
                          ))}
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-white">
                        {l.label}
                      </span>
                      <span className="block truncate font-[family-name:var(--font-geist-mono)] text-xs text-slate-400">
                        {l.value}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={copyEmail}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {copied ? (
                  <path d="m5 12 5 5L20 7" />
                ) : (
                  <>
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                  </>
                )}
              </svg>
              <span aria-live="polite">
                {copied ? "Email copied" : "Copy email address"}
              </span>
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className={`relative overflow-hidden rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8 lg:col-span-3 ${reveal}`}
            style={{ "--d": "0.2s" }}
          >
            <h3 className="font-[family-name:var(--font-geist-sans)] text-xl font-semibold text-white">
              Send me a message
            </h3>

            {/* Honeypot: hidden from people, bots fill it in */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.website}
              onChange={update("website")}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm text-slate-300" htmlFor="ct-name">
                Your name
                <input
                  id="ct-name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Jane Doe"
                  className={field}
                />
              </label>
              <label
                className="block text-sm text-slate-300"
                htmlFor="ct-email"
              >
                Your email
                <input
                  id="ct-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="jane@company.com"
                  className={field}
                />
              </label>
            </div>

            <label
              className="mt-5 block text-sm text-slate-300"
              htmlFor="ct-message"
            >
              Message
              <textarea
                id="ct-message"
                required
                rows={6}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell me about your project..."
                className={`${field} resize-none`}
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <p aria-live="polite" className="text-sm">
                {status === "sent" && (
                  <span className="text-emerald-400">
                    Thanks! Your message was sent. I&apos;ll get back to you
                    soon.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-rose-400">{errorMsg}</span>
                )}
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div
          className={`mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row ${reveal}`}
          style={{ "--d": "0.3s" }}
        >
          <p>© {YEAR} Shafiullah. All rights reserved.</p>
          <p className="font-[family-name:var(--font-geist-mono)] text-xs">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
