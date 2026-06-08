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

  const handleSubmit = (e) => {
    e.preventDefault()
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
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Your Message"
                />
              </div>

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
