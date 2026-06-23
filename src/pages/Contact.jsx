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
    const msg = 'Hi Fit Secrets! I have a question about your custom supplement consults.'
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F8F6F1] text-brand-dark">
      <Helmet>
        <title>Contact Us | Fit Secrets Store - Vijayawada</title>
        <meta name="description" content={`Visit Fit Secrets Store at ${businessInfo.address}. Call ${businessInfo.phone} or chat on WhatsApp. Open 7 days a week.`} />
      </Helmet>

      {/* Banner Title */}
      <section className="relative py-24 lg:py-[150px] overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,111,67,0.03),transparent_70%)] pointer-events-none" />
        <div className="absolute w-[50%] h-[50%] rounded-full bg-brand-gold/5 blur-[120px] -top-1/4 -right-1/4 pointer-events-none" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="inline-block text-brand-green font-extrabold text-[10px] tracking-[3px] uppercase mb-5 bg-brand-green-light px-5 py-2.5 rounded-full border border-brand-green-light/40 leading-none font-heading mx-auto">
              GET IN TOUCH
            </span>
            <h1 className="text-h1 font-heading font-black text-brand-dark max-w-4xl mx-auto mb-6 tracking-tight leading-tight">
              Connect With Our <span className="font-serif-lux text-brand-gold font-normal italic">Wellness Team</span>
            </h1>
            <p className="text-[17px] text-brand-gray max-w-2xl mx-auto leading-relaxed mb-0 font-medium">
              Visit our MG Road boutique for private nutritionist consultations, bulk orders, or verify batch credentials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form and Info Section */}
      <section className="flex-1 bg-[#F8F6F1] py-24 lg:py-32 relative">
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column Form */}
            <ScrollReveal>
              <div className="bg-white rounded-[32px] p-8 sm:p-12 lg:p-16 border border-slate-100 shadow-luxury-soft hover:shadow-luxury-depth transition-shadow duration-500">
                <span className="text-[9.5px] font-black text-brand-green uppercase tracking-[2.5px] font-heading block mb-2">SEND AN ENQUIRY</span>
                <h2 className="text-[22px] font-black text-brand-dark mb-8 tracking-tight font-heading">Consultation Request</h2>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-14"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-green-light flex items-center justify-center mx-auto mb-5 border border-brand-green-light/40 shadow-sm animate-bounce">
                      <FiCheck className="text-xl text-brand-green font-black" />
                    </div>
                    <h3 className="text-xl font-black text-brand-dark mb-2 font-heading">Enquiry Registered!</h3>
                    <p className="text-brand-gray text-[14.5px] font-medium">A nutritionist will contact you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-[26px]">
                    <div>
                      <label className="block text-[9.5px] font-black text-brand-gray uppercase tracking-widest font-heading">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-luxury"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6.5">
                      <div>
                        <label className="block text-[9.5px] font-black text-brand-gray uppercase tracking-widest font-heading">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="input-luxury"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[9.5px] font-black text-brand-gray uppercase tracking-widest font-heading">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="input-luxury"
                          placeholder={businessInfo.phone}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9.5px] font-black text-brand-gray uppercase tracking-widest font-heading">Describe Your Goals *</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input-luxury min-h-[140px] resize-none pt-4"
                        placeholder="What supplements, fitness targets, or organic foods can we help you coordinate?"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-pill btn-pill-solid w-full mt-4 font-black shadow-md"
                    >
                      <FiSend /> Request consultation
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Right Column Info Cards */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-8">
                <div className="grid gap-6 sm:gap-7">
                  
                  {/* Address Card */}
                  <div className="p-7 bg-white border border-brand-gold/15 rounded-[28px] shadow-luxury-soft hover:shadow-luxury-hover hover:-translate-y-1.5 transition-all duration-500 flex gap-5 items-start group">
                    <div className="w-11 h-11 rounded-xl bg-[#F6F4EE] group-hover:bg-brand-green text-brand-green group-hover:text-white flex items-center justify-center shrink-0 border border-slate-150 transition-all duration-300 shadow-sm group-hover:scale-110">
                      <FiMapPin className="text-[17px]" />
                    </div>
                    <div>
                      <p className="text-[9.5px] text-brand-gray font-black uppercase tracking-widest mb-1 leading-none font-heading">Flagship Location</p>
                      <p className="text-[14.5px] text-brand-dark font-black leading-relaxed font-heading">
                        {businessInfo.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="p-7 bg-white border border-brand-gold/15 rounded-[28px] shadow-luxury-soft hover:shadow-luxury-hover hover:-translate-y-1.5 transition-all duration-500 flex gap-5 items-start group">
                    <div className="w-11 h-11 rounded-xl bg-[#F6F4EE] group-hover:bg-brand-green text-brand-green group-hover:text-white flex items-center justify-center shrink-0 border border-slate-150 transition-all duration-300 shadow-sm group-hover:scale-110">
                      <FiPhone className="text-[17px]" />
                    </div>
                    <div>
                      <p className="text-[9.5px] text-brand-gray font-black uppercase tracking-widest mb-1 leading-none font-heading">Direct Line</p>
                      <a href={`tel:${businessInfo.phone.replace(/\s/g, '')}`} className="text-[15px] text-brand-dark font-black hover:text-brand-green transition-colors font-heading">
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="p-7 bg-white border border-brand-gold/15 rounded-[28px] shadow-luxury-soft hover:shadow-luxury-hover hover:-translate-y-1.5 transition-all duration-500 flex gap-5 items-start group">
                    <div className="w-11 h-11 rounded-xl bg-[#F6F4EE] group-hover:bg-brand-green text-brand-green group-hover:text-white flex items-center justify-center shrink-0 border border-slate-150 transition-all duration-300 shadow-sm group-hover:scale-110">
                      <FiMail className="text-[17px]" />
                    </div>
                    <div>
                      <p className="text-[9.5px] text-brand-gray font-black uppercase tracking-widest mb-1 leading-none font-heading">Digital Inquiries</p>
                      <a href={`mailto:${businessInfo.email}`} className="text-[15px] text-brand-dark font-black hover:text-brand-green transition-colors font-heading">
                        {businessInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours Card */}
                  <div className="p-7 bg-white border border-brand-gold/15 rounded-[28px] shadow-luxury-soft hover:shadow-luxury-hover hover:-translate-y-1.5 transition-all duration-500 flex gap-5 items-start group">
                    <div className="w-11 h-11 rounded-xl bg-[#F6F4EE] group-hover:bg-brand-green text-brand-green group-hover:text-white flex items-center justify-center shrink-0 border border-slate-150 transition-all duration-300 shadow-sm group-hover:scale-110">
                      <FiClock className="text-[17px]" />
                    </div>
                    <div>
                      <p className="text-[9.5px] text-brand-gray font-black uppercase tracking-widest mb-1 leading-none font-heading">Consultation Hours</p>
                      <p className="text-[14.5px] text-brand-dark font-black leading-relaxed font-heading">Mon - Sun: Open, Closes 10:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Consultation Button */}
                <button
                  onClick={handleWhatsApp}
                  className="btn-pill btn-pill-gold w-full mt-8 shadow-lg"
                >
                  <FiMessageCircle className="text-lg" />
                  Chat on WhatsApp
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Map Section */}
          <div className="rounded-[32px] overflow-hidden border border-slate-100 shadow-luxury-soft p-2 bg-white h-72 sm:h-[400px] mt-20 lg:mt-24 hover:shadow-luxury-depth transition-shadow duration-500">
            <div className="rounded-[24px] overflow-hidden h-full">
              <iframe
                src={businessInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fit Secrets Store Location Map"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
