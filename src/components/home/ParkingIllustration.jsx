// Custom, on-brand illustration built in SVG — a top-down parking grid with
// live availability indicators, echoing the product's core idea instead of a
// generic stock photo of a car.
export default function ParkingIllustration() {
  const slots = [
    { x: 20, y: 20, filled: true },
    { x: 100, y: 20, filled: false },
    { x: 180, y: 20, filled: true },
    { x: 260, y: 20, filled: false },
    { x: 20, y: 100, filled: false },
    { x: 100, y: 100, filled: true },
    { x: 180, y: 100, filled: false },
    { x: 260, y: 100, filled: false },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto animate-float">
      <svg viewBox="0 0 340 220" className="w-full h-auto drop-shadow-2xl">
        <rect x="0" y="0" width="340" height="220" rx="24" fill="#0F172A" />
        {/* Lane divider */}
        <line x1="0" y1="70" x2="340" y2="70" stroke="#334155" strokeWidth="2" strokeDasharray="8 6" />
        <line x1="0" y1="150" x2="340" y2="150" stroke="#334155" strokeWidth="2" strokeDasharray="8 6" />

        {slots.map((s, i) => (
          <g key={i}>
            <rect
              x={s.x}
              y={s.y}
              width="60"
              height="50"
              rx="8"
              fill={s.filled ? '#1E293B' : '#10B981'}
              fillOpacity={s.filled ? 1 : 0.15}
              stroke={s.filled ? '#334155' : '#10B981'}
              strokeWidth="1.5"
            />
            {s.filled ? (
              <rect x={s.x + 12} y={s.y + 14} width="36" height="22" rx="6" fill="#475569" />
            ) : (
              <circle cx={s.x + 30} cy={s.y + 25} r="4" fill="#10B981" />
            )}
          </g>
        ))}
      </svg>

      {/* Floating live-status card */}
      <div className="absolute -bottom-6 -left-4 bg-white rounded-xl shadow-soft px-4 py-3 flex items-center gap-3 border border-border">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
        </span>
        <div>
          <p className="text-xs font-semibold text-darktext leading-none">5 slots free</p>
          <p className="text-[11px] text-lighttext mt-1">Cyber Hub Plaza</p>
        </div>
      </div>

      <div className="absolute -top-5 -right-3 bg-white rounded-xl shadow-soft px-4 py-2.5 border border-border">
        <p className="text-xs font-semibold text-primary">₹20/hr</p>
      </div>
    </div>
  );
}
