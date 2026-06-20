import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiStar, FiCheck } from 'react-icons/fi'
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

function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const savings = product.originalPrice - product.price

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-[22px] overflow-hidden border border-slate-100 card-hover flex flex-col shadow-sm"
    >
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-slate-50/50">
        <LazyImage
          src={product.image}
          alt={product.name}
          wrapperClass="w-full aspect-[1/1]"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2.5 z-10">
          {product.discount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest shadow-[0_4px_10px_rgba(244,63,94,0.22)] leading-none uppercase">
              -{product.discount}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-brand-green text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest shadow-[0_4px_12px_rgba(0,200,83,0.22)] leading-none uppercase">
              Best Seller
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-green hover:text-white text-slate-700 cursor-pointer z-10 border border-slate-50"
          aria-label="Add to cart"
        >
          <FiShoppingBag className="text-[15px]" />
        </button>
      </Link>
      <div className="p-5 sm:p-5.5 flex flex-col flex-1">
        <span className="text-[10px] font-extrabold text-brand-green uppercase tracking-widest mb-1.5">
          {categoryLabels[product.category] || product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-[15px] sm:text-[15.5px] text-slate-900 leading-snug mb-2 hover:text-brand-green transition-colors line-clamp-2 min-h-[38px]">
            {product.name}
          </h3>
        </Link>
        {product.rating && (
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`text-[10px] ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
                />
              ))}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold leading-none">{product.rating}</span>
            <span className="text-[11px] text-slate-350 leading-none">({product.reviewCount})</span>
          </div>
        )}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[20px] sm:text-[21px] font-black text-slate-900 tracking-tight">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[12px] text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {savings > 0 && (
          <p className="text-[11px] font-bold text-brand-green mb-4 bg-brand-green/8 px-2 py-0.5 rounded leading-none w-max">Save ₹{savings.toLocaleString()}</p>
        )}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className={`w-full h-[46px] rounded-[14px] font-bold text-[13px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer mt-auto shadow-[0_4px_12px_rgba(0,0,0,0.03)] ${
            added
              ? 'bg-brand-green text-white shadow-[0_6px_20px_rgba(0,200,83,0.22)]'
              : 'bg-slate-950 text-white hover:bg-slate-900'
          }`}
        >
          {added ? (
            <><FiCheck className="text-sm" /> Added</>
          ) : (
            <><FiShoppingBag className="text-sm" /> Add to Cart</>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default memo(ProductCard)
