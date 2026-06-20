import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiSearch, FiSliders } from 'react-icons/fi'
import SectionHeading from '../components/ui/SectionHeading'
import CategoryTabs from '../components/product/CategoryTabs'
import ProductCard from '../components/product/ProductCard'
import { categories, products } from '../data/products'

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')

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

  return (
    <>
      <Helmet>
        <title>Products | Fit Secrets Store - Supplements, Ayurvedic, Dry Fruits & More</title>
        <meta name="description" content="Browse our complete collection of nutritional supplements, ayurvedic products, organic foods, dry fruits, cold pressed oils, and more. 100% original brands." />
      </Helmet>
      <div className="flex-1 flex flex-col">
        <section className="bg-slate-950 bg-gradient-to-b from-[#050505] to-[#0c0c0c] py-[110px] lg:py-[140px] relative overflow-hidden flex items-center justify-center border-b border-white/[0.05]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.12),transparent_65%)] pointer-events-none" />
          <div className="absolute w-[60%] h-[60%] rounded-full bg-brand-green/5 blur-[120px] -top-1/4 -right-1/4 pointer-events-none" />
          <div className="section-container relative z-10 text-center flex flex-col items-center justify-center">
            <span className="inline-block text-brand-green font-extrabold text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase mb-5 bg-brand-green/10 px-4.5 py-2 rounded-full border border-brand-green/15 leading-none">
              PRODUCTS
            </span>
            <h1 className="text-h1 text-white mb-6 leading-tight tracking-tight max-w-2xl font-black">
              Our Collection
            </h1>
            <p className="text-body text-slate-400 max-w-2xl mx-auto leading-relaxed mb-0 font-medium">
              Premium supplements, ayurvedic products, organic foods, dry fruits, and more — all original brands, all guaranteed.
            </p>
          </div>
        </section>

        <section className="flex-1 section-spacing-md bg-gray-50">
          <div className="section-container">
            <CategoryTabs
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-[16px] mb-12">
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[15px]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-[54px] pl-12 pr-5 rounded-[18px] border border-slate-200/80 bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all text-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
                />
              </div>
              <div className="flex items-center gap-3.5 shrink-0">
                <div className="flex items-center gap-2 text-slate-400 shrink-0">
                  <FiSliders className="text-sm" />
                  <span className="text-[14px] text-slate-500 font-bold">Sort By:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-[54px] px-5 rounded-[18px] border border-slate-200/80 bg-white text-[14px] text-slate-700 focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all cursor-pointer min-w-[190px] shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery + sortBy}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                    {filtered.map((product, i) => (
                      <ProductCard key={product.id} product={product} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="text-gray-400 text-xl" />
                    </div>
                    <p className="text-gray-500 text-[16px] font-medium">No products found</p>
                    <p className="text-gray-400 text-[14px] mt-1">Try adjusting your search or filter.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {filtered.length > 0 && (
              <p className="text-center text-body text-gray-400 mt-16 mb-8">
                Showing {filtered.length} of {products.length} products
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
