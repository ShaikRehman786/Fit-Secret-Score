import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiSend, FiMapPin, FiPhone, FiMail, FiClock, FiMessageCircle, FiCheck } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import { businessInfo } from '../data/products'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  const handleWhatsApp = () => {
    const msg = 'Hi Fit Secrets Store! I have a question about your products.'
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="flex-1 flex flex-col">
      <Helmet>
        <title>Contact Us | Fit Secrets Store - Vijayawada</title>
        <meta name="description" content={`Visit Fit Secrets Store at ${businessInfo.address}. Call ${businessInfo.phone} or chat on WhatsApp. Open 7 days a week.`} />
      </Helmet>

      {/* Hero */}
      <section className="bg-slate-950 bg-gradient-to-b from-[#050505] to-[#0c0c0c] py-[110px] lg:py-[140px] relative overflow-hidden flex items-center justify-center border-b border-white/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.12),transparent_65%)] pointer-events-none" />
        <div className="absolute w-[60%] h-[60%] rounded-full bg-brand-green/5 blur-[120px] -top-1/4 -right-1/4 pointer-events-none" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-heading-wrapper"
          >
            <span className="inline-block text-brand-green font-extrabold text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase mb-5 bg-brand-green/10 px-4.5 py-2 rounded-full border border-brand-green/15 leading-none">
              Contact
            </span>
            <h1 className="text-h1 text-white mb-6 leading-tight tracking-tight max-w-2xl font-black">
              Get in Touch
            </h1>
            <p className="text-body text-slate-400 max-w-2xl mx-auto leading-relaxed mb-0 font-medium">
              Have a question or want to place a bulk order? Our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 bg-gray-50 py-[90px] lg:py-[110px]">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-[40px] mb-12">
            <ScrollReveal>
              <div className="bg-white rounded-[24px] p-9 sm:p-10 border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
                <h2 className="text-[24px] font-black text-black mb-8 tracking-tight">Send a Message</h2>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="text-2xl text-brand-green" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-[15px]">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-[20px]">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-500 mb-[8px] uppercase tracking-widest">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full h-[54px] px-5 rounded-[16px] border border-slate-200/80 bg-slate-50/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all text-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.01)]"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-500 mb-[8px] uppercase tracking-widest">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full h-[54px] px-5 rounded-[16px] border border-slate-200/80 bg-slate-50/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all text-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.01)]"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-500 mb-[8px] uppercase tracking-widest">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full h-[54px] px-5 rounded-[16px] border border-slate-200/80 bg-slate-50/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all text-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.01)]"
                          placeholder={businessInfo.phone}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-500 mb-[8px] uppercase tracking-widest">Message *</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-5 py-4 rounded-[16px] border border-slate-200/80 bg-slate-50/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/5 outline-none transition-all text-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.01)] resize-none min-h-[190px]"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="btn-premium btn-premium-primary w-full text-[15px] h-[54px] shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] mt-2"
                    >
                      <FiSend /> Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <div className="bg-white rounded-[24px] p-8 sm:p-9.5 border border-slate-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
                  <h2 className="text-[24px] font-black text-slate-950 mb-7 tracking-tight">Contact Info</h2>
                  <div className="space-y-6.5">
                    <div className="flex gap-5 items-start">
                      <div className="w-11 h-11 rounded-[14px] bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 shadow-sm border border-brand-green/5">
                        <FiMapPin className="text-[17px]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-450 font-extrabold uppercase tracking-widest mb-1.5 leading-none">Address</p>
                        <p className="text-[14.5px] text-slate-800 font-bold leading-relaxed">
                          {businessInfo.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-5 items-start">
                      <div className="w-11 h-11 rounded-[14px] bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 shadow-sm border border-brand-green/5">
                        <FiPhone className="text-[17px]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-450 font-extrabold uppercase tracking-widest mb-1.5 leading-none">Phone</p>
                        <a href={`tel:${businessInfo.phone.replace(/\s/g, '')}`} className="text-[14.5px] text-slate-800 font-bold hover:text-brand-green transition-colors">
                          {businessInfo.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-5 items-start">
                      <div className="w-11 h-11 rounded-[14px] bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 shadow-sm border border-brand-green/5">
                        <FiMail className="text-[17px]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-450 font-extrabold uppercase tracking-widest mb-1.5 leading-none">Email</p>
                        <a href={`mailto:${businessInfo.email}`} className="text-[14.5px] text-slate-800 font-bold hover:text-brand-green transition-colors">
                          {businessInfo.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-5 items-start">
                      <div className="w-11 h-11 rounded-[14px] bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 shadow-sm border border-brand-green/5">
                        <FiClock className="text-[17px]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-450 font-extrabold uppercase tracking-widest mb-1.5 leading-none">Hours</p>
                        <p className="text-[14.5px] text-slate-800 font-bold leading-relaxed">Mon - Sun: Open, Closes 10 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsApp}
                  className="btn-premium btn-premium-green w-full text-[15px] h-[54px] shadow-[0_4px_12px_rgba(22,163,74,0.1)] hover:shadow-[0_12px_24px_rgba(22,163,74,0.25)]"
                >
                  <FiMessageCircle className="text-lg" />
                  Chat on WhatsApp
                </motion.button>
              </div>
            </ScrollReveal>
          </div>

          <div className="rounded-[28px] overflow-hidden border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-1 bg-white h-72 sm:h-80 mt-16 lg:mt-24">
            <div className="rounded-[24px] overflow-hidden h-full">
              <iframe
                src={businessInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fit Secrets Store Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
