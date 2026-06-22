import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiAward, FiUsers, FiShield, FiClock, FiCheck } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import LazyImage from '../components/ui/LazyImage'

const timeline = [
  {
    year: '2020',
    title: 'The Spark',
    desc: 'Founded on MG Road in Vijayawada with a clean directive: import and supply 100% authentic international supplement lines, bypassing unverified middlemen.'
  },
  {
    year: '2022',
    title: 'Transforming Lives',
    desc: 'Expanded our footprint to natural organic dietary foods and premium dry fruits, supporting over 5,000 active clients in their health programs.'
  },
  {
    year: '2024',
    title: 'Absolute Trust',
    desc: 'Recognized as Vijayawada\'s highest rated supplement store, earning a perfect 5.0 Google rating backed by hundreds of verified reviews.'
  },
  {
    year: '2026',
    title: 'Digital Portal',
    desc: 'Inaugurated our premium digital storefront, providing door-to-door express dispatch services across the entire regional area.'
  }
]

const stats = [
  { number: '5,000+', label: 'Conscious Clients', sub: 'Supported on their journeys', icon: FiUsers },
  { number: '100%', label: 'Label Authenticity', sub: 'Third-party verified products', icon: FiShield },
  { number: 'Open', label: 'Till 10:00 PM', sub: 'Visit us on MG Road', icon: FiClock },
  { number: '50+', label: 'Premium Brands', sub: 'Imported label lines', icon: FiAward },
]

const values = [
  {
    num: '01',
    title: 'Rigorous Sourcing',
    desc: 'We personally test and verify every brand catalog. If we wouldn\'t consume it ourselves, it will never sit on our shelves.',
  },
  {
    num: '02',
    title: 'Client Confidentiality',
    desc: 'We treat your health consultation with the highest level of care, formulating program parameters designed for your physiology.',
  },
  {
    num: '03',
    title: 'Zero Chemical Additives',
    desc: 'Our organic honeys, cold pressed oils, and dry fruits are processed using zero chemical agents, preserving active enzymes.',
  },
  {
    num: '04',
    title: 'Nutritional Honesty',
    desc: 'No synthetic bulking agents, no hidden parameters. We provide clean, transparent supplement advice with label breakdowns.',
  },
]

export default function About() {
  return (
    <div className="flex-1 flex flex-col bg-[#F8F6F1] text-brand-dark">
      <Helmet>
        <title>About Us | Fit Secrets Store - Vijayawada's Most Trusted Fitness Store</title>
        <meta name="description" content="Learn about Fit Secrets Store - Vijayawada's most trusted fitness and nutrition store since 2020. 5.0 rating, 5000+ happy customers, 100% original products." />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 lg:py-[150px] overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,111,67,0.03),transparent_70%)] pointer-events-none" />
        <div className="absolute w-[50%] h-[50%] rounded-full bg-brand-gold/5 blur-[120px] -top-1/4 -right-1/4 pointer-events-none" />
        
        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="inline-block text-brand-green font-extrabold text-[10px] tracking-[3px] uppercase mb-5 bg-brand-green-light px-5 py-2.5 rounded-full border border-brand-green-light/40 leading-none font-heading mx-auto">
              OUR MANIFESTO
            </span>
            <h1 className="text-h1 font-heading font-black text-brand-dark max-w-4xl mx-auto mb-6 tracking-tight leading-tight">
              Calibrating Wellness.<br />
              <span className="font-serif-lux text-brand-gold font-normal italic">Empowering Progress.</span>
            </h1>
            <p className="text-[17px] text-brand-gray max-w-2xl mx-auto leading-relaxed mb-0 font-medium">
              Since 2020, Fit Secrets Store has stood as a sanctuary of nutritional excellence on MG Road. We reject the generic, formulating high-grade solutions for athletes and conscious achievers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Deck Grid */}
      <section className="bg-[#F8F6F1] py-24 lg:py-28 relative">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-slate-100 p-8 rounded-[28px] text-center flex flex-col items-center justify-center transition-all duration-400 group shadow-luxury-soft"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green-light text-brand-green flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-brand-green group-hover:text-white group-hover:shadow-sm">
                  <stat.icon className="text-xl" />
                </div>
                <div className="text-[34px] sm:text-[38px] font-black text-brand-green mb-1 tracking-tight font-heading leading-none">
                  {stat.number}
                </div>
                <div className="text-[10px] text-brand-dark font-extrabold uppercase tracking-widest font-heading mb-1">
                  {stat.label}
                </div>
                <div className="text-[12px] text-brand-gray font-medium">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Manifesto / Story */}
      <section className="py-28 lg:py-36 bg-white border-y border-slate-100 relative">
        <div className="absolute right-[5%] top-[10%] w-[500px] h-[500px] bg-brand-green/3 blur-[120px] rounded-full pointer-events-none" />
        <div className="section-container relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <ScrollReveal>
              <div>
                <span className="inline-block text-brand-green font-extrabold text-[10px] tracking-[3px] uppercase mb-4 font-heading">THE ART OF INTEGRITY</span>
                <h2 className="text-h2 font-black text-brand-dark mb-8 tracking-tight leading-tight font-heading">
                  A Dedication to Pure<br />
                  <span className="font-serif-lux text-brand-gold font-normal italic">Nutritional Sourcing</span>
                </h2>
                
                {/* Big serif blockquote */}
                <blockquote className="border-l-[3px] border-brand-gold pl-6 mb-8">
                  <p className="text-[20px] font-serif-lux text-brand-dark leading-relaxed">
                    "Finding genuine imported supplements in Vijayawada shouldn't feel like a gamble. We built this boutique to eliminate doubt, curating only label-verified, genuine wellness options."
                  </p>
                  <cite className="block text-[11px] font-black tracking-widest uppercase text-brand-gray mt-3 font-heading not-italic">
                    — Krish, Founder of Fit Secrets
                  </cite>
                </blockquote>

                <div className="space-y-6 text-[15.5px] text-brand-gray leading-relaxed font-medium">
                  <p>
                    Fit Secrets Store emerged from a clear local challenge. The supplement market in Andhra Pradesh was flooded with unverified batches, counterfeit proteins, and synthetic additives.
                  </p>
                  <p>
                    In 2020, we established our Flagship branch on MG Road. Our goal was absolute transparency: each whey gainer, multivitamin, and organic cold pressed oil must pass strict validation standards.
                  </p>
                  <p>
                    Today, we support thousands of active wellness programs. We work alongside certified trainers and dietitians, selecting premium dry fruits, natural unheated honey, and Ayurvedic botanicals to accelerate recovery safely.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Visual Frame */}
            <ScrollReveal delay={0.12}>
              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-brand-green-light/40 to-transparent blur-xl pointer-events-none -z-10" />
                <div className="rounded-[32px] overflow-hidden border border-slate-100 bg-[#F8F6F1] p-3 shadow-luxury-soft">
                  <div className="rounded-[24px] overflow-hidden">
                    <LazyImage
                      src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80"
                      alt="Fit Secrets Store Front"
                      wrapperClass="w-full aspect-[4/3] sm:aspect-[1.35]"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                    />
                  </div>
                </div>
                
                {/* Float Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="bg-brand-green text-white p-7 rounded-[24px] shadow-luxury-depth hidden sm:block -mt-12 ml-8 relative z-10 max-w-[240px] border border-brand-green/20"
                >
                  <p className="font-serif-lux text-3xl font-normal italic text-brand-gold">Authenticity</p>
                  <p className="text-[10px] font-black text-slate-200 mt-1.5 uppercase tracking-[2px] leading-snug font-heading">
                    Every batch checked, verified & certified.
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Alternating Timeline */}
      <section className="section-spacing-lg bg-[#F8F6F1] relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-brand-green-light/10 blur-[130px] pointer-events-none" />
        
        <div className="section-container relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[3px] text-brand-green uppercase bg-brand-green-light px-3.5 py-1.5 rounded-full border border-brand-green-light/40 font-heading mb-3">HISTORICAL PROGRESSION</span>
            <h2 className="text-h2 font-black text-brand-dark font-heading leading-tight tracking-tight">
              The Evolution of Fit Secrets
            </h2>
            <p className="text-[15.5px] text-brand-gray font-medium leading-relaxed mt-4">
              Tracing our steps from a local boutique to Vijayawada's trusted luxury health and wellness destination.
            </p>
          </div>
          
          <div className="relative max-w-3xl mx-auto mt-16 pl-6 sm:pl-0">
            {/* Fine gold line */}
            <div className="absolute left-[9px] sm:left-1/2 top-0 bottom-0 w-[1.5px] bg-brand-gold/25 -translate-x-1/2" />
            
            <div className="space-y-12">
              {timeline.map((item, i) => {
                const isEven = i % 2 === 0
                return (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <div className={`relative flex w-full ${isEven ? 'justify-start sm:justify-start' : 'justify-start sm:justify-end'}`}>
                      {/* Milestone gold ring */}
                      <div className="absolute left-[9px] sm:left-1/2 w-4.5 h-4.5 rounded-full bg-brand-gold border-[3.5px] border-[#F8F6F1] ring-[3px] ring-brand-gold/30 -translate-x-1/2 z-10 shadow-sm" />
                      
                      {/* Card layout */}
                      <div className={`w-full sm:w-[calc(50%-28px)] bg-white p-7 sm:p-8 rounded-[28px] border border-slate-100 shadow-luxury-soft hover:border-brand-green/20 hover:-translate-y-1 transition-all duration-400 ${
                        isEven ? 'sm:text-right' : 'sm:text-left'
                      }`}>
                        <span className="inline-block text-[24px] font-black text-brand-green tracking-tight mb-1 font-heading">
                          {item.year}
                        </span>
                        <h3 className="font-extrabold text-[16.5px] text-brand-dark mb-2 tracking-tight font-heading">
                          {item.title}
                        </h3>
                        <p className="text-[13.5px] text-brand-gray leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section-spacing-lg bg-white border-b border-slate-100 relative">
        <div className="section-container">
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[3px] text-brand-green uppercase bg-brand-green-light px-3.5 py-1.5 rounded-full border border-brand-green-light/40 font-heading mb-3">OUR CORE FOUNDATIONS</span>
            <h2 className="text-h2 font-black text-brand-dark font-heading leading-tight tracking-tight">
              Values We Refuse to Compromise
            </h2>
            <p className="text-[15.5px] text-brand-gray font-medium leading-relaxed mt-4">
              Building a health brand requires transparency. Here are the core pillars that guide our daily operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {values.map((value, i) => (
              <ScrollReveal key={i} delay={i * 0.06} className="h-full">
                <div className="luxury-feature-card flex flex-col items-center text-center h-full group">
                  <div className="flex flex-col items-center mb-6">
                    <span className="luxury-feature-number text-[#B68A45] font-black">{value.num}</span>
                    <div className="w-8 h-8 rounded-full border border-brand-green/10 text-brand-green flex items-center justify-center mt-3 group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition-all duration-300 shadow-sm">
                      <FiCheck className="text-xs" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-[17px] text-brand-dark mb-3.5 tracking-tight font-heading group-hover:text-brand-green transition-colors text-center">
                    {value.title}
                  </h3>
                  <p className="text-[13.5px] text-brand-gray leading-relaxed flex-1 font-medium text-center max-w-[240px]">
                    {value.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
