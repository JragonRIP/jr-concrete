type MichiganUPProps = {
  className?: string;
};

export function MichiganUP({ className = "" }: MichiganUPProps) {
  return (
    <svg
      viewBox="0 0 640 280"
      className={className}
      role="img"
      aria-label="Outline of Michigan’s Upper Peninsula"
    >
      <path
        d="M38 168c18-10 41-22 68-28 22-5 44-4 62 6 14 8 22 12 38 8 21-6 28-28 48-36 16-7 36-4 52 2 12 5 26 18 42 14 14-4 18-20 34-28 18-9 42-6 62-2 24 5 46 18 70 16 18-2 28-14 46-16 22-3 48 8 70 18 16 8 34 22 36 40 2 16-10 28-8 44 2 14 18 18 22 32 3 12-6 22-18 28-28 14-62 8-92 4-26-4-48-14-74-14-22 0-38 12-60 14-28 3-54-8-80-6-18 1-32 12-50 14-24 3-50-6-72-2-16 3-26 16-44 18-20 3-44-6-62-16-24-14-32-36-50-50-14-11-32-16-50-22-8-3-14-10-12-20 2-8 10-12 22-18z"
        fill="currentColor"
      />
      <circle cx="168" cy="148" r="4.5" fill="#e24a1a" />
      <text
        x="180"
        y="136"
        fill="currentColor"
        fontSize="13"
        fontFamily="var(--font-geist-sans), sans-serif"
        letterSpacing="0.12em"
      >
        POWERS
      </text>
    </svg>
  );
}
