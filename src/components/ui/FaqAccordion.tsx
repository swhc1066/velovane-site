"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqAccordionProps {
  question: string;
  answer: string;
  number: number;
  defaultOpen?: boolean;
}

export function FaqAccordion({
  question,
  answer,
  number,
  defaultOpen = false,
}: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-n-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <div className="flex items-start gap-4">
          <div className="flex shrink-0 items-center gap-3 pt-1">
            <div className="h-1 w-px bg-n-400" />
            <span className="font-mono text-[10px] font-light uppercase tracking-widest text-n-500">
              Q{number}
            </span>
          </div>
          <h3 className="text-lg font-medium leading-snug text-n-800">
            {question}
          </h3>
        </div>
        <span className="shrink-0 text-xl text-n-400">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-16 pr-8 text-sm font-light leading-relaxed text-n-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
