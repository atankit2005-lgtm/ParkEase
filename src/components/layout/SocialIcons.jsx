// Lightweight custom social glyphs — lucide-react dropped brand/logo icons,
// so these are simple generic outline icons in the same stroke style (24x24, stroke-based).

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function Instagram({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Twitter({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M22 4.5c-.8.4-1.6.6-2.5.8a4.3 4.3 0 0 0 1.9-2.4 8.6 8.6 0 0 1-2.7 1 4.3 4.3 0 0 0-7.3 3.9A12.2 12.2 0 0 1 2.9 3.7a4.3 4.3 0 0 0 1.3 5.7 4.3 4.3 0 0 1-1.9-.5v.1a4.3 4.3 0 0 0 3.4 4.2 4.3 4.3 0 0 1-1.9.1 4.3 4.3 0 0 0 4 3 8.6 8.6 0 0 1-5.3 1.8A9 9 0 0 1 1 17.9a12.2 12.2 0 0 0 6.6 1.9c7.9 0 12.2-6.5 12.2-12.2v-.6A8.7 8.7 0 0 0 22 4.5Z" />
    </svg>
  );
}

export function Linkedin({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4a2.5 2.5 0 0 1 5 0v4" />
      <line x1="11.5" y1="10" x2="11.5" y2="17" />
    </svg>
  );
}

export function Facebook({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 8h2V5h-2a3.5 3.5 0 0 0-3.5 3.5V11H9v3h2.5v6h3v-6H17l.5-3h-3V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}
