export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-neon-blue/60 bg-surface/70 glow-blue">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5.5 text-neon-blue"
          aria-hidden="true"
        >
          <path
            d="M7 8h10a4 4 0 0 1 3.9 3.1l.8 3.5A2.7 2.7 0 0 1 19 18c-1 0-1.6-.5-2.2-1.2L15.6 15H8.4l-1.2 1.8C6.6 17.5 6 18 5 18a2.7 2.7 0 0 1-2.7-3.4l.8-3.5A4 4 0 0 1 7 8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M8 11v2.2M6.9 12.1h2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="15.4" cy="11.6" r="1" fill="currentColor" />
          <circle cx="17.2" cy="13.2" r="1" fill="currentColor" />
        </svg>
      </span>
      <span className="font-title text-xl leading-none tracking-tight">
        New<span className="text-gradient-neon">Games</span>
      </span>
    </div>
  );
}
