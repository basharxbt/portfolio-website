"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SKILLS = [
  {
    title: "Frontend",
    note: "Interfaces that feel fast and look sharp.",
    icon: [
      "M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z",
      "M8 21h8",
      "M12 17v4",
    ],
    items: ["Next.js (App Router)", "React", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Backend",
    note: "APIs and data models that stay simple.",
    icon: [
      "M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3Z",
      "M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5",
      "M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3",
    ],
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    title: "Auth & deployment",
    note: "Secure sign-in and smooth releases.",
    icon: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"],
    items: ["Better Auth", "NextAuth.js", "Vercel", "Git & GitHub"],
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Own the whole feature",
    text: "From the first sketch to the live URL, I like seeing a feature through.",
  },
  {
    n: "02",
    title: "Secure by default",
    text: "Authentication and data handling are designed in early, not patched on later.",
  },
  {
    n: "03",
    title: "Fast and clear",
    text: "Quick pages, readable code and interfaces people understand at a glance.",
  },
];

const css = `
.ab-reveal {
  opacity: 0;
  transform: translateY(28px);
  filter: blur(4px);
  transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1), filter .8s cubic-bezier(.22,1,.36,1);
  transition-delay: var(--d, 0s);
}
.ab-reveal[data-in="true"] { opacity: 1; transform: none; filter: blur(0); }
@media (prefers-reduced-motion: reduce) {
  .ab-reveal { opacity: 1; transform: none; filter: none; transition: none; }
}
`;

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    const els = root.current?.querySelectorAll("[data-reveal]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.dataset.in = "true";
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const card =
    "ab-reveal rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 transition-colors hover:bg-white/[0.06] hover:ring-indigo-400/30";

  return (
    <section
      id="about"
      ref={root}
      className="relative w-full max-w-none shrink-0 overflow-hidden bg-slate-950 px-6 py-24 sm:px-10 lg:ml-72 lg:w-[calc(100%-18rem)] lg:px-16 lg:py-32"
    >
      <style>{css}</style>

      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="max-w-3xl">
          <p
            data-reveal
            className="ab-reveal inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-sm text-slate-200 ring-1 ring-white/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            About me
          </p>
          <h2
            data-reveal
            style={{ "--d": "0.08s" }}
            className="ab-reveal mt-6 font-[family-name:var(--font-geist-sans)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl"
          >
            A developer who cares about{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              the whole product.
            </span>
          </h2>
          <p
            data-reveal
            style={{ "--d": "0.16s" }}
            className="ab-reveal mt-5 text-lg leading-relaxed text-slate-300"
          >
            I turn ideas into web applications that are fast, secure and
            pleasant to use.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Photo card */}
          <div
            data-reveal
            className="ab-reveal relative min-h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/50 via-violet-600/30 to-slate-900 ring-1 ring-white/10 lg:row-span-2"
          >
            <div
              aria-hidden
              className="absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-400/20 blur-3xl"
            />
            <Image
              src="/banner-photo4.png"
              alt="Shafiullah"
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-contain object-bottom px-6 pt-10"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-slate-950/70 px-4 py-3 ring-1 ring-white/15 backdrop-blur-xl">
              <p className="font-[family-name:var(--font-geist-sans)] text-base font-semibold text-white">
                Shafiullah
              </p>
              <p className="text-sm text-slate-300">
                Full-stack JavaScript developer
              </p>
            </div>
          </div>

          {/* Story */}
          <div
            data-reveal
            style={{ "--d": "0.1s" }}
            className={`${card} lg:col-span-2`}
          >
            <h3 className="font-[family-name:var(--font-geist-sans)] text-xl font-semibold text-white">
              My story
            </h3>
            <div className="mt-4 space-y-4 leading-relaxed text-slate-300">
              <p>
                I&apos;m Shafiullah, a Full-Stack Web Developer specializing in
                building modern, scalable, and user-focused web applications.
                With experience in React, Next.js, Tailwind CSS, Express.js, and
                MongoDB, I develop seamless web experiences that combine
                intuitive interfaces with reliable backend functionality. My
                work includes building full-stack applications, integrating REST
                APIs, implementing secure authentication, and developing payment
                solutions.
              </p>
              <p>
                I enjoy solving complex problems, writing maintainable code, and
                turning ideas into practical digital products through thoughtful
                engineering and continuous improvement.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Let&apos;s talk
              </a>
              <a
                href="#projects"
                className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                See my work
              </a>
            </div>
          </div>

          {/* Frontend + Backend */}
          {SKILLS.slice(0, 2).map((s, i) => (
            <SkillCard
              key={s.title}
              skill={s}
              className={card}
              delay={0.15 + i * 0.08}
            />
          ))}

          {/* Auth & deployment */}
          <SkillCard skill={SKILLS[2]} className={card} delay={0.1} />

          {/* Principles */}
          <div
            data-reveal
            style={{ "--d": "0.18s" }}
            className={`${card} lg:col-span-2`}
          >
            <h3 className="font-[family-name:var(--font-geist-sans)] text-xl font-semibold text-white">
              How I work
            </h3>
            <ul className="mt-5 grid gap-5 sm:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <li key={p.n}>
                  <span className="font-[family-name:var(--font-geist-mono)] text-sm text-indigo-300">
                    {p.n}
                  </span>
                  <p className="mt-2 font-medium text-white">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {p.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, className, delay }) {
  return (
    <div data-reveal style={{ "--d": `${delay}s` }} className={className}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
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
          {skill.icon.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>
      <h3 className="mt-5 font-[family-name:var(--font-geist-sans)] text-xl font-semibold text-white">
        {skill.title}
      </h3>
      <p className="mt-1.5 text-sm text-slate-400">{skill.note}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {skill.items.map((it) => (
          <li
            key={it}
            className="rounded-lg bg-white/[0.06] px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-xs text-slate-200 ring-1 ring-white/10"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
