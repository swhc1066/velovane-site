import type { ReactNode } from "react";

interface BracketCardProps {
  children: ReactNode;
  className?: string;
}

export function BracketCard({ children, className = "" }: BracketCardProps) {
  return (
    <div className={`relative bg-white p-6 ${className}`}>
      <div className="bracket-corner bracket-tl" />
      <div className="bracket-corner bracket-tr" />
      <div className="bracket-corner bracket-bl" />
      <div className="bracket-corner bracket-br" />
      {children}
    </div>
  );
}
