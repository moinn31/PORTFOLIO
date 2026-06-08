import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiEnvelope, HiPhone, HiMapPin, HiPaperAirplane } from 'react-icons/hi2'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    if (!name || !email || !message) {
      setStatus('Please fill in all fields before sending.')
      return
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )

    window.location.href = `mailto:moinmak033@gmail.com?subject=${subject}&body=${body}`
    setStatus('Opening your email app...')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.h2 className="section-title" variants={itemVariants}>
            Get In Touch
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Let's build something amazing together
          </motion.p>

          {/* Contact Grid */}
          <div className="contact-grid">
            {/* Left Column — Info */}
            <motion.div className="contact-info" variants={containerVariants}>
              {/* Email */}
              <motion.div className="contact-info-card" variants={itemVariants}>
                <div className="contact-info-icon">
                  <HiEnvelope />
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">
                    <a href="mailto:moinmak033@gmail.com">moinmak033@gmail.com</a>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div className="contact-info-card" variants={itemVariants}>
                <div className="contact-info-icon">
                  <HiPhone />
                </div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">
                    <a href="tel:+918866886330">+91 8866886330</a>
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div className="contact-info-card" variants={itemVariants}>
                <div className="contact-info-icon">
                  <HiMapPin />
                </div>
                <div>
                  <div className="contact-info-label">Location</div>
                  <div className="contact-info-value">Vadodara, Gujarat, India</div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div className="contact-socials" variants={itemVariants}>
                <a
                  href="https://www.linkedin.com/in/moin-makrani-9a1a50363"
                  className="contact-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://github.com/moinn31"
                  className="contact-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column — Form */}
            <motion.form
              className="contact-form glass-card"
              variants={itemVariants}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  required
                />
              </div>

              {status && <div className="contact-status">{status}</div>}

              <div className="form-submit">
                <button type="submit" className="btn btn-primary">
                  <HiPaperAirplane />
                  Send Message
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
