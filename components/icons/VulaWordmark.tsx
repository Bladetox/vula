export function VulaWordmark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="Vula"
      role="img"
    >
      <rect width="32" height="32" rx="9" fill="#1a6b3c" />
      <path
        d="M9 9l7 14 7-14"
        stroke="white"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
