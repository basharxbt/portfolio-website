"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ✏️ DEMO PROJECTS: replace these with your own later.
// - image: optional. Put screenshots in /public/projects/ and use "/projects/name.jpg".
//   Without an image, a generated mock screen is shown.
// - live / repo: leave out (or set to "") to hide that button.
const PROJECTS = [
  {
    title: "RecipeHub",
    featured: true,
    summary:
      "A full-stack recipe-sharing platform featuring user authentication, recipe management, premium content, Stripe payments, and a responsive user interface.",
    tags: ["Next.js", "Express", "MongoDB", "Better Auth", "Tailwind CSS"],
    live: "https://recipe-hub-fronted.vercel.app",
    repo: "https://github.com/basharxbt/Recipe-Hub-Fronted",
    image: "/recipehub.png",
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
  },
  {
    title: "TaskPilot",
    summary:
      "Team task manager with boards, drag-and-drop, deadlines and role-based access.",
    tags: ["Next.js", "MongoDB", "NextAuth.js"],
    live: "https://example.com",
    repo: "https://github.com/your-username/taskpilot",
    image: "",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    title: "BlogCraft",
    summary:
      "Markdown blogging platform with drafts, tags, search and a fast, SEO-friendly reader.",
    tags: ["Next.js", "Express", "MongoDB"],
    live: "https://example.com",
    repo: "https://github.com/your-username/blogcraft",
    image: "",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    title: "DevBoard",
    summary:
      "Analytics dashboard that turns API data into clean, responsive charts and reports.",
    tags: ["React", "Node.js", "Tailwind CSS"],
    live: "",
    repo: "https://github.com/your-username/devboard",
    image: "",
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
  },
];

const GITHUB_URL = "https://github.com/basharxbt";
const GH_PATH =
  "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z";

const css = `
@keyframes pj-in {
  from { opacity: 0; transform: translateY(28px); filter: blur(4px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes pj-sheen {
  from { transform: translateX(-120%) skewX(-18deg); }
  to   { transform: translateX(320%) skewX(-18deg); }
}
.pj-in { opacity: 0; animation: pj-in .8s cubic-bezier(.22,1,.36,1) forwards; animation-delay: var(--d, 0s); }
.pj-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(129,140,248,.14), transparent 60%);
  opacity: 0;
  transition: opacity .3s;
  pointer-events: none;
  z-index: 1;
}
.pj-card:hover::before { opacity: 1; }
.pj-cover:hover .pj-sheen { animation: pj-sheen 1s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .pj-in { opacity: 1; animation: none; }
  .pj-card:hover .pj-sheen, .pj-cover:hover .pj-sheen { animation: none; }
}
`;

function Cover({ project }) {
  return (
    <div className="pj-cover relative aspect-[16/10] w-full overflow-hidden">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 600px, 90vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`}
        >
          {/* generated mock screen */}
          <div className="absolute inset-x-[9%] bottom-0 top-[16%] overflow-hidden rounded-t-xl bg-slate-950/85 shadow-2xl ring-1 ring-white/25 backdrop-blur">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="ml-3 h-2 w-1/3 rounded-full bg-white/10" />
            </div>
            <div className="flex gap-3 p-3">
              <div className="w-1/4 space-y-2">
                <div className="h-2.5 rounded bg-white/25" />
                <div className="h-2.5 w-4/5 rounded bg-white/10" />
                <div className="h-2.5 w-3/5 rounded bg-white/10" />
                <div className="h-2.5 w-4/5 rounded bg-white/10" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-3 w-2/3 rounded bg-white/30" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-12 rounded-lg bg-white/10" />
                  <div className="h-12 rounded-lg bg-white/10" />
                  <div className="h-12 rounded-lg bg-white/10" />
                </div>
                <div className="h-16 rounded-lg bg-white/[0.07]" />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* sheen */}
      <span
        aria-hidden
        className="pj-sheen pointer-events-none absolute inset-y-0 left-0 w-1/5 -translate-x-full bg-white/15 blur-md"
      />
    </div>
  );
}

function Links({ project }) {
  const btn =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} bg-white text-slate-950 hover:bg-indigo-100`}
        >
          Live demo
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
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      ) : null}
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden
          >
            <path d={GH_PATH} />
          </svg>
          Code
        </a>
      ) : null}
    </div>
  );
}

function Tags({ tags }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-lg bg-white/[0.06] px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-xs text-slate-200 ring-1 ring-white/10"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  const root = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const reveal = inView ? "pj-in" : "opacity-0";

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
  const rest = PROJECTS.filter((p) => p !== featured);

  const card =
    "pj-card group relative overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-indigo-400/30";

  return (
    <section
      id="projects"
      ref={root}
      className="relative w-full max-w-none shrink-0 overflow-hidden bg-slate-950 py-24 lg:ml-72 lg:w-[calc(100%-18rem)] lg:py-32"
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-32 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-40 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className={`max-w-3xl ${reveal}`}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-sm text-slate-200 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Projects
          </p>
          <h2 className="mt-6 font-[family-name:var(--font-geist-sans)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              built and shipped.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            A selection of full-stack projects, from the interface to the API
            and database.
          </p>
        </div>

        {/* Featured */}
        <article
          onMouseMove={onMove}
          className={`${card} mt-14 lg:grid lg:grid-cols-5 ${reveal}`}
          style={{ "--d": "0.1s" }}
        >
          <div className="lg:col-span-3">
            <Cover project={featured} />
          </div>
          <div className="relative z-[2] flex flex-col justify-center p-7 sm:p-9 lg:col-span-2">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500/15 px-3 py-1 text-xs text-indigo-200 ring-1 ring-indigo-400/20">
              Featured project
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-geist-sans)] text-2xl font-semibold text-white sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-3 leading-relaxed text-slate-300">
              {featured.summary}
            </p>
            <Tags tags={featured.tags} />
            <Links project={featured} />
          </div>
        </article>

        {/* Others */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <article
              key={p.title}
              onMouseMove={onMove}
              className={`${card} flex flex-col ${reveal}`}
              style={{ "--d": `${0.2 + i * 0.1}s` }}
            >
              <Cover project={p} />
              <div className="relative z-[2] flex flex-1 flex-col p-6">
                <h3 className="font-[family-name:var(--font-geist-sans)] text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {p.summary}
                </p>
                <Tags tags={p.tags} />
                <div className="mt-auto">
                  <Links project={p} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* More */}
        <div
          className={`mt-12 flex justify-center ${reveal}`}
          style={{ "--d": "0.5s" }}
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            See more on GitHub
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
          </a>
        </div>
      </div>
    </section>
  );
}
