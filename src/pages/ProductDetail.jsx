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
  '100% Original — Lab Tested & Verified',
  'Best Prices in Vijayawada — Guaranteed',
  'Free Delivery Across Vijayawada',
  'Secure Payment & Easy Returns',
]

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
    const t = setTimeout(() => setLoading(false), 350)
    window.scrollTo(0, 0)
    return () => clearTimeout(t)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-white">
        <div className="container-fit py-8 lg:py-12">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="skeleton h-[300px] sm:h-[450px] md:h-[550px] rounded-2xl" />
            <div className="space-y-5">
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-8 w-3/4 rounded" />
              <div className="skeleton h-5 w-40 rounded" />
              <div className="skeleton h-24 w-full rounded" />
              <div className="skeleton h-11 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-black mb-3">Product Not Found</h2>
          <p className="text-gray-500 mb-6">This product does not exist or has been removed.</p>
          <Link to="/products" className="text-brand-green font-semibold hover:underline">
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
    const msg = `Hi Fit Secrets Store! I want to order: ${product.name} (₹${product.price}). Quantity: ${quantity}.`
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const savings = product.originalPrice - product.price

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Helmet>
        <title>{product.name} | Fit Secrets Store Vijayawada</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>
      <div className="container-fit py-6 lg:py-10 flex-1">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-6 text-[14px] font-medium"
        >
          <FiArrowLeft /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16 lg:mb-24">
          <ScrollReveal delay={0.1}>
            <div className="h-[300px] sm:h-[450px] md:h-[550px] lg:h-[600px]">
              <ImageZoom src={product.image} alt={product.name} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">
                  {product.category}
                </span>
                {product.isBestSeller && (
                  <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                    Best Seller
                  </span>
                )}
              </div>

              <h1 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold text-black mb-4 leading-tight">
                {product.name}
              </h1>

              {product.rating && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-sm ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[14px] text-gray-500 font-medium">{product.rating}</span>
                  <span className="text-[13px] text-gray-400">({product.reviewCount} reviews)</span>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[32px] sm:text-[38px] font-bold text-black tracking-tight">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-lg">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>
              {savings > 0 && (
                <p className="text-[14px] font-medium text-brand-green mb-6">You save ₹{savings.toLocaleString()}</p>
              )}

              <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="space-y-3 mb-8">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[13px] sm:text-[14px] text-gray-600">
                    <FiCheck className="text-brand-green shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className={`w-full sm:w-auto px-8 h-12 rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    added ? 'bg-black text-white' : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <FiShoppingBag />
                  {added ? 'Added!' : 'Add to Cart'}
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWhatsApp}
                className="w-full h-12 bg-green-500 text-white rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2.5 hover:bg-green-600 transition-all cursor-pointer"
              >
                <FiMessageCircle />
                Order via WhatsApp
              </motion.button>

              <div className="flex items-center gap-5 mt-6 pt-6 border-t border-gray-100 text-[12px] sm:text-[13px] text-gray-400">
                <span className="flex items-center gap-1.5"><FiTruck className="text-brand-green" /> Free Delivery</span>
                <span className="flex items-center gap-1.5"><FiShield className="text-brand-green" /> Secure</span>
                <span className="flex items-center gap-1.5"><FiDollarSign className="text-brand-green" /> Best Price</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {related.length > 0 && (
          <section className="border-t border-gray-100 pt-12 lg:pt-16">
            <ScrollReveal>
              <h2 className="text-[24px] sm:text-[28px] font-bold text-black mb-8">Related Products</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
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
