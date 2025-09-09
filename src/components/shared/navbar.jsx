// File: src/components/shared/navbar.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Navbar({
  logo = "/logo.png",
  links = [
    { name: "ABOUT US", href: "#about" },
    { name: "COURSES", href: "#courses" },
    { name: "PORTFOLIO", href: "#portfolio" },
    { name: "PRESENCE", href: "#presence" },
    { name: "TEAM", href: "#team" },
    { name: "BLOG", href: "#blog" },
    { name: "CONTACT US", href: "#contact" },
  ],
}) {
  const [open, setOpen] = useState(false); // mobile menu
  const [mounted, setMounted] = useState(false); // for staggered entry
  const navRef = useRef(null);
  const logoRef = useRef(null);

  // mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // close on escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // small parallax for logo following pointer (subtle)
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      // limit transform
      el.style.transform = `translate(${dx * 6}px, ${dy * 3}px)`;
    }
    function onLeave() {
      el.style.transform = "translate(0,0)";
    }

    // attach only when pointer available and not reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // helper for stagger delay
  const delay = (i) => ({ transitionDelay: `${i * 60}ms` });

  return (
    <>
      {/* small embedded CSS for keyframes + reduced-motion rules */}
      <style>
        {`
          @keyframes logo-float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
            100% { transform: translateY(0); }
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            .prefers-reduced { transition: none !important; animation: none !important; transform: none !important; }
          }
        `}
      </style>

      <header className="w-full sticky top-0 z-50">
        {/* translucent backdrop + border */}
        <div className="backdrop-blur bg-white/70 border-b border-slate-200/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* logo */}
              <div className="flex items-center">
                <a
                  href="/"
                  className="flex items-center gap-3 relative"
                  aria-label="Home"
                >
                  <img
                    ref={logoRef}
                    src={logo}
                    alt="SPH Aviation"
                    className="h-10 w-auto rounded-sm shadow-sm prefers-reduced"
                    style={{
                      willChange: "transform",
                      animation: "logo-float 6s ease-in-out infinite",
                    }}
                  />
                </a>
              </div>

              {/* center nav (desktop) */}
              <nav
                ref={navRef}
                className="hidden md:flex items-center justify-center space-x-6"
                aria-label="Primary Navigation"
              >
                {links.map((link, i) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative inline-block text-sm font-medium text-slate-700 hover:text-slate-900 transition-transform transform`}
                    style={{
                      ...delay(i),
                      ...(mounted ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(6px)" }),
                    }}
                  >
                    {/* text + animated underline */}
                    <span className="inline-block transition-transform duration-200">
                      {link.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 -bottom-1 h-0.5 bg-sky-500 rounded block"
                      style={{
                        width: 0,
                        transition: "width 220ms ease",
                      }}
                    />
                    {/* hover effect via onMouse */}
                    <style>{`
                      a[href="${link.href}"]:hover > span + span { width: 20px; }
                      a[href="${link.href}"]:hover > span { transform: translateY(-3px); }
                    `}</style>
                  </a>
                ))}
              </nav>

              {/* mobile hamburger */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setOpen((s) => !s)}
                  aria-label="Toggle menu"
                  aria-expanded={open}
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {/* animated icon */}
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    {open ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile slide-over menu */}
        <div
          className={`fixed inset-0 z-50 md:hidden ${open ? "block" : "pointer-events-none"}`}
          aria-hidden={!open}
        >
          {/* overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
            onClick={() => setOpen(false)}
          />

          {/* panel */}
          <aside
            role="dialog"
            aria-modal="true"
            className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white/95 backdrop-blur border-l border-slate-200/10 shadow-2xl transform transition-transform ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ animation: open ? "slideInRight .36s ease both" : undefined }}
          >
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-between">
                <a href="/" className="flex items-center gap-3">
                  <img src={logo} alt="SPH Aviation" className="h-10 w-auto" />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* mobile nav list with staggered items */}
              <nav className="mt-6">
                <ul className="space-y-2">
                  {links.map((link, i) => (
                    <li key={link.name} style={delay(i)}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-3 rounded-md text-slate-800 hover:bg-slate-100 transition-colors transform hover:translate-x-1"
                      >
                        <span className="font-medium">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center px-4 py-2 rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-700"
                  >
                    Contact Us
                  </a>
                </div>
              </nav>
            </div>

            {/* footer in slide panel */}
            <div className="absolute bottom-6 left-6 right-6 text-sm text-slate-500">
              <div>© 2025 SPH Aviation</div>
            </div>
          </aside>
        </div>
      </header>
    </>
  );
}
