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
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-luxury-soft"
    >
      <Link to={`/product/${item.id}`} className="shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#F6F4EE]/60 border border-slate-100 p-1 flex items-center justify-center">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]" loading="lazy" />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.id}`}>
          <h3 className="font-extrabold text-[14px] sm:text-[15.5px] text-brand-dark truncate hover:text-brand-green transition-colors font-heading leading-tight">
            {item.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="font-extrabold text-[15px] text-brand-dark font-heading">₹{item.price.toLocaleString()}</span>
          {item.originalPrice > item.price && (
            <span className="text-[12px] text-brand-gray line-through">₹{item.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3.5">
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-slate-100 text-brand-gray transition-colors disabled:opacity-40 cursor-pointer"
          >
            <FiMinus className="text-[10px]" />
          </button>
          <span className="w-9 sm:w-10 h-8 sm:h-9 flex items-center justify-center text-xs sm:text-[13px] font-extrabold text-brand-dark select-none border-x border-slate-200">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-slate-100 text-brand-gray transition-colors cursor-pointer"
          >
            <FiPlus className="text-[10px]" />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-brand-gray hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
        >
          <FiTrash2 className="text-xs sm:text-[15px]" />
        </button>
      </div>
    </motion.div>
  )
}

export default function Cart() {
  const { items, totalPrice, totalOriginalPrice, totalDiscount, totalItems, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F8F6F1]">
        <Helmet>
          <title>Cart | Fit Secrets Store</title>
        </Helmet>
        <div className="text-center px-6 py-20 flex flex-col items-center">
          <div className="w-20 h-20 rounded-[28px] bg-white border border-slate-100 flex items-center justify-center mx-auto mb-6 shadow-luxury-soft">
            <FiShoppingBag className="text-3xl text-brand-green" />
          </div>
          <h2 className="text-2xl font-black text-brand-dark mb-2 font-heading tracking-tight">Shopping Bag Empty</h2>
          <p className="text-brand-gray mb-8 text-[15px] font-medium max-w-xs leading-relaxed">Choose premium formulations or verify current listings from our catalog.</p>
          <Link
            to="/products"
            className="btn-pill btn-pill-solid text-[12px] shadow-lg"
          >
            <FiArrowLeft className="text-sm" /> Explore Catalog
          </Link>
        </div>
      </div>
    )
  }

  const deliveryFee = totalPrice >= 500 ? 0 : 49
  const finalTotal = totalPrice + deliveryFee

  return (
    <div className="flex-1 bg-[#F8F6F1]">
      <Helmet>
        <title>Cart ({totalItems}) | Fit Secrets Store</title>
        <meta name="description" content={`${totalItems} items in your cart. Total: ₹${totalPrice.toLocaleString()}`} />
      </Helmet>
      <div className="container-fit py-10 lg:py-16">
        
        {/* Header Title */}
        <div className="flex items-end justify-between mb-10 border-b border-slate-200/40 pb-6">
          <div>
            <span className="text-brand-green font-extrabold text-[10px] tracking-[3px] uppercase font-heading bg-brand-green-light px-3.5 py-1.5 rounded-full border border-brand-green-light/45">
              CHECKOUT DECK
            </span>
            <h1 className="text-[28px] sm:text-[34px] font-black text-brand-dark mt-4 font-heading tracking-tight leading-none">
              Your Selection <span className="font-serif-lux text-brand-gold font-normal italic">Drawer</span>
            </h1>
            <p className="text-brand-gray text-[14px] mt-2.5 font-medium">Currently holding {totalItems} items</p>
          </div>
          <button
            onClick={clearCart}
            className="text-[11.5px] text-brand-gray hover:text-rose-500 transition-colors cursor-pointer font-black uppercase tracking-wider"
          >
            Reset bag
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left item rows */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-brand-dark font-extrabold text-[12px] uppercase tracking-widest hover:text-brand-green mt-6 transition-colors font-heading"
            >
              <FiArrowLeft className="text-xs" /> Continue Shopping
            </Link>
          </div>

          {/* Right Summary Block */}
          <div className="lg:col-span-1">
            <ScrollReveal>
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 sticky top-[110px] shadow-luxury-soft">
                <h3 className="font-extrabold text-[17px] mb-6 font-heading tracking-tight">Order Summary</h3>
                <div className="space-y-4.5 mb-8 text-[14.5px] font-medium border-b border-slate-100 pb-6">
                  <div className="flex justify-between">
                    <span className="text-brand-gray">Cart Subtotal ({totalItems})</span>
                    <span className="font-extrabold text-brand-dark">₹{totalOriginalPrice.toLocaleString()}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-brand-gray">Club Savings</span>
                      <span className="font-extrabold text-brand-green">-₹{totalDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-brand-gray">Shipping Fee</span>
                    <span className={`font-extrabold ${deliveryFee === 0 ? 'text-brand-green' : 'text-brand-dark'}`}>
                      {deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[11.5px] text-brand-gray bg-slate-50 p-2.5 rounded-lg border border-slate-150/40 font-semibold leading-normal">
                      Add ₹{(500 - totalPrice).toLocaleString()} more for free shipping.
                    </p>
                  )}
                  <div className="border-t border-slate-100 pt-5 flex justify-between items-baseline">
                    <span className="font-extrabold text-[15.5px] font-heading text-brand-dark">Estimated Total</span>
                    <span className="font-black text-[26px] sm:text-[30px] text-brand-dark tracking-tight font-heading leading-none">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <button className="btn-pill btn-pill-solid w-full shadow-lg">
                  Proceed to checkout
                </button>
                
                <div className="flex items-center justify-center gap-5 text-[11px] text-brand-gray pt-5 border-t border-slate-100/60 font-black tracking-widest uppercase font-heading">
                  <span className="flex items-center gap-1.5"><FiShield className="text-brand-green" /> Secure checkout</span>
                  <span className="flex items-center gap-1.5"><FiTruck className="text-brand-green" /> Free Shipping</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  )
}
