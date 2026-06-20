import { useReducer, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CartContext } from './CartContext.js'

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity || 1 }
              : item
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      }
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [notification, setNotification] = useState(null)

  const addToCart = useCallback((product, qty = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: qty } })
    setNotification(`${product.name} added to cart!`)
    setTimeout(() => setNotification(null), 3000)
  }, [])

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalOriginalPrice = state.items.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0
  )
  const totalDiscount = totalOriginalPrice - totalPrice

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalOriginalPrice,
        totalDiscount,
      }}
    >
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-28 left-1/2 z-50 bg-brand-dark text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-medium whitespace-nowrap"
          >
            <span className="text-brand-green text-lg shrink-0">✓</span>
            <span className="truncate max-w-[250px]">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  )
}


