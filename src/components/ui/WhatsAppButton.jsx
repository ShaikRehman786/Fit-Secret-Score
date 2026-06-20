import { FiMessageCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { businessInfo } from '../../data/products'

export default function WhatsAppButton() {
  const handleClick = () => {
    const msg = 'Hi Fit Secrets Store! I have a question about your products.'
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-green-500 text-white shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <FiMessageCircle className="text-xl" />
    </motion.button>
  )
}
