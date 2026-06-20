import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag, FiShield, FiTruck } from 'react-icons/fi'
import { useCart } from '../context/useCart'
import ScrollReveal from '../components/ui/ScrollReveal'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100"
    >
      <Link to={`/product/${item.id}`} className="shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.id}`}>
          <h3 className="font-semibold text-[14px] sm:text-[15px] text-black truncate hover:text-gray-600 transition-colors">
            {item.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-bold text-[15px] text-black">₹{item.price.toLocaleString()}</span>
          {item.originalPrice > item.price && (
            <span className="text-[12px] text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <FiMinus className="text-[10px]" />
          </button>
          <span className="w-9 sm:w-10 h-8 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-semibold bg-white select-none border-x border-gray-200">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
          >
            <FiPlus className="text-[10px]" />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
        >
          <FiTrash2 className="text-xs sm:text-sm" />
        </button>
      </div>
    </motion.div>
  )
}

export default function Cart() {
  const { items, totalPrice, totalOriginalPrice, totalDiscount, totalItems, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <Helmet>
          <title>Cart | Fit Secrets Store</title>
        </Helmet>
        <div className="text-center px-6 py-20">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-3xl text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 text-[15px]">Looks like you haven&apos;t added anything yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-7 h-12 rounded-2xl font-semibold text-[14px] hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft /> Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  const deliveryFee = totalPrice >= 500 ? 0 : 49
  const finalTotal = totalPrice + deliveryFee

  return (
    <div className="flex-1 bg-gray-50">
      <Helmet>
        <title>Cart ({totalItems}) | Fit Secrets Store</title>
        <meta name="description" content={`${totalItems} items in your cart. Total: ₹${totalPrice.toLocaleString()}`} />
      </Helmet>
      <div className="container-fit py-8 lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-brand-green font-semibold text-[11px] tracking-[3px] uppercase">Cart</span>
            <h1 className="text-[28px] sm:text-[34px] font-bold text-black mt-1">Shopping Cart</h1>
            <p className="text-gray-500 text-[14px] mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-[13px] text-gray-500 hover:text-red-500 transition-colors cursor-pointer font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-black font-medium text-[14px] hover:underline mt-4"
            >
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 sticky top-[90px]">
                <h3 className="font-bold text-[18px] mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6 text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">₹{totalOriginalPrice.toLocaleString()}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-medium text-brand-green">-₹{totalDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery</span>
                    <span className={`font-medium ${deliveryFee === 0 ? 'text-brand-green' : ''}`}>
                      {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[12px] text-gray-400">Free on orders above ₹500</p>
                  )}
                  <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <span className="font-bold text-[16px]">Total</span>
                    <span className="font-bold text-[24px] sm:text-[28px] text-black tracking-tight">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-12 bg-black text-white font-semibold rounded-2xl text-[14px] hover:bg-gray-800 transition-colors cursor-pointer mb-4"
                >
                  Checkout
                </motion.button>
                <div className="flex items-center justify-center gap-5 text-[12px] text-gray-400 pt-4 border-t border-gray-50">
                  <span className="flex items-center gap-1.5"><FiShield className="text-brand-green" /> Secure</span>
                  <span className="flex items-center gap-1.5"><FiTruck className="text-brand-green" /> Free Delivery</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
