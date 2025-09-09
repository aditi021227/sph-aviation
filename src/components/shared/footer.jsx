import React, { useEffect, useRef, useState } from "react";

export default function Footer() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // for mouse parallax
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // reveal on scroll
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // small pointer-based parallax — only when user moves mouse over footer
  function handlePointerMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // scale down movement
    setOffset({ x: px * 10, y: py * 6 });
  }

  function handlePointerLeave() {
    // smoothly reset
    setOffset({ x: 0, y: 0 });
  }

  // small helpers for staggered reveal delays
  const columnDelay = (i) => ({ transitionDelay: `${i * 100}ms` });

  return (
    <footer className="mt-12">
      <div
        ref={ref}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className={`w-full overflow-hidden rounded-t-xl border-t border-slate-200/5 transition-transform duration-700 ${
          visible ? "opacity-100" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative">
          {/* animated gradient backdrop */}
          <div className="absolute inset-0 -z-10 footer-gradient" />

          {/* content wrapper gets a subtle transform based on pointer */}
          <div
className="max-w-7xl mx-auto px-6 py-16 lg:py-20 mr-12 md:mr-18"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y * 0.6}px, 0)`,
              transition: "transform 220ms linear",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left: logo + desc */}
              <div
                className="md:col-span-4 md:pl-6 stagger-reveal"
                style={columnDelay(0)}
              >
                <img
                  src="/logo.png"
                  alt="SPH Aviation"
                  className="h-14 mb-4 footer-logo"
                />
                <p className="text-sm leading-relaxed text-slate-200 mb-6 max-w-lg">
                  Welcome to SPH AVIATION—delivering comprehensive drone training,
                  certification, and hands-on experience with an emphasis on
                  safety and excellence.
                </p>

                <div className="flex items-center gap-3">
                  <a className="social-btn" href="#" aria-label="facebook">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-slate-100"
                      aria-hidden="true"
                    >
                      <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.3v-2.9h2.3V9.4c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .074 2 .074v2.2h-1.1c-1.1 0-1.4.66-1.4 1.3v1.6h2.4l-.38 2.9h-2v7A10 10 0 0022 12z" />
                    </svg>
                  </a>

                  <a className="social-btn" href="#" aria-label="instagram">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-slate-100"
                      aria-hidden="true"
                    >
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zM18.5 6a1 1 0 11-1 1 1 1 0 011-1z" />
                    </svg>
                  </a>

                  <a className="social-btn" href="#" aria-label="linkedin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-slate-100"
                      aria-hidden="true"
                    >
                      <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 17.5V10.5H5.67v7h2.67zM7 9.32a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zM18.33 17.5v-4.1c0-2.2-1.18-3.22-2.75-3.22-1.26 0-1.82.7-2.13 1.19v-1.02H10.7c.035.68 0 7 0 7h2.66v-3.9c0-.2.015-.4.08-.55.18-.4.58-.82 1.26-.82.89 0 1.25.62 1.25 1.53v3.74H18.33z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Middle-left: About */}
              <div
                className="md:col-span-3 stagger-reveal"
                style={columnDelay(1)}
              >
                <h4 className="text-slate-100 font-semibold mb-4">ABOUT</h4>
                <ul className="space-y-2">
                  <li>
                    <a className="footer-link" href="#about">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className="footer-link" href="#courses">
                      Courses
                    </a>
                  </li>
                  <li>
                    <a className="footer-link" href="#portfolio">
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a className="footer-link" href="#presence">
                      Presence
                    </a>
                  </li>
                </ul>
              </div>

              {/* Middle-right: Resources */}
              <div
                className="md:col-span-3 stagger-reveal"
                style={columnDelay(2)}
              >
                <h4 className="text-slate-100 font-semibold mb-4">RESOURCES</h4>
                <ul className="space-y-2">
                  <li>
                    <a className="footer-link" href="#team">
                      Team
                    </a>
                  </li>
                  <li>
                    <a className="footer-link" href="#blog">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="footer-link" href="#contact">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Right: Contact */}
              <div
                className="md:col-span-2 text-sm text-slate-200 pr-6 stagger-reveal"
                style={columnDelay(3)}
              >
                <h4 className="text-slate-100 font-semibold mb-4">CONTACT</h4>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25l8.485 5.657a2.25 2.25 0 002.53 0L22 8.25M21 6.75V17.25A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75" />
                    </svg>

                    <a href="mailto:info@sphaviation.com" className="hover:underline">
                      info@sphaviation.com
                    </a>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-2.625a1.125 1.125 0 00-1.125-1.125h-3.037a1.125 1.125 0 00-1.104.918c-.128.77-.68 1.32-1.45 1.45a11.25 11.25 0 01-9.04-9.04c.13-.77.68-1.322 1.45-1.45.53-.088.918-.55.918-1.104V4.125A1.125 1.125 0 007.125 3H4.5A2.25 2.25 0 002.25 5.25V6.75z" />
                    </svg>

                    <a href="tel:+918527787146" className="hover:underline">
                      +91 85277 87146
                    </a>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.5-4.5 6-7.364 6-10.5A6 6 0 006 10.5c0 3.136 1.5 6 6 10.5zm0-10.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                    </svg>

                    <address className="not-italic">
                      Building No. 464, Kadipur Enclave,<br />
                      Gurugram, Haryana 122002
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-slate-200/6 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-slate-300 text-sm">
            <div>© Copyright 2025. All Rights Reserved.</div>
            <div className="flex items-center gap-6 mt-3 md:mt-0">
              <a className="footer-bottom-link" href="#">
                Legal Disclaimer
              </a>
              <a className="footer-bottom-link" href="#">
                Privacy Policy
              </a>
              <a className="footer-bottom-link" href="#">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
