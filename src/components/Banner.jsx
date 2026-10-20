import Image from "next/image";

// Put the photo at /public/banner-photo.webp (transparent background cutout)
const PHOTO = "/banner-photo.webp";

const STACK = ["Next.js", "Express", "MongoDB", "Tailwind CSS", "Vercel"];
const ROLES = ["web apps.", "REST APIs.", "full-stack products."];
const HEADLINE_FIRST_LINE = ["I", "build"];

// Plain CSS animations (no extra packages). Prefixed "bn-" to avoid clashes.
const css = `
@keyframes bn-up {
  from { opacity: 0; transform: translateY(24px); filter: blur(6px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes bn-rise {
  from { opacity: 0; transform: translateY(70px) scale(.97); }
  to   { opacity: 1; transform: none; }
}
@keyframes bn-drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(30px, -24px, 0) scale(1.12); }
}
@keyframes bn-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
@keyframes bn-roles {
  0%, 20%   { transform: translateY(0); }
  25%, 45%  { transform: translateY(-25%); }
  50%, 70%  { transform: translateY(-50%); }
  75%, 100% { transform: translateY(-75%); }
}
@keyframes bn-scroll {
  0%   { transform: translateY(0); opacity: 0; }
  30%  { opacity: 1; }
  100% { transform: translateY(14px); opacity: 0; }
}
@keyframes bn-spin { to { transform: rotate(360deg); } }

.bn-up { opacity: 0; animation: bn-up .9s cubic-bezier(.22,1,.36,1) forwards; animation-delay: var(--d, 0s); }
.bn-rise { opacity: 0; animation: bn-rise 1.2s cubic-bezier(.22,1,.36,1) .3s forwards; }
.bn-drift { animation: bn-drift 14s ease-in-out infinite; }
.bn-float { animation: bn-float 6s ease-in-out infinite; animation-delay: var(--f, 0s); }
.bn-roles { animation: bn-roles 12s cubic-bezier(.77,0,.18,1) infinite; }
.bn-scroll-dot { animation: bn-scroll 1.8s ease-in-out infinite; }
.bn-spin { animation: bn-spin 40s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .bn-up, .bn-rise { opacity: 1; animation: none; }
  .bn-drift, .bn-float, .bn-roles, .bn-scroll-dot, .bn-spin { animation: none; }
}
`;

export default function Banner() {
  return (
    <section
      id="home"
      className="relative mt-14 flex min-h-[calc(100vh-3.5rem)] w-full max-w-none shrink-0 flex-col justify-between overflow-hidden bg-slate-950 lg:ml-72 lg:mt-0 lg:min-h-screen lg:w-[calc(100%-18rem)] lg:flex-row lg:items-center lg:justify-start"
    >
      <style>{css}</style>

      {/* Background: soft gradient + fading grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(79,70,229,0.28),transparent_60%),radial-gradient(ellipse_at_10%_90%,rgba(192,38,211,0.12),transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="bn-drift pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
      />

      {/* Text */}
      <div className="relative z-10 w-full px-6 pb-4 pt-14 sm:px-10 lg:max-w-[56%] lg:px-16 lg:py-16">
        <p
          className="bn-up inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-sm text-slate-200 ring-1 ring-white/10 backdrop-blur"
          style={{ "--d": "0.1s" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          Hi, I&apos;m Shafiullah
        </p>

        <h1 className="mt-6 font-[family-name:var(--font-geist-sans)] text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl">
          <span className="block">
            {HEADLINE_FIRST_LINE.map((w, i) => (
              <span
                key={w}
                className="bn-up mr-[0.25em] inline-block"
                style={{ "--d": `${0.25 + i * 0.1}s` }}
              >
                {w}
              </span>
            ))}
          </span>

          {/* Rotating word (pure CSS) */}
          <span
            className="bn-up block h-[1.15em] overflow-hidden"
            style={{ "--d": "0.5s" }}
            aria-label={ROLES.join(" ")}
          >
            <span className="bn-roles block" aria-hidden>
              {[...ROLES, ROLES[0]].map((r, i) => (
                <span
                  key={i}
                  className="block h-[1.15em] bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text leading-[1.15] text-transparent"
                >
                  {r}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <p
          className="bn-up mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          style={{ "--d": "0.7s" }}
        >
          Full-stack JavaScript developer. I design and ship Next.js
          applications from the interface to the API and database, and deploy
          them on Vercel.
        </p>

        <div
          className="bn-up mt-9 flex flex-wrap gap-3"
          style={{ "--d": "0.85s" }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            View my projects
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
          <a
            href="#contact"
            className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Get in touch
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {STACK.map((s, i) => (
            <li
              key={s}
              className="bn-up rounded-lg bg-white/[0.07] px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-xs text-slate-200 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/15"
              style={{ "--d": `${1 + i * 0.08}s` }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Photo */}
      <div className="relative z-10 mt-6 h-[85vw] max-h-[620px] self-end pr-4 sm:h-[70vh] lg:absolute lg:bottom-0 lg:right-4 lg:mt-0 lg:h-[92%] lg:max-h-none lg:pr-0 xl:right-14">
        {/* halo behind the person */}
        <div
          aria-hidden
          className="absolute bottom-[8%] left-1/2 aspect-square w-[105%] -translate-x-1/2"
        >
          <div className="bn-spin absolute inset-0 rounded-full border border-dashed border-white/15" />
          <div className="bn-drift absolute inset-[8%] rounded-full bg-gradient-to-br from-indigo-500/50 via-violet-500/30 to-fuchsia-500/20 blur-2xl" />
        </div>

        <div className="bn-rise relative h-full">
          <Image
            src={PHOTO}
            alt="Shafiullah, full-stack developer"
            width={844}
            height={1280}
            priority
            sizes="(min-width: 1024px) 560px, 80vw"
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* floating chips */}
        <div
          aria-hidden
          className="bn-up absolute -left-2 top-[22%] hidden sm:block lg:-left-10"
          style={{ "--d": "1.3s" }}
        >
          <div className="bn-float rounded-xl bg-slate-950/70 px-3.5 py-2 text-sm text-white shadow-xl ring-1 ring-white/15 backdrop-blur-xl">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Available for work
          </div>
        </div>
        <div
          aria-hidden
          className="bn-up absolute -right-1 top-[48%] hidden sm:block lg:-right-6"
          style={{ "--d": "1.5s" }}
        >
          <div
            className="bn-float rounded-xl bg-slate-950/70 px-3.5 py-2 font-[family-name:var(--font-geist-mono)] text-xs text-indigo-200 shadow-xl ring-1 ring-white/15 backdrop-blur-xl"
            style={{ "--f": "-2s" }}
          >
            &lt;Next.js /&gt;
          </div>
        </div>
        <div
          aria-hidden
          className="bn-up absolute -left-4 bottom-[22%] hidden sm:block lg:-left-14"
          style={{ "--d": "1.7s" }}
        >
          <div
            className="bn-float rounded-xl bg-slate-950/70 px-3.5 py-2 font-[family-name:var(--font-geist-mono)] text-xs text-fuchsia-200 shadow-xl ring-1 ring-white/15 backdrop-blur-xl"
            style={{ "--f": "-4s" }}
          >
            MongoDB · Express
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="bn-up absolute bottom-6 left-6 z-20 hidden h-10 w-6 justify-center rounded-full ring-1 ring-white/30 lg:left-16 lg:flex"
        style={{ "--d": "1.4s" }}
      >
        <span className="bn-scroll-dot mt-2 h-1.5 w-1.5 rounded-full bg-white" />
      </a>
    </section>
  );
}
