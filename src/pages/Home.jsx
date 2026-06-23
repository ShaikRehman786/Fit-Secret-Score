import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar, FiCheck, FiTruck, FiShield, FiChevronLeft, FiChevronRight, FiUsers, FiAward, FiMessageCircle } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import MarqueeBanner from '../components/ui/MarqueeBanner'
import ScrollReveal from '../components/ui/ScrollReveal'
import ProductCard from '../components/product/ProductCard'
import QuickViewModal from '../components/product/QuickViewModal'
import LazyImage from '../components/ui/LazyImage'
import { businessInfo, products, reviews, categories as allCategories } from '../data/products'
import { useCart } from '../context/useCart'
import wheyProtein from '../assets/yu.png'
import honey from '../assets/yy.png'
import almonds from '../assets/yz.png'
import ayurvedicCategoryImg from '../assets/ayurvedic_category.png'
import dryfruitsCategoryImg from '../assets/dryfruits_category.png'

const categories = allCategories.filter(c => c.featured) || []

const heroImages = [
  wheyProtein,
  honey,
  almonds
]

const heroTrust = [
  { icon: FiCheck, text: '100% Authentic Supplements' },
  { icon: FiShield, text: 'Certified Lab Testing' },
  { icon: FiTruck, text: 'Vijayawada Free Express Delivery' },
]

const stats = [
  { value: '5,000+', label: 'Happy Customers', desc: 'Active wellness journeys supported', icon: FiUsers },
  { value: '50+', label: 'Premium Brands', desc: 'Handpicked international labels', icon: FiAward },
  { value: '4.9★', label: 'Google Rating', desc: 'Over 210 verified reviews', icon: FiStar },
  { value: '24/7', label: 'Expert Support', desc: 'Free nutritional counseling', icon: FiMessageCircle },
]

const features = [
  { num: '01', title: 'Lab Tested Integrity', desc: 'Every batch of whey protein and organic items is verified for purity and label accuracy, guaranteed.' },
  { num: '02', title: 'Curated Farm-To-Store', desc: 'Our cold-pressed oils, pure A2 cow ghee, and raw honeys are sourced directly from trusted regional producers.' },
  { num: '03', title: 'Nutritionist-Led Consults', desc: 'We build tailored supplement plans to fit your biological needs, helping you reach your target goals.' },
  { num: '04', title: 'Express Store Delivery', desc: 'Fast, secure home delivery across all locations in Vijayawada, with free shipping over ₹500.' },
]

const staticParticles = [
  { top: '12%', left: '18%', size: 6, delay: '0s', duration: '5s', type: 'gold' },
  { top: '30%', left: '82%', size: 10, delay: '1s', duration: '6s', type: 'green' },
  { top: '72%', left: '10%', size: 8, delay: '2s', duration: '7s', type: 'gold' },
  { top: '60%', left: '88%', size: 11, delay: '1.5s', duration: '5.5s', type: 'green' },
  { top: '22%', left: '48%', size: 7, delay: '0.5s', duration: '8s', type: 'gold' },
  { top: '82%', left: '42%', size: 9, delay: '2.2s', duration: '6s', type: 'green' },
  { top: '45%', left: '6%', size: 5, delay: '3s', duration: '7.5s', type: 'gold' },
  { top: '18%', left: '65%', size: 8, delay: '0.8s', duration: '6.5s', type: 'green' },
  { top: '88%', left: '72%', size: 6, delay: '1.8s', duration: '5.8s', type: 'gold' },
  { top: '55%', left: '30%', size: 7, delay: '2.5s', duration: '7.2s', type: 'green' },
]

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {staticParticles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-pulse-soft ${p.type === 'green' ? 'bg-brand-green/20' : 'bg-brand-gold/20'}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}
    </div>
  )
}



function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 4500) // 4.5s per slide

    return () => clearInterval(interval)
  }, [isHovered])

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <section className="relative pt-[112px] pb-10 px-5 md:pt-[140px] md:pb-32 lg:pt-[160px] lg:pb-40 overflow-hidden bg-gradient-to-br from-[#0A2215] via-[#0E2C1B] to-[#123622] text-white grain-texture">
      {/* Cinematic premium glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-gold/8 blur-[140px] pointer-events-none z-0 animate-cinematic-glow" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-green/8 blur-[130px] pointer-events-none z-0 animate-cinematic-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-green/3 blur-[160px] pointer-events-none z-0" />
      
      {/* Premium dot grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(200,169,107,0.025)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

      {/* Floating green energy particles */}
      <FloatingParticles />

      <div className="section-container relative z-10 flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          
          {/* Hero text */}
          <motion.div 
            className="order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[3px] uppercase text-brand-gold bg-brand-gold/10 px-4 py-2 rounded-full mb-6 border border-brand-gold/20 leading-none mx-auto lg:mx-0 w-fit"
            >
              <FiStar className="text-brand-gold text-xs fill-brand-gold" />
              Vijayawada's Luxury Wellness Desk
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[32px] sm:text-[40px] lg:text-h1 font-black text-[#F8F4EC] mb-6 font-heading tracking-tight leading-[1.15] lg:leading-[1.02]"
            >
              Refined Nutrition.<br />
              The Art of <span className="font-serif-lux text-brand-gold font-normal italic">Vitality.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] lg:text-[17px] text-slate-350 max-w-lg mb-10 leading-relaxed font-medium mx-auto lg:mx-0"
            >
              Step into Vijayawada's premier health boutique. Discover lab-verified proteins, clean natural honey, organic diet items, and high-potency Ayurvedic botanicals designed for the conscious achiever.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center w-full max-w-[300px] sm:max-w-none mx-auto lg:mx-0"
            >
              <Link
                to="/products"
                className="btn-pill btn-pill-gold text-[12px] w-full sm:w-auto font-black shadow-lg group"
              >
                Explore Collection
                <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`https://wa.me/${businessInfo.whatsapp}?text=Hi Fit Secrets Store! I'd like a luxury wellness consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-white/10 text-white hover:bg-white/20 border border-white/25 text-[12px] w-full sm:w-auto font-black backdrop-blur-sm"
              >
                Free Consultation
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 border-t border-white/10 pt-8 mt-10"
            >
              {heroTrust.map((item, i) => (
                <motion.span 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  className="flex items-center gap-2 text-[12px] text-slate-300 font-bold tracking-wide"
                >
                  <item.icon className="text-brand-gold text-sm shrink-0" />
                  {item.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Media Showcase — Premium auto-scrolling image showcase */}
          <motion.div
            className="order-1 lg:order-2 w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <div 
              className="relative w-full max-w-[320px] lg:max-w-[420px] mx-auto lg:mx-0 aspect-[4/5] pointer-events-auto flex items-center justify-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Premium lighting glow behind showcase (radial only, no box shape) */}
              <div 
                className="absolute w-[120%] h-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0 opacity-80"
                style={{
                  background: 'radial-gradient(circle, rgba(15, 91, 67, 0.35) 0%, rgba(15, 91, 67, 0.15) 35%, transparent 70%)',
                }}
              />
              
              {/* Product wrapper with float animation */}
              <div className="relative w-full h-full z-10 flex items-center justify-center animate-float-product">
                <AnimatePresence>
                  <motion.img
                    key={currentIndex}
                    src={heroImages[currentIndex]}
                    alt={`Premium Showcase Product`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                    className="absolute w-full h-full object-contain pointer-events-none select-none p-4"
                    style={{
                      filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.45)) drop-shadow(0 0 18px rgba(15,91,67,0.25))',
                    }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats / Ratings bottom section */}
        <div className="w-full pt-10 border-t border-white/10 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <ScrollReveal key={i} className="w-full" delay={i * 0.06}>
                  <div className="luxury-hero-stat-card group">
                    <div className="luxury-hero-stat-icon-wrapper">
                      <Icon className="luxury-hero-stat-icon" />
                    </div>
                    <div className="luxury-hero-stat-value">
                      {stat.value}
                    </div>
                    <div className="luxury-hero-stat-label">
                      {stat.label}
                    </div>
                    <div className="luxury-hero-stat-desc">
                      {stat.desc}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


function CategoriesSection() {
  const categoryImages = {
    'nutritional-supplements': 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600&q=80',
    'ayurvedic': ayurvedicCategoryImg,
    'organic': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    'dryfruits': dryfruitsCategoryImg,
  }

  return (
    <section className="section-spacing-md bg-[#F8F4EC] relative">
      <div className="section-container">
        
        {/* Asymmetrical Heading Section */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-end mb-20">
          <div>
            <span className="text-[10px] font-black tracking-[3px] text-brand-green uppercase font-heading block mb-3">CURATED SELECTION</span>
            <h2 className="text-h2 font-black text-brand-dark font-heading leading-tight tracking-tight">
              Engineered for Pure<br />
              <span className="font-serif-lux text-brand-gold font-normal italic">Physical Performance</span>
            </h2>
          </div>
          <p className="text-[16px] text-brand-gray font-medium leading-relaxed max-w-md">
            No filler, zero artificial shortcuts. Browse our selected category suites, carefully formulated to accelerate recovery, balance, and clean energy.
          </p>
        </div>

        {/* Asymmetric vertical staggered layout grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {categories.map((cat, i) => {
            const imageSrc = categoryImages[cat.id] || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80'
            const staggeredClass = i % 2 === 1 ? 'lg:translate-y-12' : ''
            
            return (
              <ScrollReveal key={cat.id} delay={i * 0.08} className={staggeredClass}>
                <Link
                  to={`/products?category=${cat.id}`}
                  className="group block luxury-category-card relative"
                >
                  <div className="absolute inset-0 bg-[#EFE8DC] z-0" />
                  <div className="w-full h-full overflow-hidden relative z-10">
                    <LazyImage
                      src={imageSrc}
                      alt={cat.name}
                      wrapperClass="w-full h-full"
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-108 transition-all duration-700 ease-out"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/15 transition-colors duration-500 z-15" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-transparent z-15" />
                  
                  <div className="absolute inset-4 border border-brand-gold/0 group-hover:border-brand-gold/35 rounded-[20px] transition-all duration-500 z-20 pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-25 bg-[#0F5B43]/85 backdrop-blur-md border-t border-white/10 border-b border-brand-gold/30 text-[#F8F4EC]">
                    <h3 className="font-extrabold text-[17px] sm:text-[19px] tracking-tight mb-1 font-heading text-[#F8F4EC] group-hover:text-brand-gold transition-colors duration-300">
                      {cat.name}
                    </h3>
                    {cat.count && (
                      <span className="text-brand-gold text-[10px] font-black tracking-widest uppercase mt-0.5 block font-heading">
                        {cat.count} Products
                      </span>
                    )}
                  </div>
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-25 shadow-md">
                    <FiArrowRight className="text-sm" />
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PopularProductsSection({ onQuickView }) {
  const bestSellers = products.filter(p => p.isBestSeller)

  return (
    <section className="section-spacing-md bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="absolute left-[8%] top-[15%] w-[400px] h-[400px] bg-brand-green/3 blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute right-[8%] bottom-[15%] w-[400px] h-[400px] bg-brand-gold/3 blur-[110px] pointer-events-none rounded-full" />

      <div className="section-container relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center justify-center">
          <span className="text-[10px] font-black tracking-[3px] text-brand-green uppercase bg-brand-green-light px-4 py-2 rounded-full border border-brand-green-light/40 font-heading mb-5">BEST SELLERS</span>
          <h2 className="text-h2 font-black text-brand-dark font-heading leading-tight tracking-tight text-center">
            Curated Customer Favorites
          </h2>
          <p className="text-[15.5px] text-brand-gray font-medium leading-relaxed mt-5 text-center max-w-xl">
            Proven formulations, verified customer results. Discover the top wellness staples trusted by thousands across the region.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10">
          {bestSellers.map((product, i) => {
            const staggeredClass = i % 2 === 1 ? 'lg:translate-y-10' : ''
            return (
              <ScrollReveal key={product.id} delay={i * 0.06} className={staggeredClass}>
                <ProductCard product={product} index={i} onQuickView={onQuickView} />
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  // Generate three reviews to show in a stacked 3D deck arrangement
  const visibleCards = useMemo(() => {
    const indices = [
      activeIndex,
      (activeIndex + 1) % reviews.length,
      (activeIndex + 2) % reviews.length
    ]
    return indices.map(idx => ({ ...reviews[idx], originalIndex: idx }))
  }, [activeIndex])

  return (
    <section className="section-spacing-md bg-[#F8F6F1] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-gold/3 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Asymmetrical Layout structure */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          
          {/* Left Block Details */}
          <div>
            <span className="text-[10px] font-black tracking-[3px] text-brand-green uppercase font-heading block mb-3">TRUST & FEEDBACK</span>
            <h2 className="text-h2 font-black text-brand-dark font-heading leading-tight tracking-tight mb-6">
              Verified Stories of<br />
              <span className="font-serif-lux text-brand-gold font-normal italic">True Transformation</span>
            </h2>
            <p className="text-[16px] text-brand-gray font-medium leading-relaxed mb-8 max-w-md">
              We focus on absolute supplement transparency. Our 5.0 Google rating is earned through honest service, authentic imports, and organic excellence.
            </p>
            
            {/* Google review details */}
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-150/60 shadow-luxury-soft w-fit">
              <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-black font-heading text-lg">G</div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-black text-brand-dark font-heading text-[14.5px]">5.0 Rating</span>
                  <div className="flex text-brand-gold text-[10px]">
                    <FiStar className="fill-brand-gold" />
                    <FiStar className="fill-brand-gold" />
                    <FiStar className="fill-brand-gold" />
                    <FiStar className="fill-brand-gold" />
                    <FiStar className="fill-brand-gold" />
                  </div>
                </div>
                <span className="text-[11px] text-brand-gray font-extrabold uppercase tracking-wider block mt-0.5">210+ Google Store Reviews</span>
              </div>
            </div>

            {/* Slider navigation buttons */}
            <div className="flex gap-3 mt-10">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 hover:border-brand-green/30 hover:bg-brand-green-light text-brand-dark hover:text-brand-green flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow-luxury-soft hover:scale-105"
                aria-label="Previous Review"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 hover:border-brand-green/30 hover:bg-brand-green-light text-brand-dark hover:text-brand-green flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow-luxury-soft hover:scale-105"
                aria-label="Next Review"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>
          </div>

          {/* Right Block: Stacked 3D Testimonial Deck Layout */}
          <div className="relative h-[340px] sm:h-[380px] w-full flex items-center justify-center select-none">
            
            <div className="relative w-full max-w-md h-full flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {visibleCards.map((rev, deckIdx) => {
                  const initials = rev.name.split(' ').map(n => n[0]).join('').toUpperCase()
                  
                  // Style cards differently based on stack depth positions (deckIdx)
                  const isTop = deckIdx === 0
                  const isMiddle = deckIdx === 1

                  return (
                    <motion.div
                      key={rev.id}
                      style={{
                        zIndex: 30 - deckIdx,
                        transformOrigin: 'top center',
                      }}
                      initial={isTop ? { opacity: 0, scale: 0.9, y: 15 } : false}
                      animate={{
                        opacity: isTop ? 1 : isMiddle ? 0.75 : 0.45,
                        scale: isTop ? 1 : isMiddle ? 0.94 : 0.88,
                        y: isTop ? 0 : isMiddle ? 20 : 40,
                        x: isTop ? 0 : isMiddle ? 12 : 24,
                      }}
                      exit={{ opacity: 0, x: -100, scale: 0.9, transition: { duration: 0.35 } }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute w-full"
                    >
                      <div className={`luxury-review-card ${!isTop ? 'pointer-events-none' : ''}`}>
                        {/* Large elegant quote watermark inside card */}
                        <div className="absolute top-6 right-8 text-[120px] font-serif font-black text-brand-gold/5 leading-none select-none pointer-events-none">
                          “
                        </div>

                        <div>
                          {/* Top row rating details */}
                          <div className="flex items-center gap-1.5 mb-6 z-10 relative">
                            <div className="flex text-brand-gold text-xs">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <FiStar key={j} className="fill-brand-gold" />
                              ))}
                            </div>
                            <span className="text-[8px] font-black text-brand-green uppercase bg-brand-green-light px-2 py-0.5 rounded ml-2 border border-brand-green-light/30">
                              Verified
                            </span>
                          </div>

                          {/* Review Body */}
                          <p className="text-[15.5px] sm:text-[17px] text-brand-dark leading-relaxed italic mb-8 font-medium relative z-10 line-clamp-4">
                            &ldquo;{rev.text}&rdquo;
                          </p>
                        </div>

                        {/* Customer Info row */}
                        <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                          <div className="w-10 h-10 rounded-full bg-brand-green-light text-brand-green text-[12px] font-black flex items-center justify-center shrink-0 border border-brand-green-light/40 font-heading">
                            {initials}
                          </div>
                          <div>
                            <h4 className="text-[14px] font-black text-brand-dark font-heading leading-tight">{rev.name}</h4>
                            <span className="text-[9px] text-brand-gray font-extrabold uppercase tracking-widest font-heading mt-0.5 block">Verified Client</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}


function FeatureCards() {
  return (
    <section className="section-spacing-md bg-white border-t border-slate-100 relative">
      <div className="section-container">
        
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[3px] text-brand-green uppercase bg-brand-green-light px-3.5 py-1.5 rounded-full border border-brand-green-light/40 font-heading mb-3">THE FITNESS VALUE</span>
          <h2 className="text-h2 font-black text-brand-dark font-heading leading-tight tracking-tight">
            The Fit Secrets Blueprint
          </h2>
          <p className="text-[15.5px] text-brand-gray font-medium leading-relaxed mt-5">
            We are committed to absolute wellness standards. Learn why discerning fitness enthusiasts trust our store above standard nutrition vendors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feat, i) => (
            <ScrollReveal key={i} delay={i * 0.07} className="h-full">
              <div className="luxury-feature-card flex flex-col items-center text-center h-full group card-glow-hover">
                <div className="flex flex-col items-center mb-6">
                  <span className="luxury-feature-number text-[#B68A45] font-black">{feat.num}</span>
                  <div className="w-8 h-8 rounded-full border border-brand-green/10 text-brand-green flex items-center justify-center mt-3 group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition-all duration-300 shadow-sm group-hover:scale-110">
                    <FiCheck className="text-xs" />
                  </div>
                </div>
                <h3 className="font-extrabold text-[17px] text-brand-dark mb-3.5 tracking-tight font-heading group-hover:text-brand-green transition-colors text-center">
                  {feat.title}
                </h3>
                <p className="text-[13.5px] text-brand-gray leading-relaxed flex-1 font-medium text-center max-w-[240px]">
                  {feat.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustBooster() {
  const trustItems = [
    { icon: FiUsers, value: '5,000+', label: 'Happy Customers' },
    { icon: FiCheck, value: '100%', label: 'Authentic Products' },
    { icon: FiShield, value: 'Lab', label: 'Tested & Verified' },
    { icon: FiAward, value: 'Expert', label: 'Consultation' },
  ]

  return (
    <section className="py-14 lg:py-16 bg-[#0F5B43] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {trustItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/15 transition-all duration-300 group-hover:scale-110 border border-white/10">
                  <item.icon className="text-brand-gold text-lg" />
                </div>
                <div className="text-[28px] sm:text-[32px] font-black text-white mb-1 tracking-tight font-heading leading-none">
                  {item.value}
                </div>
                <div className="text-[10px] font-black tracking-[2px] text-white/70 uppercase font-heading">
                  {item.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section className="bg-gradient-to-br from-[#0A2215] via-[#0E2C1B] to-[#123622] section-spacing-lg relative overflow-hidden text-white border-b border-white/5 grain-texture">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-green/6 blur-[140px] pointer-events-none animate-cinematic-glow" />
      
      <FloatingParticles />

      <div className="section-container relative z-10 flex flex-col items-center justify-center min-h-[420px]">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center justify-center">
          
          <span className="inline-block text-[10px] font-black text-brand-gold tracking-[3px] uppercase mb-6 bg-brand-gold/10 px-4 py-2 rounded-full border border-brand-gold/20 font-heading">
            TAILORED WELLNESS PLANS
          </span>
          
          <h2 className="text-h2 text-[#F8F4EC] font-black mb-6 leading-tight font-heading tracking-tight">
            Ready to Calibrate Your<br />
            <span className="font-serif-lux text-brand-gold font-normal italic">Biological Potential?</span>
          </h2>
          
          <p className="text-slate-300 text-[16px] max-w-lg mx-auto mb-10 leading-relaxed font-medium">
            Schedule a personalized wellness consult with our team on MG Road. Let us help structure your daily supplements, protein cycles, and organic foods program.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full">
            <Link
              to="/products"
              className="btn-pill btn-pill-gold w-full sm:w-auto font-black shadow-lg group"
            >
              Browse Catalog Collection
              <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`https://wa.me/${businessInfo.whatsapp}?text=Hi Fit Secrets! I'd like a custom consultation program.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-white text-brand-dark hover:bg-slate-50 w-full sm:w-auto font-black shadow-lg group"
            >
              Consult via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { addToCart } = useCart()

  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [quickViewQty, setQuickViewQty] = useState(1)
  const [quickViewAdded, setQuickViewAdded] = useState(false)
  const [quickViewWishlisted, setQuickViewWishlisted] = useState(false)

  const openQuickView = (product) => {
    setQuickViewProduct(product)
    setQuickViewQty(1)
    setQuickViewAdded(false)
    setQuickViewWishlisted(false)
  }

  const closeQuickView = () => {
    setQuickViewProduct(null)
  }

  const handleModalAddToCart = () => {
    if (!quickViewProduct) return
    addToCart(quickViewProduct, quickViewQty)
    setQuickViewAdded(true)
    setTimeout(() => setQuickViewAdded(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>Fit Secrets Store | Premium Fitness Nutrition & Organic Wellness - Vijayawada</title>
        <meta name="description" content="Vijayawada's premium fitness and nutrition boutique. 100% authentic whey protein, weight gainers, creatine, ayurvedic items, dry fruits, honey & organic foods." />
      </Helmet>
      <MarqueeBanner />
      <HeroSection />
      <CategoriesSection />
      <PopularProductsSection onQuickView={openQuickView} />
      <ReviewsSection />
      <FeatureCards />
      <CtaBanner />

      {/* Quick View Modal Drawer */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            qty={quickViewQty}
            setQty={setQuickViewQty}
            added={quickViewAdded}
            onAddToCart={handleModalAddToCart}
            wishlisted={quickViewWishlisted}
            onToggleWishlist={() => setQuickViewWishlisted(!quickViewWishlisted)}
            onClose={closeQuickView}
          />
        )}
      </AnimatePresence>
    </>
  )
}
