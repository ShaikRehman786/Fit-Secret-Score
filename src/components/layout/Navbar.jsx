import { useState, useEffect, startTransition, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiMessageCircle, FiArrowRight, FiTrendingUp } from 'react-icons/fi'
import { useCart } from '../../context/useCart'
import { businessInfo, products } from '../../data/products'

const links = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

const categoryLabels = {
  'nutritional-supplements': 'Supplements',
  'ayurvedic': 'Ayurvedic',
  'organic': 'Organic',
  'diet-rice': 'Diet Rice',
  'honey-ghee': 'Honey & Ghee',
  'dryfruits': 'Dry Fruits',
  'cold-oils': 'Cold Pressed',
  'cosmetics': 'Cosmetics',
  'perfumes': 'Perfumes',
}

const trendingSearches = [
  { query: 'Whey', label: 'Whey Protein' },
  { query: 'Ashwagandha', label: 'Ashwagandha' },
  { query: 'Honey', label: 'Raw Honey' },
  { query: 'Ghee', label: 'Cow Ghee' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const { totalItems } = useCart()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    startTransition(() => {
      setOpen(false)
      setSearchOpen(false)
      setSearchVal('')
    })
  }, [pathname])

  // Instant Search Filter for Modal
  const matchingProducts = useMemo(() => {
    if (!searchVal.trim()) return []
    const q = searchVal.toLowerCase()
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 5)
  }, [searchVal])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[99999] h-[72px] md:h-[var(--nav-h)] transition-all duration-300 flex items-center ${
          scrolled
            ? 'bg-[#FCFAF6] backdrop-blur-[24px] border-b border-black/[0.08] shadow-md'
            : 'bg-[#FCFAF6]/95 backdrop-blur-[16px] border-b border-black/[0.06] shadow-none'
        }`}
      >
        <div className="w-full max-w-[1240px] mx-auto px-5 md:px-6 h-full">
          <div className="flex items-center justify-between h-full relative">
            
            {/* Logo Left */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group relative z-10">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-brand-green text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_4px_12px_rgba(31,111,67,0.2)]">
                <span className="font-serif-lux text-xl font-bold italic text-brand-gold">F</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-[16px] tracking-tight font-heading text-[#1C1C1C]">
                  FitSecrets
                </span>
                <span className="text-[8.5px] font-extrabold tracking-[4px] uppercase mt-0.5 font-heading text-[#C9A86A]">
                  Store
                </span>
              </div>
            </Link>

            {/* Menu Center (Stripe-like Minimalist style) */}
            <nav className="hidden md:flex items-center gap-[28px] lg:gap-[36px] absolute left-1/2 -translate-x-1/2">
              {links.map((link) => {
                const active = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path.split('?')[0])
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-2 text-[11.5px] font-semibold tracking-[0.12em] uppercase font-heading transition-all duration-300 group nav-link-premium ${
                      active
                        ? 'text-[#C9A86A] active'
                        : 'text-[#2A2A2A] hover:text-[#0F5B43]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-2 sm:gap-3.5 relative z-10">
              
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110 text-[#1C1C1C] hover:text-[#0F5B43]"
                aria-label="Search"
              >
                <FiSearch className="text-[20px]" />
              </button>

              {/* Cart Summary */}
              <Link
                to="/cart"
                className="relative p-2 rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-[#1C1C1C] hover:text-[#0F5B43]"
                aria-label="Cart"
              >
                <FiShoppingBag className="text-[20px]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#0F5B43] text-white text-[9px] font-black flex items-center justify-center shadow-md animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* WhatsApp Consultation */}
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-5 h-[42px] rounded-full border-[1.5px] border-[#C9A86A] text-[#1C1C1C] bg-transparent hover:bg-[#C9A86A] hover:text-white transition-all duration-300 font-bold text-[11px] tracking-wider uppercase font-heading"
              >
                <FiMessageCircle className="text-[14px]" />
                Consultation
              </a>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 rounded-xl transition-all duration-300 cursor-pointer text-[#1C1C1C] hover:text-[#0F5B43]"
                aria-label={open ? 'Close Menu' : 'Open Menu'}
              >
                {open ? <FiX className="text-[22px]" /> : <FiMenu className="text-[22px]" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99998] bg-[#FCFAF6] pt-[72px] px-8 pb-12 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col items-center gap-6 mt-16 mb-12">
              {links.map((link, i) => {
                const active = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path.split('?')[0])
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="w-full text-center"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className="relative inline-block text-center text-[22px] font-semibold py-1.5 tracking-wider uppercase font-heading text-[#1C1C1C] hover:text-[#0F5B43] transition-colors"
                    >
                      {link.label}
                      <span className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#C9A86A] transition-transform duration-300 origin-left scale-x-0 ${
                        active ? 'scale-x-100' : ''
                      }`} />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="flex justify-center"
            >
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-pill btn-pill-solid w-full max-w-[280px]"
              >
                <FiMessageCircle className="text-base" />
                Consult WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight Search Overlay Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:pt-32">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-brand-dark/50 backdrop-blur-md"
            />

            {/* Spotlight Container Box */}
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white border border-slate-100 rounded-[28px] max-w-2xl w-full p-7 shadow-2xl flex flex-col gap-6 text-brand-dark z-10 overflow-hidden"
            >
              {/* Top Row: Search Input */}
              <div className="relative flex items-center border border-slate-200 focus-within:border-brand-green/30 focus-within:ring-4 focus-within:ring-brand-green/5 bg-slate-50/50 rounded-2xl pl-5 pr-14 h-[58px] transition-all">
                <FiSearch className="text-slate-400 text-[20px] mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="What are you looking for today? (e.g. Whey, Creatine, Ghee)"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="bg-transparent border-none text-[15px] text-brand-dark outline-none w-full font-medium placeholder-slate-400"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 w-7 h-7 rounded-full bg-slate-200/50 hover:bg-slate-200 text-brand-gray hover:text-brand-dark flex items-center justify-center transition-colors cursor-pointer text-[10px] font-black uppercase tracking-wider"
                >
                  <FiX />
                </button>
              </div>

              {/* Suggestions / Recent Tags */}
              {!searchVal.trim() && (
                <div className="flex flex-col gap-3.5">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1.5 leading-none">
                    <FiTrendingUp className="text-xs" />
                    Trending wellness categories
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchVal(item.query)}
                        className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-brand-green-light/40 border border-slate-100 hover:border-brand-green-light/60 text-[12.5px] font-semibold text-brand-gray hover:text-brand-green transition-all cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Indexed Result List container */}
              <div className="max-h-[300px] overflow-y-auto no-scrollbar flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                  {searchVal.trim() && matchingProducts.length > 0 ? (
                    matchingProducts.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Link
                          to={`/product/${p.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 p-3 hover:bg-brand-green-light/20 border border-transparent hover:border-brand-green-light/40 rounded-xl transition-all duration-300 group"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-extrabold text-[14px] text-brand-dark truncate group-hover:text-brand-green transition-colors font-heading leading-snug">
                              {p.name}
                            </h4>
                            <span className="text-[10px] text-brand-gray uppercase tracking-widest font-black mt-0.5 block font-heading">
                              {categoryLabels[p.category] || p.category}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-black text-[14.5px] text-brand-dark font-heading group-hover:text-brand-green transition-colors block">
                              ₹{p.price.toLocaleString()}
                            </span>
                            {p.originalPrice > p.price && (
                              <span className="text-[10.5px] text-brand-gray line-through leading-none block mt-0.5">
                                ₹{p.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-brand-green text-slate-300 group-hover:text-white flex items-center justify-center transition-colors">
                            <FiArrowRight />
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  ) : searchVal.trim() ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-10 text-brand-gray text-[14px] font-medium"
                    >
                      No items found for &ldquo;<span className="text-brand-dark font-bold">{searchVal}</span>&rdquo;
                    </motion.div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-[12px] font-extrabold tracking-widest uppercase">
                      Begin entering search keywords...
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="nav-spacer" />
    </>
  )
}
