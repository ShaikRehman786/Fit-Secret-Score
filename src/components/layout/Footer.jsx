import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiClock, FiInstagram, FiFacebook, FiMail } from 'react-icons/fi'
import { businessInfo } from '../../data/products'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop All', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const categories = [
  { label: 'Whey Protein', slug: 'whey-protein' },
  { label: 'Mass Gainers', slug: 'mass-gainers' },
  { label: 'Creatine', slug: 'creatine' },
  { label: 'Fat Burners', slug: 'fat-burners' },
]

const socials = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiMail, href: 'mailto:info@fitsecrets.in', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-auto border-t border-white/[0.04]">
      <div className="section-container pt-[80px] pb-[40px] lg:pt-[100px] lg:pb-[60px]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-9.5 h-9.5 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <span className="text-white font-black text-base">F</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-[15px] text-white tracking-tight">Fit Secrets</span>
                <span className="text-[8px] text-white/40 tracking-[3px] uppercase mt-0.5">Store</span>
              </div>
            </Link>
            <p className="text-[13px] text-slate-400 leading-relaxed mb-6 max-w-[260px]">
              Vijayawada's most trusted fitness nutrition store. All products lab-tested and guaranteed authentic.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:bg-brand-green hover:text-white hover:border-brand-green/20 hover:scale-105 shadow-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,200,83,0.25)]"
                >
                  <s.icon className="text-[14px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-500 tracking-[3px] mb-6 uppercase">QUICK LINKS</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-[14px] text-slate-400 hover:text-brand-green transition-all duration-300 hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-500 tracking-[3px] mb-6 uppercase">CATEGORIES</h4>
            <ul className="space-y-3">
              {categories.map((cat, i) => (
                <li key={i}>
                  <Link to={`/products?category=${cat.slug}`} className="text-[14px] text-slate-400 hover:text-brand-green transition-all duration-300 hover:translate-x-1 inline-block">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-500 tracking-[3px] mb-6 uppercase">VISIT US</h4>
            <ul className="space-y-4 text-[14px] text-slate-400">
              <li className="flex gap-3">
                <FiMapPin className="text-brand-green shrink-0 mt-0.5" />
                <span className="leading-relaxed">{businessInfo.address}</span>
              </li>
              <li className="flex gap-3">
                <FiPhone className="text-brand-green shrink-0 mt-0.5" />
                <a href={`tel:${businessInfo.phone}`} className="hover:text-brand-green transition-colors duration-300">{businessInfo.phone}</a>
              </li>
              <li className="flex gap-3">
                <FiClock className="text-brand-green shrink-0 mt-0.5" />
                <span>Open daily till 10 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04]">
        <div className="section-container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-white/30">
              &copy; {new Date().getFullYear()} Fit Secrets Store. All rights reserved.
            </p>
            <p className="text-[12px] text-white/20">
              Premium Fitness Nutrition Since 2020
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
