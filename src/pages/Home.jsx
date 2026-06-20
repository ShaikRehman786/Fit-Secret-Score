import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar, FiCheck, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import productImage from '../assets/video1.mp4'
import MarqueeBanner from '../components/ui/MarqueeBanner'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionHeading from '../components/ui/SectionHeading'
import TrustBadges from '../components/ui/TrustBadges'
import ProductCard from '../components/product/ProductCard'
import LazyImage from '../components/ui/LazyImage'
import { businessInfo, products, reviews, categories as allCategories } from '../data/products'

const categories = allCategories.filter(c => c.featured) || []

const heroTrust = [
  { icon: FiCheck, text: '100% Authentic Products' },
  { icon: FiTruck, text: 'Free Delivery on ₹500+' },
  { icon: FiShield, text: 'Lab-Tested & Certified' },
  { icon: FiRefreshCw, text: 'Easy 7-Day Returns' },
]

const stats = [
  { value: '3,000+', label: 'Happy Customers' },
  { value: '9+', label: 'Premium Brands' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '24/7', label: 'Customer Support' },
]


const features = [
  { title: 'Lab Tested Products', desc: 'Every product is verified and lab-tested for purity and quality assurance.', icon: FiShield },
  { title: 'Free Delivery', desc: 'Free doorstep delivery across Vijayawada on orders above ₹500.', icon: FiTruck },
  { title: 'Expert Guidance', desc: 'Our certified nutritionists help you choose the right supplements for your goals.', icon: FiCheck },
  { title: 'Easy Returns', desc: 'Not satisfied? Return within 7 days for a full refund, no questions asked.', icon: FiRefreshCw },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function ProductShowcase() {
  return (
    <div className="relative w-full max-w-[500px] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] xl:aspect-[4/5] rounded-[24px] overflow-hidden border border-white/[0.08] shadow-[0_25px_65px_rgba(0,0,0,0.4)] flex items-center justify-center bg-[#111111]/45 backdrop-blur-xl p-4 mx-auto">
      {/* Cinematic neon green spotlight blur behind video player */}
      <div className="absolute w-[70%] h-[70%] rounded-full bg-brand-green/20 blur-[100px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none z-0 animate-pulse" />

      {/* Video Element Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden z-10 border border-white/[0.05] bg-black/25">
        <video
          src={productImage}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle cinematic overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative pt-[140px] pb-24 lg:pt-[160px] lg:pb-32 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,163,74,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.01),transparent_50%)] pointer-events-none" />
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-[1.18fr_0.82fr] gap-12 lg:gap-20 items-center">
          <motion.div className="order-2 lg:order-1" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.span variants={itemVariants} className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wider uppercase text-black/70 bg-black/5 px-4.5 py-2 rounded-full mb-6">
              <FiStar className="text-brand-green text-sm" />
              Vijayawada's #1 Fitness Store
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-h1 font-black text-black mb-6 tracking-tight">
              Premium Fitness
              <span className="text-brand-green block mt-2">Nutrition & Gear</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-body text-gray-500 max-w-lg mb-6 leading-relaxed">
              Vijayawada's trusted destination for authentic whey proteins, weight gainers, creatine, and fitness essentials — all lab-tested and guaranteed genuine.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-[28px]">
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/products"
                className="btn-premium btn-premium-primary text-[15px]"
              >
                Shop Best Sellers
                <FiArrowRight className="text-base" />
              </Link>
              <Link
                to="/contact"
                className="btn-premium btn-premium-secondary text-[15px]"
              >
                Get Free Consultation
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-x-6 gap-y-3">
              {heroTrust.map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-[13px] text-gray-500">
                  <item.icon className="text-brand-green text-sm shrink-0" />
                  {item.text}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  return (
    <section className="py-[50px] bg-gray-50/20">
      <div className="section-container">
        <div className="bg-white rounded-[24px] border border-[rgba(15,23,42,0.06)] shadow-[0_12px_40px_rgba(0,0,0,0.02)] p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} className="w-full">
                <div className={`text-center flex flex-col items-center justify-center ${
                  i < 3 ? 'md:border-r md:border-slate-100' : ''
                }`}>
                  <div className="text-[34px] lg:text-[42px] font-black text-[#0f172a] mb-1.5 tracking-tight">{stat.value}</div>
                  <div className="text-[11px] font-extrabold tracking-widest text-[#64748b] uppercase">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoriesSection() {
  return (
    <section className="section-spacing-md bg-white">
      <div className="section-container">
        <SectionHeading
          subtitle="SHOP BY CATEGORY"
          title="Find What You Need"
          description="Browse our curated selection of premium fitness products across every category."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.04}>
              <Link
                to={`/products?category=${cat.id}`}
                className="group block relative aspect-[4/5] rounded-[20px] overflow-hidden bg-gray-100 card-hover shadow-md hover:shadow-[0_20px_50px_rgba(22,163,74,0.12)] border border-gray-100"
              >
                <LazyImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-white font-extrabold text-[19px] sm:text-[20px] tracking-tight mb-1">{cat.name}</h3>
                  {cat.count && (
                    <span className="text-brand-green text-[13px] font-bold tracking-wider uppercase mt-1.5 block">{cat.count} Products</span>
                  )}
                </div>
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-10">
                  <FiArrowRight className="text-white text-base" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function PopularProductsSection() {
  const bestSellers = products.filter(p => p.isBestSeller)

  return (
    <section className="section-spacing-md bg-gray-50">
      <div className="section-container">
        <SectionHeading
          subtitle="BEST SELLERS"
          title="Most Popular Products"
          description="Our customers' top picks — proven results, trusted by thousands across Vijayawada."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {bestSellers.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.04}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  return (
    <section className="section-spacing-md bg-white">
      <div className="section-container">
        <SectionHeading
          subtitle="TESTIMONIALS"
          title="What Our Customers Say"
          description="Real reviews from real customers — because nothing speaks louder than results."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {reviews.map((review, i) => {
            const name = review.name || 'Verified Customer'
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
            return (
              <ScrollReveal key={i} delay={i * 0.05} className="h-full">
                <div className="flex flex-col justify-between p-6 sm:p-8 bg-white border border-gray-100 rounded-[22px] card-hover h-full">
                  <div>
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <FiStar
                          key={j}
                          className={`text-xs ${j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-medium">&ldquo;{review.text}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-3.5 pt-4.5 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-slate-950 text-white text-[12px] font-bold flex items-center justify-center shrink-0 border-2 border-brand-green/20 shadow-sm">
                      {initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-900 leading-tight">{name}</span>
                      <span className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">Verified Customer</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeatureCards() {
  return (
    <section className="section-spacing-md bg-gray-50/50">
      <div className="section-container">
        <SectionHeading
          subtitle="WHY CHOOSE US"
          title="The Fit Secrets Advantage"
          description="We go beyond just selling supplements — we build transformation partnerships."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
          {features.map((feat, i) => (
            <ScrollReveal key={i} delay={i * 0.05} className="h-full">
              <div className="group p-6 sm:p-7 bg-white rounded-[22px] border border-gray-100/80 hover:border-brand-green/20 shadow-sm hover:shadow-[0_20px_40px_rgba(0,200,83,0.06)] hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col h-full">
                <div className="w-12 h-12 rounded-[16px] bg-brand-green/10 text-brand-green flex items-center justify-center mb-6 shrink-0 transition-all duration-300 group-hover:bg-brand-green group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(0,200,83,0.25)]">
                  <feat.icon className="text-lg" />
                </div>
                <h3 className="font-bold text-[18px] text-[#0f172a] mb-2.5 tracking-tight">{feat.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed flex-1">{feat.desc}</p>
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
    <section className="bg-black section-spacing-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,83,0.08),transparent_70%)] pointer-events-none" />
      <div className="section-container relative z-10 flex flex-col items-center justify-center min-h-[420px]">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
          <ScrollReveal>
            <div className="section-heading-wrapper">
              <span className="inline-block text-[13px] font-extrabold text-brand-green tracking-[3px] uppercase mb-5">Get Started</span>
              <h2 className="text-h2 text-white font-black mb-6 leading-tight">
                Ready to Transform<br />Your Fitness Journey?
              </h2>
              <p className="subtitle text-white/70 text-body max-w-xl mx-auto mb-12">
                Visit our Vijayawada store for a free consultation. Let our certified nutritionists build a custom supplement plan for your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
              <Link
                to="/products"
                className="btn-premium bg-white text-black hover:bg-gray-150 transition-all duration-300 w-full sm:w-auto"
              >
                Browse All Products
                <FiArrowRight className="text-lg" />
              </Link>
              <a
                href={`https://wa.me/${businessInfo.whatsapp}?text=Hi Fit Secrets Store! I'd like a free consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-premium-green w-full sm:w-auto"
              >
                Chat on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Fit Secrets Store | Premium Fitness Nutrition & Gym Essentials - Vijayawada</title>
        <meta name="description" content="Vijayawada's most trusted fitness store. 100% authentic whey protein, weight gainers, creatine, ayurvedic products & gym essentials. Free delivery on ₹500+." />
      </Helmet>
      <MarqueeBanner />
      <HeroSection />
      <StatsBar />
      <CategoriesSection />
      <PopularProductsSection />
      <ReviewsSection />
      <FeatureCards />
      <TrustBadges />
      <CtaBanner />
    </>
  )
}
