import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiArrowDown, HiEnvelope, HiDocumentArrowDown } from 'react-icons/hi2';
import heroImage from '../assets/hero.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const scrollTo = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  return (
    <section id="home" className="hero section">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Left: Text Column ── */}
          <motion.div className="hero-text" variants={containerVariants}>
            <motion.p className="hero-label" variants={childVariants}>
              // WELCOME TO MY UNIVERSE
            </motion.p>

            <motion.h1 className="hero-name" variants={childVariants}>
              <span className="first-name">Makrani</span>
              <span className="last-name">Moinuddin</span>
            </motion.h1>

            <motion.div variants={childVariants}>
              <TypeAnimation
                sequence={[
                  'Aspiring Full Stack Developer',
                  2000,
                  'Data Analytics Enthusiast',
                  2000,
                  'Problem Solver',
                  2000,
                  'Tech Explorer',
                  2000,
                ]}
                speed={50}
                deletionSpeed={30}
                repeat={Infinity}
                wrapper="span"
                className="hero-typing"
              />
            </motion.div>

            <motion.p className="hero-desc" variants={childVariants}>
              Building the future of web applications with clean code,
              data-driven insights, and innovative design.
            </motion.p>

            <motion.div className="hero-cta" variants={childVariants}>
              <button
                className="btn btn-primary"
                onClick={() => scrollTo('#projects')}
              >
                <HiArrowDown />
                View Projects
              </button>

              <button
                className="btn btn-outline"
                onClick={() => scrollTo('#contact')}
              >
                <HiEnvelope />
                Contact Me
              </button>

              <a
                href="/resume.pdf"
                download
                className="btn btn-ghost"
              >
                <HiDocumentArrowDown />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Avatar / Image Column ── */}
          <motion.div className="hero-image-wrapper" variants={imageVariants}>
            <div className="hero-image-container">
              <div className="hero-image-glow" />
              <div className="hero-image-ring" />
              <div className="hero-image">
                <img
                  src={heroImage}
                  alt="Makrani Moinuddin"
                  className="hero-profile-photo"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Floating Decorative Elements ── */}
        <div className="hero-float-element hero-float-1" />
        <div className="hero-float-element hero-float-2" />
      </div>
    </section>
  );
};

export default Hero;
