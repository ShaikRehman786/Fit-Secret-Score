import { Link } from 'react-router-dom'
import { FiMapPin, FiInstagram, FiFacebook, FiMail, FiSend } from 'react-icons/fi'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const categories = [
  { label: 'Whey Protein', slug: 'nutritional-supplements' },
  { label: 'Ayurvedic Products', slug: 'ayurvedic' },
  { label: 'Organic Natural', slug: 'organic' },
  { label: 'Dry Fruits', slug: 'dryfruits' },
]

const socials = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiMail, href: 'mailto:hello@fitsecrets.store', label: 'Email' },
]

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <footer className="bg-[#0A2215] text-white mt-auto border-t border-white/5 relative overflow-hidden grain-texture">
      {/* Background soft ambient gold glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-gold/5 blur-[120px] bottom-[-20%] right-[-10%] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-green/5 blur-[100px] top-[-15%] left-[-5%] pointer-events-none" />
      
      <div className="section-container relative z-10 pt-[110px] pb-[60px] lg:pt-[130px] lg:pb-[70px]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.4fr] gap-12 lg:gap-16">
          
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105 shadow-md">
                <span className="text-brand-gold font-serif-lux text-xl font-bold italic">F</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-[17px] text-white tracking-tight font-heading">Fit Secrets</span>
                <span className="text-[9px] text-brand-gold font-black tracking-[4px] uppercase mt-0.5 font-heading">Store</span>
              </div>
            </Link>
            <p className="text-[14px] text-slate-300 leading-relaxed max-w-[280px] font-medium">
              Vijayawada's flagship fitness nutrition store. Lab-tested authentic supplements, customized nutrition advice, and curated wellness labels.
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold hover:scale-110 transition-all duration-300 hover:shadow-luxury-glow"
                >
                  <s.icon className="text-[14px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[9.5px] font-black text-brand-gold tracking-[3px] mb-6 uppercase font-heading">QUICK LINKS</h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-[14px] text-slate-350 hover:text-brand-gold transition-all duration-300 hover:translate-x-1.5 inline-block font-medium relative group">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold/40 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[9.5px] font-black text-brand-gold tracking-[3px] mb-6 uppercase font-heading">CATEGORIES</h4>
            <ul className="space-y-3.5">
              {categories.map((cat, i) => (
                <li key={i}>
                  <Link to={`/products?category=${cat.slug}`} className="text-[14px] text-slate-355 hover:text-brand-gold transition-all duration-300 hover:translate-x-1.5 inline-block font-medium relative group">
                    {cat.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold/40 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-[9.5px] font-black text-brand-gold tracking-[3px] mb-5 uppercase font-heading">JOIN THE CLUB</h4>
              <p className="text-[14px] text-slate-300 leading-relaxed max-w-[340px] font-medium">
                Subscribe for training blueprints, early product restocks, and exclusive client offers.
              </p>
            </div>
            
            {/* Elegant Luxury dark input */}
            <form onSubmit={handleSubmit} className="relative flex items-center border-b border-white/20 focus-within:border-brand-gold transition-all max-w-[340px] py-1.5 pr-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent border-none text-white text-[13.5px] outline-none w-full font-medium placeholder-slate-400 py-2"
                required
              />
              <button
                type="submit"
                className="absolute right-0 w-8 h-8 rounded-full bg-brand-gold text-brand-dark hover:bg-white transition-all flex items-center justify-center cursor-pointer shadow-md"
                aria-label="Subscribe"
              >
                <FiSend className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright bar */}
      <div className="border-t border-white/5 bg-black/10">
        <div className="section-container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-[13px] text-white/40 font-medium">
              <span>&copy; {new Date().getFullYear()} Fit Secrets.</span>
              <span className="hidden sm:inline text-white/10">|</span>
              <span className="flex items-center gap-1.5"><FiMapPin className="text-brand-gold text-xs" /> Vijayawada, AP</span>
            </div>
            <p className="text-[10px] font-black tracking-[2px] uppercase font-heading text-white/35">
              Refined Wellness Store
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
