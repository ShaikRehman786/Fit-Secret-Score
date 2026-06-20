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
    <section className="section-spacing-sm bg-white">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-gray-100 card-hover h-full">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 text-brand-green flex items-center justify-center mb-5 shrink-0">
                  <badge.icon className="text-xl" />
                </div>
                <h3 className="font-bold text-[16px] text-black mb-2">{badge.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed max-w-[220px] flex-1">{badge.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
