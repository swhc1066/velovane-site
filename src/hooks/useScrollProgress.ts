"use client";

import { type RefObject } from "react";
import { useScroll } from "framer-motion";

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}
