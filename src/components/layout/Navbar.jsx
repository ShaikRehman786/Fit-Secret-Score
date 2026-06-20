import { useState, useEffect, startTransition } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import { useCart } from '../../context/useCart'

const links = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 16)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { startTransition(() => setOpen(false)) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[var(--nav-h)] transition-all duration-500 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
            : 'bg-transparent shadow-none'
        }`}
      >
        <div className="section-container h-full">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black text-base">F</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-[15px] text-black tracking-tight">Fit Secrets</span>
                <span className="text-[8px] text-gray-400 tracking-[3px] uppercase">Store</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-[36px]">
              {links.map((link) => {
                const active = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-2 rounded-xl text-[14px] font-bold transition-all duration-200 hover:scale-[1.02] ${
                      active
                        ? 'text-black'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-gray-100 rounded-xl -z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-1">
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl hover:bg-gray-100/70 transition-colors"
                aria-label="Cart"
              >
                <FiShoppingBag className="text-lg text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-100/70 transition-colors cursor-pointer"
                aria-label={open ? 'Close' : 'Menu'}
              >
                {open ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
              {links.map((link, i) => {
                const active = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`block text-center text-2xl font-bold py-2 transition-colors ${
                        active ? 'text-black' : 'text-gray-400 hover:text-black'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="nav-spacer" />
    </>
  )
}
