import { motion } from 'framer-motion'
import { FiMinus, FiPlus } from 'react-icons/fi'

export default function QuantitySelector({ quantity, onChange, max = 99 }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[14px] font-medium text-gray-600">Qty</span>
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => quantity > 1 && onChange(quantity - 1)}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-40 cursor-pointer"
        >
          <FiMinus className="text-xs" />
        </motion.button>
        <span className="w-12 h-10 flex items-center justify-center font-semibold text-sm bg-white select-none border-x border-gray-200">
          {quantity}
        </span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => quantity < max && onChange(quantity + 1)}
          disabled={quantity >= max}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-40 cursor-pointer"
        >
          <FiPlus className="text-xs" />
        </motion.button>
      </div>
    </div>
  )
}
