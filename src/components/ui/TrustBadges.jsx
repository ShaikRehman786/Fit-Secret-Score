import { FiCheckCircle, FiTruck, FiTag, FiLock } from 'react-icons/fi'
import ScrollReveal from './ScrollReveal'

const badges = [
  { icon: FiCheckCircle, title: '100% Authentic', desc: 'Lab-tested and verified products, guaranteed original' },
  { icon: FiTruck, title: 'Free Delivery', desc: 'Complimentary delivery across Vijayawada on orders above ₹500' },
  { icon: FiTag, title: 'Best Prices', desc: 'Lowest prices in Vijayawada with wholesale rates available' },
  { icon: FiLock, title: 'Secure Checkout', desc: 'Protected payments with easy return policy' },
]

export default function TrustBadges() {
  return (
    <section className="section-spacing-md bg-slate-950 bg-gradient-to-b from-[#050505] to-[#0c0c0c] relative overflow-hidden border-y border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute w-[40%] h-[40%] rounded-full bg-brand-green/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {badges.map((badge, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="flex flex-col items-center text-center p-8 bg-white/5 backdrop-blur-md rounded-[20px] border border-white/10 hover:border-brand-green/20 hover:bg-white/[0.07] transition-all duration-500 h-full group shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
                <div className="w-14 h-14 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-6 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(0,230,118,0.15)]">
                  <badge.icon className="text-2xl" />
                </div>
                <h3 className="font-extrabold text-[16px] sm:text-[17px] text-white mb-2.5 font-heading tracking-tight">{badge.title}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed max-w-[220px] flex-1">{badge.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
