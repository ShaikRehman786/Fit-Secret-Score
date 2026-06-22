import { motion } from 'framer-motion'

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1.5">
      <div className="flex flex-nowrap lg:flex-wrap gap-2.5 whitespace-nowrap pb-1 lg:pb-0">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.015, y: -0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(cat.id)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-extrabold transition-all duration-300 cursor-pointer border font-heading ${
              active === cat.id
                ? 'bg-brand-green border-brand-green text-white shadow-[0_6px_20px_rgba(15,91,67,0.35)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20 shadow-md'
            }`}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
