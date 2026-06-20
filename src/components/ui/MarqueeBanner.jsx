const items = [
  { icon: '✓', text: '100% Authentic Products' },
  { icon: '✓', text: 'Free Delivery on ₹500+' },
  { icon: '✓', text: 'Best Prices Guaranteed' },
  { icon: '★', text: '5.0 Google Rating' },
  { icon: '✓', text: 'Lab-Tested & Certified' },
  { icon: '✓', text: 'Easy 7-Day Returns' },
]

export default function MarqueeBanner() {
  return (
    <div className="bg-black border-t border-white/5 overflow-hidden">
      <div className="flex animate-marquee py-3">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-[13px] font-medium text-white/70 shrink-0 mx-8"
          >
            <span className="text-brand-green text-sm">{item.icon}</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
