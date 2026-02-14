export function offlineSvgTemplate() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b0f19"/>
  <text x="80" y="220" fill="#ffffff" font-size="64" font-family="system-ui, -apple-system, Segoe UI, Roboto">You’re Offline</text>
  <text x="80" y="300" fill="#cbd5e1" font-size="28" font-family="system-ui, -apple-system, Segoe UI, Roboto">Please check your connection and try again.</text>
  <circle cx="1040" cy="220" r="90" fill="rgba(255,255,255,0.08)"/>
  <path d="M980 220c40-40 120-40 160 0" stroke="#fff" stroke-width="10" fill="none" opacity="0.6"/>
  <path d="M1010 250c25-25 75-25 100 0" stroke="#fff" stroke-width="10" fill="none" opacity="0.6"/>
  <circle cx="1060" cy="290" r="10" fill="#fff" opacity="0.7"/>
</svg>`;
}