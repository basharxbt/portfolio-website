"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV = [
  {
    id: "home",
    label: "Home",
    icon: [
      "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5Z",
    ],
  },
  {
    id: "about",
    label: "About",
    icon: [
      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
      "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    ],
  },
  { id: "skills", label: "Skills", icon: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"] },
  {
    id: "projects",
    label: "Projects",
    icon: [
      "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    icon: [
      "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
      "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    ],
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/your-username",
    path: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-username",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.84v1.54h.05c.54-1.01 1.84-2.08 3.79-2.08 4.05 0 4.82 2.67 4.82 6.14V21h-4v-4.97c0-1.19-.02-2.71-1.65-2.71-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75Z",
  },
  {
    label: "X",
    href: "https://x.com/your-username",
    path: "M18.9 2H22l-7.2 8.2L23.3 22h-6.6l-5.2-6.8L5.6 22H2.5l7.7-8.8L1.9 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z",
  },
];

const ITEM_H = 44; // h-11
const ITEM_GAP = 4; // mb-1

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function SidebarContent({ active, onNavigate }) {
  const activeIndex = Math.max(
    0,
    NAV.findIndex((n) => n.id === active),
  );
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="relative flex h-full flex-col p-5">
      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-fuchsia-400 p-[2px]">
          <Image
            src="/profile.PNG"
            alt="Shafiullah"
            width={88}
            height={88}
            priority
            className="h-[88px] w-[88px] rounded-full border-2 border-slate-950 object-cover"
          />
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-geist-sans)] text-xl font-semibold tracking-tight text-white">
          Shafiullah
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Full-stack JavaScript developer
        </p>
      </div>

      {/* Status card */}
      <div className="mt-5 rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-sm text-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for work
        </div>
        <p className="mt-2 font-[family-name:var(--font-geist-mono)] text-xs leading-relaxed text-slate-400">
          Next.js · Express · MongoDB
        </p>
      </div>

      {/* Nav */}
      <nav aria-label="Sections" className="mt-6">
        <ul className="relative">
          {/* sliding active pill */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-11 rounded-xl bg-gradient-to-r from-indigo-500/25 to-violet-500/10 ring-1 ring-inset ring-white/10 transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{
              transform: `translateY(${activeIndex * (ITEM_H + ITEM_GAP)}px)`,
            }}
          >
            <span className="absolute left-0 top-2.5 h-6 w-[3px] rounded-r-full bg-indigo-400" />
          </span>

          {NAV.map(({ id, label, icon }) => {
            const isActive = id === active;
            return (
              <li key={id} className="mb-1">
                <a
                  href={`#${id}`}
                  onClick={onNavigate}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex h-11 items-center gap-3 rounded-xl px-3.5 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    isActive
                      ? "font-medium text-white"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-[18px] w-[18px] ${isActive ? "text-indigo-300" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {icon.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6">
        <a
          href="#contact"
          onClick={onNavigate}
          className="flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Let&apos;s work together
        </a>

        <div className="mt-5 flex items-center justify-between">
          <ul className="flex gap-2">
            {SOCIALS.map(({ label, href, path }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-slate-400 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">© {year}</p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur-xl lg:hidden">
        <span className="font-[family-name:var(--font-geist-sans)] text-base font-semibold tracking-tight text-white">
          Shafiullah
        </span>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-sidebar"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-white ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Backdrop (mobile) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Full-height sidebar */}
      <aside
        id="site-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-72 overflow-hidden border-r border-white/10 bg-slate-950 transition-transform duration-300 motion-reduce:transition-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* soft glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl"
        />
        <div className="relative h-full overflow-y-auto">
          <SidebarContent active={active} onNavigate={() => setOpen(false)} />
        </div>
      </aside>
    </>
  );
}
