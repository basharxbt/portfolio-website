"use client";

import { useEffect, useRef, useState } from "react";

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Auth", "Tools"];

const SKILLS = [
  {
    name: "Next.js",
    mark: "Nx",
    cat: "Frontend",
    text: "App Router, server components and SSR for fast, SEO-friendly pages.",
  },
  {
    name: "React",
    mark: "Re",
    cat: "Frontend",
    text: "Component-driven interfaces with hooks and clean state handling.",
  },
  {
    name: "Tailwind CSS",
    mark: "Tw",
    cat: "Frontend",
    text: "Responsive, consistent design built quickly with utility classes.",
  },
  {
    name: "JavaScript",
    mark: "JS",
    cat: "Frontend",
    text: "Modern ES6+ across the whole stack, front to back.",
  },
  {
    name: "Node.js",
    mark: "No",
    cat: "Backend",
    text: "The runtime behind my APIs and server-side logic.",
  },
  {
    name: "Express.js",
    mark: "Ex",
    cat: "Backend",
    text: "REST APIs, routing and middleware that stay simple to maintain.",
  },
  {
    name: "REST APIs",
    mark: "Ap",
    cat: "Backend",
    text: "Clear, predictable endpoints designed for the front end that uses them.",
  },
  {
    name: "MongoDB",
    mark: "Mg",
    cat: "Database",
    text: "Flexible document modelling for real application data.",
  },
  {
    name: "Better Auth",
    mark: "Ba",
    cat: "Auth",
    text: "Modern sign-up, sessions and database-backed authentication.",
  },
  {
    name: "NextAuth.js",
    mark: "Na",
    cat: "Auth",
    text: "Providers, sessions and protected routes in Next.js apps.",
  },
  {
    name: "Vercel",
    mark: "Vc",
    cat: "Tools",
    text: "Deployments, preview builds and serverless hosting.",
  },
  {
    name: "Git & GitHub",
    mark: "Gt",
    cat: "Tools",
    text: "Version control and collaboration for every project.",
  },
];

const css = `
@keyframes sk-in {
  from { opacity: 0; transform: translateY(22px) scale(.97); filter: blur(4px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes sk-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.sk-in { opacity: 0; animation: sk-in .7s cubic-bezier(.22,1,.36,1) forwards; animation-delay: var(--d, 0s); }
.sk-marquee { animation: sk-marquee 34s linear infinite; }
.sk-marquee-wrap:hover .sk-marquee { animation-play-state: paused; }
.sk-tile::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(129,140,248,.18), transparent 60%);
  opacity: 0;
  transition: opacity .3s;
  pointer-events: none;
}
.sk-tile:hover::before { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .sk-in { opacity: 1; animation: none; }
  .sk-marquee { animation: none; }
}
`;

export default function Skills() {
  const root = useRef(null);
  const [inView, setInView] = useState(false);
  const [cat, setCat] = useState("All");

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

  const visible = cat === "All" ? SKILLS : SKILLS.filter((s) => s.cat === cat);
  const count = (c) =>
    c === "All" ? SKILLS.length : SKILLS.filter((s) => s.cat === c).length;
  const reveal = () => (inView ? "sk-in" : "opacity-0");

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const marquee = [...SKILLS, ...SKILLS];

  return (
    <section
      id="skills"
      ref={root}
      className="relative w-full max-w-none shrink-0 overflow-hidden bg-slate-950 py-24 lg:ml-72 lg:w-[calc(100%-18rem)] lg:py-32"
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-0 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className={`max-w-3xl ${reveal()}`}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-sm text-slate-200 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Skills
          </p>
          <h2 className="mt-6 font-[family-name:var(--font-geist-sans)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            The tools I use to{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              build and ship.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            A JavaScript stack I know well, from the interface to the database
            to the deploy.
          </p>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Skill categories"
          className={`mt-10 flex flex-wrap gap-2 ${reveal()}`}
          style={{ "--d": "0.1s" }}
        >
          {CATEGORIES.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => setCat(c)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  active
                    ? "bg-white font-semibold text-slate-950"
                    : "bg-white/[0.06] text-slate-300 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {c}
                <span className="font-[family-name:var(--font-geist-mono)] text-xs text-slate-500">
                  {count(c)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tiles */}
        <ul
          key={cat}
          role="tabpanel"
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((s, i) => (
            <li
              key={s.name}
              onMouseMove={onMove}
              className={`sk-tile relative overflow-hidden rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 transition-colors hover:ring-indigo-400/30 ${reveal()}`}
              style={{ "--d": `${0.15 + i * 0.06}s` }}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 font-[family-name:var(--font-geist-mono)] text-sm font-semibold text-white ring-1 ring-white/15">
                  {s.mark}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-geist-sans)] text-lg font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="font-[family-name:var(--font-geist-mono)] text-xs text-indigo-300">
                    {s.cat}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {s.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Marquee */}
      <div
        aria-hidden
        className={`sk-marquee-wrap relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${reveal()}`}
        style={{ "--d": "0.5s" }}
      >
        <div className="sk-marquee flex w-max gap-3">
          {marquee.map((s, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full bg-white/[0.05] px-5 py-2 font-[family-name:var(--font-geist-mono)] text-sm text-slate-300 ring-1 ring-white/10"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
