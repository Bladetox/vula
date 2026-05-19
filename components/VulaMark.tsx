/**
 * VulaMark — the Vula brand mark.
 *
 * A single hinge point at the base. Two arms diverge upward to form a V.
 * An arc traces the sweep of opening between them.
 * Uses currentColor — works on any background, any colour.
 *
 * Usage:
 *   <VulaMark size={28} />
 *   <VulaMark size={48} color="#1a6b3c" />
 */
export function VulaMark({
  size = 28,
  color,
  className,
  style,
}: {
  size?: number
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.1)}
      viewBox="0 0 100 110"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ color: color ?? 'currentColor', display: 'block', ...style }}
    >
      {/* Motion arc — the sweep of opening */}
      <path
        d="M19 36.31 A62 62 0 0 1 81 36.31"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.32}
      />
      {/* Right arm — frame reference, ghost state */}
      <line
        x1="50" y1="90" x2="81" y2="36.31"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.32}
      />
      {/* Left arm — door in open position, dominant */}
      <line
        x1="50" y1="90" x2="19" y2="36.31"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Hinge point — the pivot, the origin */}
      <circle cx="50" cy="90" r="4.2" fill="currentColor" />
    </svg>
  )
}
