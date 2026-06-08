import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowTopRightOnSquare, HiShieldCheck } from 'react-icons/hi2';

const certificates = [
  {
    title: 'LinkedIn Certifications',
    issuer: 'LinkedIn Profile',
    description:
      'A public collection of your certificates on LinkedIn. Best for quick credibility if the certificate titles are not yet listed individually.',
    link: 'https://www.linkedin.com/in/moin-makrani-9a1a50363/details/certifications/',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

function Certificates() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="certificates" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Certificates
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Verified learning that can be opened directly from your LinkedIn profile
        </motion.p>

        <motion.div
          className="certificates-grid"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {certificates.map((certificate) => (
            <motion.div
              key={certificate.title}
              className="glass-card certificate-card"
              variants={cardVariants}
            >
              <div className="certificate-icon">
                <HiShieldCheck />
              </div>

              <div className="certificate-content">
                <p className="certificate-issuer">{certificate.issuer}</p>
                <h3 className="certificate-title">{certificate.title}</h3>
                <p className="certificate-desc">{certificate.description}</p>

                <a
                  href={certificate.link}
                  className="certificate-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on LinkedIn
                  <HiArrowTopRightOnSquare />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Certificates;