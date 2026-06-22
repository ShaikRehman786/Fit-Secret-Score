import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiStar, FiCheck, FiHeart, FiEye } from 'react-icons/fi'
import LazyImage from '../ui/LazyImage'
import { useCart } from '../../context/useCart'

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

function ProductCard({ product, index = 0, onQuickView }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const savings = product.originalPrice - product.price

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted(!wishlisted)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group luxury-product-card flex flex-col h-full relative"
    >
      {/* Dynamic Image Wrapper Container */}
      <div className="luxury-product-image-container aspect-square w-full flex items-center justify-center p-6 relative">
        
        {/* Soft radial base background behind product */}
        <div className="absolute inset-0 bg-[#F6F4EE]/50 group-hover:bg-[#F3EFE7] transition-colors duration-500 z-0" />
        
        {/* Inner circle frame overlay */}
        <div className="absolute w-[80%] h-[80%] rounded-full border border-black/[0.02] group-hover:border-black/[0.04] transition-all duration-500 z-0 scale-95 group-hover:scale-100" />
        
        <div className="w-[85%] h-[85%] z-10 flex items-center justify-center relative overflow-hidden rounded-2xl">
          <LazyImage
            src={product.image}
            alt={product.name}
            wrapperClass="w-full h-full"
            className="w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </div>

        {/* Hover action popup deck */}
        <div className="absolute inset-0 bg-brand-dark/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-350 flex items-center justify-center gap-3.5 z-20">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (onQuickView) onQuickView(product)
            }}
            className="w-11 h-11 rounded-full bg-white hover:bg-brand-green text-brand-dark hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-108 shadow-luxury-depth cursor-pointer border border-slate-100"
            title="Quick View"
          >
            <FiEye className="text-base" />
          </button>
          <button
            onClick={handleAdd}
            className="w-11 h-11 rounded-full bg-white hover:bg-brand-green text-brand-dark hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-108 shadow-luxury-depth cursor-pointer border border-slate-100"
            title="Add to Cart"
          >
            <FiShoppingBag className="text-base" />
          </button>
        </div>

        {/* Dynamic badge tags */}
        <div className="absolute top-4.5 left-4.5 flex flex-col gap-1.5 z-10">
          {product.discount > 0 && (
            <span className="bg-rose-500 text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg tracking-widest shadow-sm uppercase font-heading leading-none">
              -{product.discount}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-brand-gold text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg tracking-widest shadow-sm uppercase font-heading leading-none">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist toggle */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4.5 right-4.5 w-9 h-9 rounded-full bg-white/90 border border-slate-100/80 backdrop-blur-md flex items-center justify-center text-brand-dark hover:text-rose-500 hover:scale-105 hover:bg-white transition-all duration-300 z-10 cursor-pointer shadow-sm"
          aria-label="Wishlist"
        >
          <FiHeart className={`text-[13px] transition-all duration-300 ${wishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
        </button>
      </div>

      {/* Info labels and details */}
      <div className="pt-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[9.5px] font-black text-brand-green uppercase tracking-[2.5px] font-heading">
            {categoryLabels[product.category] || product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <FiStar className="text-[10px] fill-brand-gold text-brand-gold" />
              <span className="text-[11.5px] text-brand-dark font-extrabold leading-none">{product.rating}</span>
            </div>
          )}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-extrabold text-[15px] text-brand-dark leading-snug hover:text-brand-green transition-colors line-clamp-2 min-h-[40px] font-heading">
            {product.name}
          </h3>
        </Link>

        {/* Pricing Layout */}
        <div className="flex items-center justify-between gap-3 mt-4.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-black text-brand-dark tracking-tight font-heading">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[12px] text-brand-gray line-through font-semibold">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {savings > 0 && (
            <span className="text-[8.5px] font-black text-brand-green bg-brand-green-light px-2 py-0.5 rounded border border-brand-green-light/40 font-heading">
              SAVE ₹{savings}
            </span>
          )}
        </div>

        {/* Rounded Pill CTA Action Button */}
        <div className="mt-5">
          <button
            onClick={handleAdd}
            className={`w-full h-[45px] rounded-full font-extrabold text-[11px] tracking-widest uppercase font-heading flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
              added
                ? 'bg-brand-green text-white shadow-[0_4px_12px_rgba(31,111,67,0.2)]'
                : 'bg-transparent text-brand-green border border-brand-green/30 hover:bg-brand-green hover:text-white hover:border-brand-green'
            }`}
          >
            {added ? (
              <><FiCheck className="text-xs font-black animate-bounce" /> Added</>
            ) : (
              <><FiShoppingBag className="text-xs animate-pulse" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ProductCard)
