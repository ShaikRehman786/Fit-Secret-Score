import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiStar, FiHeart, FiAward, FiMessageCircle, FiArrowRight, FiUsers, FiShield, FiClock, FiTarget, FiCheckCircle } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import ScrollReveal from '../components/ui/ScrollReveal'
import TrustBadges from '../components/ui/TrustBadges'
import LazyImage from '../components/ui/LazyImage'
import { businessInfo, reviews } from '../data/products'

const stats = [
  { number: '5,000+', label: 'Happy Customers', icon: FiUsers },
  { number: '100%', label: 'Authentic Products', icon: FiShield },
  { number: 'Open', label: 'Till 10 PM', icon: FiClock },
  { number: '50+', label: 'Premium Brands', icon: FiAward },
]

const values = [
  {
    icon: FiStar,
    title: 'Quality First',
    desc: 'Every product is lab-tested and verified. We personally vet every brand before stocking.',
  },
  {
    icon: FiHeart,
    title: 'Trust & Transparency',
    desc: 'No hidden charges, no fake discounts — just honest pricing and complete transparency.',
  },
  {
    icon: FiCheckCircle,
    title: 'Clean Nutrition',
    desc: 'Our selection focuses on real nutrition — no additives, no fillers, no compromises.',
  },
  {
    icon: FiTarget,
    title: 'Expert Guidance',
    desc: 'Our team helps you choose the right products based on your specific health goals.',
  },
]

export default function About() {
  return (
    <div className="flex-1 flex flex-col">
      <Helmet>
        <title>About Us | Fit Secrets Store - Vijayawada's Most Trusted Fitness Store</title>
        <meta name="description" content="Learn about Fit Secrets Store - Vijayawada's most trusted fitness and nutrition store since 2020. 5.0 rating, 5000+ happy customers, 100% original products." />
      </Helmet>

      {/* Hero */}
      <section className="bg-slate-950 bg-gradient-to-b from-[#050505] to-[#0c0c0c] py-[110px] lg:py-[140px] relative overflow-hidden flex items-center justify-center border-b border-white/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.12),transparent_65%)] pointer-events-none" />
        <div className="absolute w-[60%] h-[60%] rounded-full bg-brand-green/5 blur-[120px] -top-1/4 -right-1/4 pointer-events-none" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-heading-wrapper"
          >
            <span className="inline-block text-brand-green font-extrabold text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase mb-5 bg-brand-green/10 px-4.5 py-2 rounded-full border border-brand-green/15 leading-none">
              About Us
            </span>
            <h1 className="text-h1 font-black text-white max-w-4xl mx-auto mb-6 tracking-tight leading-tight">
              Vijayawada's Most Trusted Fitness Store
            </h1>
            <p className="text-body text-slate-400 max-w-2xl mx-auto leading-relaxed mb-0 font-medium">
              Since 2020, Fit Secrets Store has been the go-to destination for health enthusiasts who refuse to compromise on quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#080808] border-t border-white/5 py-[60px]">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="bg-[#0e0e0e] border border-white/5 p-6 rounded-[20px] text-center flex flex-col items-center justify-center hover:border-brand-green/30 transition-all duration-300 group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                  <stat.icon className="text-xl" />
                </div>
                <div className="text-[28px] sm:text-[32px] lg:text-[38px] font-black text-white mb-1.5 tracking-tight">{stat.number}</div>
                <div className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-spacing-md bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div>
                <span className="inline-block text-brand-green font-extrabold text-[12px] tracking-[3px] uppercase mb-4">Our Story</span>
                <h2 className="text-h2 font-black text-black mb-6 tracking-tight leading-tight">
                  Born in Vijayawada,<br />Built for Champions
                </h2>
                <div className="space-y-6 text-[15px] sm:text-[16px] text-gray-600 leading-relaxed max-w-xl">
                  <p>
                    Fit Secrets Store started with a simple observation — finding genuine, high-quality health products in Vijayawada was nearly impossible. Most stores stocked expired items, fake brands, or charged exorbitant prices.
                  </p>
                  <p>
                    In 2020, we opened our doors on MG Road with a clear mission: provide 100% authentic products from world-class brands at the best prices in the region. Every product is personally tested and verified before it reaches your hands.
                  </p>
                  <p>
                    Today, we serve over 5,000 happy customers across Andhra Pradesh, stocking everything from premium supplements and ayurvedic products to organic foods, dry fruits, cold pressed oils, and natural honey.
                  </p>
                  <p>
                    With a {businessInfo.rating} rating and {businessInfo.reviewCount}+ Google reviews, we&apos;re proud to be Vijayawada&apos;s most trusted health and wellness destination.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative">
                {/* Ambient glow backdrop for image depth */}
                <div className="absolute -inset-3 rounded-[30px] bg-gradient-to-tr from-brand-green/8 to-transparent blur-xl pointer-events-none -z-10" />
                <div className="rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/50 bg-white p-2">
                  <div className="rounded-[18px] overflow-hidden">
                    <LazyImage
                      src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80"
                      alt="Fit Secrets Store"
                      wrapperClass="w-full aspect-[4/3] sm:aspect-[1.4]"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                    />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-950 text-white p-5 sm:p-6.5 rounded-[22px] shadow-[0_20px_45px_rgba(0,0,0,0.18)] border border-white/5 hidden sm:block -mt-10 ml-6 sm:ml-8 relative z-10 max-w-[210px]"
                >
                  <p className="font-black text-3xl tracking-tight text-brand-green">5,000+</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">Happy Customers</p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing-md bg-gray-50">
        <div className="section-container">
          <SectionHeading
            subtitle="Why Choose Us"
            title="What Sets Us Apart"
            description="Why thousands of customers across Andhra Pradesh trust Fit Secrets Store"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, i) => (
              <ScrollReveal key={i} delay={i * 0.06} className="h-full">
                <div className="group p-6 sm:p-7 bg-white rounded-[22px] border border-gray-100/80 hover:border-brand-green/20 shadow-sm hover:shadow-[0_20px_40px_rgba(0,200,83,0.06)] hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col h-full">
                  <div className="w-12 h-12 rounded-[16px] bg-brand-green/10 text-brand-green flex items-center justify-center mb-6 shrink-0 transition-all duration-300 group-hover:bg-brand-green group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(0,200,83,0.25)]">
                    <value.icon className="text-lg" />
                  </div>
                  <h3 className="font-bold text-[18px] text-[#0f172a] mb-2.5 tracking-tight">{value.title}</h3>
                  <p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed flex-1">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-spacing-md bg-white">
        <div className="section-container">
          <SectionHeading
            subtitle="Real Reviews"
            title={`${businessInfo.rating} Rating on Google`}
            description="Hear directly from our customers about their experience"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {reviews.slice(0, 3).map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 0.08} className="h-full">
                <div className="bg-white rounded-[22px] p-6 sm:p-8 h-full flex flex-col justify-between border border-gray-100 card-hover">
                  <div>
                    <div className="flex items-center gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <FiStar key={j} className={`text-xs ${j < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                      ))}
                    </div>
                    <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed mb-6 font-medium">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4.5 border-t border-slate-100/80">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-bold border-2 border-brand-green/20 shadow-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[14px] text-slate-900 leading-tight">{review.name}</span>
                        <span className="text-[11px] text-slate-450 mt-1 font-semibold uppercase tracking-wider">{review.date}</span>
                      </div>
                    </div>
                    <FiMessageCircle className="text-slate-350" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* CTA */}
      <section className="bg-black section-spacing-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.06),transparent_70%)] pointer-events-none" />
        <div className="section-container text-center relative z-10 flex flex-col items-center justify-center" style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <ScrollReveal>
            <div className="section-heading-wrapper">
              <h2 className="text-h2 text-white font-black mb-6 tracking-tight leading-tight">
                Ready to Transform Your Fitness Journey?
              </h2>
              <p className="subtitle text-gray-400 text-body max-w-xl mx-auto mb-10">
                Come visit us at MG Road, Punammathota. Our team is ready to help you find the perfect products for your health and fitness journey.
              </p>
            </div>
            <Link
              to="/contact"
              className="btn-premium btn-premium-green text-[17px] tracking-wide"
            >
              Get in Touch <FiArrowRight className="text-xl" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
