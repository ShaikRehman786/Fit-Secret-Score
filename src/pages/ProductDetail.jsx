import { useState, useEffect, startTransition } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiShoppingBag, FiArrowLeft, FiStar, FiCheck, FiMessageCircle, FiTruck, FiShield, FiDollarSign } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import ImageZoom from '../components/product/ImageZoom'
import QuantitySelector from '../components/product/QuantitySelector'
import ProductCard from '../components/product/ProductCard'
import { useCart } from '../context/useCart'
import { products, businessInfo } from '../data/products'

const highlights = [
  '100% Genuine imported authenticity guaranteed',
  'Tested and certified in state-of-the-art facilities',
  'Complimentary Vijayawada doorstep express shipping',
  'Secure ordering with direct check-out pathways',
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

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  const product = products.find(p => p.id === parseInt(id))
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4)

  useEffect(() => {
    startTransition(() => { setLoading(true); setQuantity(1); setAdded(false) })
    const t = setTimeout(() => setLoading(false), 300)
    window.scrollTo(0, 0)
    return () => clearTimeout(t)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-[#F8F6F1] flex items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F8F6F1]">
        <div className="text-center px-4">
          <h2 className="text-2xl font-black text-brand-dark mb-3 font-heading">Product Not Found</h2>
          <p className="text-brand-gray mb-6 font-medium">This product does not exist or has been removed.</p>
          <Link to="/products" className="text-brand-green font-extrabold hover:underline font-heading">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleWhatsApp = () => {
    const msg = `Hi Fit Secrets! I would like to place an order: ${product.name} (₹${product.price}). Quantity: ${quantity}.`
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const savings = product.originalPrice - product.price

  return (
    <div className="flex-1 flex flex-col bg-[#F8F6F1] text-brand-dark">
      <Helmet>
        <title>{product.name} | Fit Secrets Store Vijayawada</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>
      
      <div className="container-fit py-8 lg:py-12 flex-1">
        
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-dark transition-colors mb-8 text-[11px] font-black font-heading uppercase tracking-[2px]"
        >
          <FiArrowLeft className="text-xs" /> Back to Products
        </Link>

        {/* Product Details Spread */}
        <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 mb-20 lg:mb-28">
          
          {/* Left Block Image Showcase */}
          <ScrollReveal delay={0.05}>
            <div className="aspect-square rounded-[32px] overflow-hidden border border-slate-100 shadow-luxury-soft bg-white p-6 relative flex items-center justify-center">
              
              {/* Soft visual background card circle */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-[#F6F4EE]/50 z-0" />
              
              <div className="relative z-10 w-[90%] h-[90%] flex items-center justify-center">
                <ImageZoom src={product.image} alt={product.name} />
              </div>
              
              {product.discount > 0 && (
                <span className="absolute top-6 left-6 bg-rose-500 text-white text-[9.5px] font-black px-3 py-1.5 rounded-lg tracking-widest shadow-md uppercase font-heading leading-none">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
          </ScrollReveal>

          {/* Right Block Details Panel */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col h-full justify-center">
              
              {/* Category & Tags Row */}
              <div className="flex items-center gap-2 mb-4.5">
                <span className="text-[10px] font-black tracking-[2px] uppercase text-brand-green bg-brand-green-light px-3.5 py-1.5 rounded-full border border-brand-green-light/40 font-heading">
                  {categoryLabels[product.category] || product.category}
                </span>
                {product.isBestSeller && (
                  <span className="text-[10px] font-black text-brand-gold bg-brand-gold/10 px-3.5 py-1.5 rounded-full border border-brand-gold/20 font-heading uppercase tracking-[2px]">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black text-brand-dark mb-4 leading-tight font-heading tracking-tight">
                {product.name}
              </h1>

              {/* Stars ratings */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-6.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-[11.5px] ${i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-brand-dark font-extrabold">{product.rating}</span>
                  <span className="text-[13px] text-brand-gray">({product.reviewCount} verified client reviews)</span>
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[34px] lg:text-[42px] font-black text-brand-dark tracking-tight font-heading leading-none">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-[17px] text-brand-gray line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-[9.5px] font-black text-rose-500 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg uppercase font-heading tracking-[1.5px] ml-1.5">
                      -{product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              {savings > 0 && (
                <p className="text-[9.5px] font-black text-brand-green mb-6.5 bg-brand-green-light px-3 py-1 rounded-lg w-max font-heading uppercase tracking-[2px]">
                  Immediate Savings: ₹{savings.toLocaleString()}
                </p>
              )}

              {/* Description */}
              <p className="text-brand-gray text-[16px] leading-relaxed mb-8 font-medium">
                {product.description}
              </p>

              {/* Goal parameters checkmark list */}
              <div className="space-y-3.5 mb-8.5 border-t border-slate-200/50 pt-7">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 text-[14px] text-brand-dark font-bold leading-normal">
                    <div className="w-5 h-5 rounded-full bg-brand-green-light border border-brand-green-light/45 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="text-xs font-black" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Purchase button configurations */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4.5 mb-4">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  className="btn-pill btn-pill-solid flex-1"
                >
                  <FiShoppingBag className="text-sm" />
                  {added ? 'Added to Cart' : 'Add to Cart'}
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="btn-pill btn-pill-gold w-full shadow-lg"
              >
                <FiMessageCircle className="text-base" />
                Submit Order via WhatsApp
              </motion.button>

              {/* Mini trust row details */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 pt-7 border-t border-slate-200/50 text-[11.5px] text-brand-gray font-black tracking-widest uppercase font-heading">
                <span className="flex items-center gap-1.5"><FiTruck className="text-brand-green" /> Free Delivery</span>
                <span className="flex items-center gap-1.5"><FiShield className="text-brand-green" /> Certified Batch</span>
                <span className="flex items-center gap-1.5"><FiDollarSign className="text-brand-green" /> Direct Wholesale</span>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* Related Products Section Staggered */}
        {related.length > 0 && (
          <section className="border-t border-slate-200/50 pt-16 lg:pt-20">
            <ScrollReveal>
              <span className="text-[10px] font-black tracking-[3px] text-brand-green uppercase font-heading block mb-2">CATALOG COMPLEMENTS</span>
              <h2 className="text-h2 font-black text-brand-dark mb-10 font-heading tracking-tight leading-tight">Related Wellness Solutions</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
