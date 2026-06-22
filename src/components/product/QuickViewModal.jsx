import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { FiX, FiMinus, FiPlus, FiShoppingBag, FiHeart, FiStar, FiCheck } from 'react-icons/fi'

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

export default function QuickViewModal({
  product,
  qty,
  setQty,
  added,
  onAddToCart,
  wishlisted,
  onToggleWishlist,
  onClose,
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  // ESC key closes modal
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!product) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="quick-view-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="quick-view-modal-container bg-white border border-slate-100 rounded-[28px] shadow-2xl text-brand-dark"
        onClick={(e) => e.stopPropagation()} // Stop click bubbling to avoid closing
      >
        {/* ── Sticky Close Button ── */}
        <button
          onClick={onClose}
          aria-label="Close Quick View"
          className="quick-view-close-btn w-11 h-11 rounded-full bg-white hover:bg-slate-100 text-brand-dark border border-slate-200 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
        >
          <FiX className="text-[18px]" />
        </button>

        {/* ── Content Area ── */}
        <div className="p-6 sm:p-10 pt-4 md:pt-6">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-start">

            {/* Left — Product Image */}
            <div className="relative w-full bg-[#F6F4EE]/60 rounded-[20px] overflow-hidden flex items-center justify-center border border-slate-100"
              style={{ aspectRatio: '1/1', maxHeight: '420px' }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6"
                style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.08))' }}
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-[9.5px] font-black px-3 py-1.5 rounded-lg tracking-widest shadow-md uppercase font-heading leading-none">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            {/* Right — Product Details */}
            <div className="flex flex-col pt-0 md:pt-2">
              {/* Category label */}
              <span className="text-[10px] font-black text-brand-green uppercase tracking-[2.5px] mb-3 font-heading block">
                {categoryLabels[product.category] || product.category}
              </span>

              {/* Product name */}
              <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] font-black text-brand-dark leading-tight mb-3 font-heading tracking-tight">
                {product.name}
              </h2>

              {/* Star rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-[11px] ${i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-brand-dark font-extrabold">{product.rating}</span>
                  <span className="text-[12px] text-brand-gray">({product.reviewCount} reviews)</span>
                </div>
              )}

              {/* Description */}
              <p className="text-[13.5px] sm:text-[14.5px] text-brand-gray leading-relaxed mb-5 font-medium">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-[26px] sm:text-[30px] font-black text-brand-dark tracking-tight font-heading">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-[15px] text-brand-gray line-through font-bold">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 mb-5" />

              {/* Quantity + CTA row */}
              <div className="flex flex-wrap gap-3 items-center">

                {/* Quantity counter */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[10px] font-black tracking-widest uppercase text-brand-gray font-heading whitespace-nowrap">
                    Qty
                  </span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden">
                    <button
                      onClick={() => qty > 1 && setQty(qty - 1)}
                      disabled={qty <= 1}
                      className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 text-brand-gray hover:text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <FiMinus className="text-xs" />
                    </button>
                    <span className="w-10 h-10 flex items-center justify-center font-extrabold text-[13px] text-brand-dark border-x border-slate-200">
                      {qty}
                    </span>
                    <button
                      onClick={() => qty < 99 && setQty(qty + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 text-brand-gray hover:text-brand-dark transition-colors cursor-pointer"
                    >
                      <FiPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Add to cart button */}
                <button
                  onClick={onAddToCart}
                  className={`flex-1 min-w-[140px] h-[48px] rounded-full font-black text-[11.5px] tracking-widest uppercase font-heading flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-sm ${
                    added
                      ? 'bg-brand-green text-white shadow-[0_4px_12px_rgba(31,111,67,0.2)]'
                      : 'bg-transparent text-brand-green border border-brand-green/30 hover:bg-brand-green hover:text-white'
                  }`}
                >
                  {added ? (
                    <><FiCheck className="text-sm animate-bounce" /> Added</>
                  ) : (
                    <><FiShoppingBag className="text-sm" /> Add to Cart</>
                  )}
                </button>

                {/* Wishlist button */}
                <button
                  onClick={onToggleWishlist}
                  className="w-[48px] h-[48px] rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-brand-dark hover:text-rose-500 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm shrink-0"
                  title="Add to Wishlist"
                >
                  <FiHeart className={`text-base ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
