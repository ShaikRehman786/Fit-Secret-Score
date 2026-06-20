import { motion } from 'framer-motion'

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="py-2 mb-8">
      <div className="flex flex-wrap gap-[10px]">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.015, y: -0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(cat.id)}
            className={`px-[22px] py-[10.5px] rounded-full text-[13px] font-bold transition-all duration-300 cursor-pointer border ${
              active === cat.id
                ? 'bg-brand-green border-brand-green text-white shadow-[0_6px_20px_rgba(0,200,83,0.22)]'
                : 'bg-white border-slate-200/60 text-slate-500 hover:text-slate-900 hover:border-slate-300 shadow-[0_4px_10px_rgba(0,0,0,0.01)]'
            }`}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
