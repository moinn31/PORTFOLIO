import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── Animation Variants ── */
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ── Data ── */
const stats = [
  { number: '7+', label: 'Projects Completed' },
  { number: '1', label: 'Internship' },
  { number: '12+', label: 'Tech Skills' },
];

const orbitSkills = [
  { name: 'React',     duration: '20s', deg: 0,   radius: 132 },
  { name: 'Python',    duration: '25s', deg: 36,  radius: 134 },
  { name: 'Java',      duration: '22s', deg: 72,  radius: 162 },
  { name: 'SQL',       duration: '28s', deg: 108, radius: 162 },
  { name: 'Git',       duration: '15s', deg: 144, radius: 190 },
  { name: 'Docker',    duration: '18s', deg: 180, radius: 192 },
  { name: 'AWS',       duration: '30s', deg: 216, radius: 192 },
  { name: 'Firebase',  duration: '26s', deg: 252, radius: 164 },
  { name: 'YOLOv8',    duration: '34s', deg: 288, radius: 136 },
  { name: 'Analytics', duration: '35s', deg: 324, radius: 136 },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* ── Header ── */}
          <motion.h2 className="section-title" variants={childVariants}>
            About Me
          </motion.h2>
          <motion.p className="section-subtitle" variants={childVariants}>
            Get to know me better
          </motion.p>

          {/* ── Grid ── */}
          <div className="about-grid">
            {/* Left Column */}
            <motion.div variants={childVariants}>
              <p className="about-bio">
                Motivated Computer Science Engineering student passionate about
                building scalable web applications and solving real-world
                problems using data-driven approaches. With hands-on experience
                in full-stack development and data analytics, I strive to create
                impactful digital solutions.
              </p>

              <div className="about-stats">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="about-stat glass"
                    variants={childVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="about-stat-number">{stat.number}</div>
                    <div className="about-stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column — Orbit */}
            <motion.div variants={childVariants}>
              <div className="about-orbit-container">
                {/* Center nucleus */}
                <div className="orbit-center">SKILLS</div>

                {/* Rings */}
                <div className="orbit-ring orbit-ring-1" />
                <div className="orbit-ring orbit-ring-2" />
                <div className="orbit-ring orbit-ring-3" />

                {/* Skill tags */}
                {orbitSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="orbit-tag"
                    style={{
                      animation: `orbit ${skill.duration} linear infinite`,
                      transform: `rotate(${skill.deg}deg) translateX(${skill.radius}px) rotate(-${skill.deg}deg)`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
