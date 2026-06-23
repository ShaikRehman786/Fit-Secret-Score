import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiSearch, FiSliders, FiChevronDown } from 'react-icons/fi'
import CategoryTabs from '../components/product/CategoryTabs'
import ProductCard from '../components/product/ProductCard'
import QuickViewModal from '../components/product/QuickViewModal'
import { categories, products } from '../data/products'
import { useCart } from '../context/useCart'

const sortOptions = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Reviewed' },
  { value: 'discount', label: 'Greatest Discount' },
]

export default function Products() {
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  
  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [quickViewQty, setQuickViewQty] = useState(1)
  const [quickViewAdded, setQuickViewAdded] = useState(false)
  const [quickViewWishlisted, setQuickViewWishlisted] = useState(false)

  const filtered = useMemo(() => {
    let result = activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'discount':
        result = [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
    }

    return result
  }, [activeCategory, searchQuery, sortBy])

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
        <title>Products | Fit Secrets Store - Supplements, Ayurvedic, Dry Fruits & More</title>
        <meta name="description" content="Browse our complete collection of nutritional supplements, ayurvedic products, organic foods, dry fruits, cold pressed oils, and more. 100% original brands." />
      </Helmet>
      <div className="flex-1 flex flex-col bg-[#F8F6F1] text-brand-dark">
        
        {/* Banner Section */}
        <section className="py-[120px] lg:py-[150px] relative overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,111,67,0.03),transparent_70%)] pointer-events-none" />
          <div className="absolute w-[40%] h-[40%] rounded-full bg-brand-gold/5 blur-[120px] -top-1/4 -right-1/4 pointer-events-none" />
          
          <div className="section-container relative z-10 text-center flex flex-col items-center justify-center">
            <span className="inline-block text-brand-green font-extrabold text-[10px] tracking-[3px] uppercase mb-5 bg-brand-green-light px-5 py-2.5 rounded-full border border-brand-green-light/40 leading-none font-heading mx-auto">
              STORE CATALOG
            </span>
            <h1 className="text-h1 text-brand-dark mb-6 leading-tight tracking-tight max-w-2xl font-black font-heading">
              Pure Wellness, <span className="font-serif-lux text-brand-gold font-normal italic">Uncompromised.</span>
            </h1>
            <p className="text-[17px] text-brand-gray max-w-2xl mx-auto leading-relaxed mb-0 font-medium">
              Every single product in our catalog is guaranteed authentic, lab-tested, and clean. Explore curated health solutions built to transform your daily ritual.
            </p>
          </div>
        </section>

        {/* Catalog Grid Section */}
        <section className="flex-1 section-spacing-md bg-[#F8F6F1] relative">
          <div className="section-container">
            
            {/* Sticky Tabs Bar */}
            <div className="sticky top-[var(--nav-h)] z-30 bg-[#F8F6F1]/90 backdrop-blur-md py-4 mb-12 border-b border-slate-200/40 -mx-6 px-6">
              <CategoryTabs
                categories={categories}
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            {/* Filter and Sorting Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-14">
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog (e.g. Whey, Ashwagandha, Honey)"
                  className="w-full h-[58px] pl-[56px] pr-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-350 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all text-[15px] font-medium text-brand-dark placeholder-slate-400 shadow-sm"
                />
              </div>
              <div className="flex items-center gap-3.5 shrink-0">
                <div className="flex items-center gap-2 text-brand-gray shrink-0">
                  <FiSliders className="text-sm text-brand-green" />
                  <span className="text-[12px] font-black tracking-widest uppercase font-heading">Filter:</span>
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-[58px] pl-5 pr-12 rounded-2xl border border-slate-200 bg-white hover:border-slate-350 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 text-[13.5px] text-brand-dark font-extrabold outline-none transition-all cursor-pointer min-w-[220px] shadow-sm appearance-none"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-white text-brand-dark">{opt.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gray">
                    <FiChevronDown className="text-base" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid Layout */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery + sortBy}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14 lg:gap-y-16 pb-12">
                    {filtered.map((product, i) => {
                      // Apply staggered column offset on desktop to match Awwwards aesthetic
                      const staggeredClass = i % 2 === 1 ? 'lg:translate-y-8' : ''
                      return (
                        <div key={product.id} className={staggeredClass}>
                          <ProductCard product={product} index={i} onQuickView={openQuickView} />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-28 border border-dashed border-slate-200 rounded-[32px] bg-white/40 max-w-xl mx-auto shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-[#F8F6F1] flex items-center justify-center mx-auto mb-5 border border-slate-100 shadow-sm">
                      <FiSearch className="text-brand-green text-xl animate-pulse" />
                    </div>
                    <p className="text-brand-dark text-[17px] font-black font-heading">No matching items</p>
                    <p className="text-brand-gray text-[14px] mt-1.5 font-medium">Try checking spelling or adjusting category options.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {filtered.length > 0 && (
              <p className="text-center text-[12px] font-extrabold tracking-widest uppercase text-brand-gray mt-20 mb-8 font-heading">
                Showing {filtered.length} of {products.length} Products
              </p>
            )}
          </div>
        </section>

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

      </div>
    </>
  )
}
