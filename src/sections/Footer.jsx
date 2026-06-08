import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiEnvelope } from 'react-icons/hi2'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-logo">MOIN.DEV</div>

        <div className="footer-links">
          <a
            href="https://github.com/moinn31"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/moin-makrani-9a1a50363"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a href="mailto:moinmak033@gmail.com" className="footer-link">
            <HiEnvelope /> Email
          </a>
        </div>

        <p className="footer-text">
          © 2025 Makrani Moinuddin. Crafted with passion &amp; code.
        </p>
      </div>
    </footer>
  )
}

export default Footer
