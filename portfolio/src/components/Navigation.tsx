"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import styles from "./Navigation.module.scss";

const links = [
  { href: "#projects", label: "프로젝트" },
  { href: "#skills", label: "역량" },
  { href: "#career", label: "경력" },
  { href: "#contact", label: "연락처" }
];

export function Navigation() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [0.2, 0.6]);
  const backgroundColor = useMotionTemplate`rgba(249, 252, 255, ${backgroundOpacity})`;

  return (
    <header className="sticky top-0 z-50 relative">
      <motion.div style={{ scaleX }} className={styles.progress} />
      <motion.nav className="backdrop-blur-md" style={{ backgroundColor }}>
        <div
          className={`flex items-center justify-between gap-6 rounded-full border border-slate-200/70 px-5 py-3 shadow-lg shadow-primary-100/40 transition-all sm:px-8 ${
            isScrolled ? "mt-4" : "mt-6"
          }`}
        >
          <Link href="#top" className="font-display text-lg font-semibold text-primary-700">
            Jian Choi
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-primary-600">
                {link.label}
              </a>
            ))}
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-primary-200 hover:text-primary-500 md:hidden">
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>
    </header>
  );
}
