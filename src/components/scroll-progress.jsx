import { motion, useScroll, useTransform } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 h-40 w-2 bg-slate-300 dark:bg-slate-700 rounded-full z-50  backdrop-blur-sm">
      <motion.div
        className="absolute top-0 left-0 w-full bg-cyan-600 dark:bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)]"
        style={{ height }}
      />
    </div>
  );
}
