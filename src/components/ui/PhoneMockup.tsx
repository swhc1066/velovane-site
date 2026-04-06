interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
}

export function PhoneMockup({ src, alt, className = "" }: PhoneMockupProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-surface-card ${className}`}
      style={{ width: 220, height: 454 }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-surface-dark" />
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
