import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import {
  HiCommandLine,
  HiGlobeAlt,
  HiWrench,
  HiCircleStack,
  HiChartBar,
  HiCloud,
  HiServerStack,
  HiCpuChip,
  HiPhoto,
} from 'react-icons/hi2';

const skillCategories = [
  {
    title: 'Programming',
    icon: <HiCommandLine />,
    skills: [
      { name: 'Python', percent: 85 },
      { name: 'Java', percent: 80 },
      { name: 'C', percent: 70 },
      { name: 'C++', percent: 72 },
      { name: 'SQL', percent: 78 },
    ],
  },
  {
    title: 'Web Development',
    icon: <HiGlobeAlt />,
    skills: [
      { name: 'HTML', percent: 90 },
      { name: 'CSS', percent: 85 },
      { name: 'JavaScript', percent: 82 },
      { name: 'React.js', percent: 75 },
      { name: 'Ionic', percent: 65 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: <HiWrench />,
    skills: [
      { name: 'Git', percent: 80 },
      { name: 'VS Code', percent: 90 },
      { name: 'NetBeans', percent: 70 },
      { name: 'Android Studio', percent: 68 },
      { name: 'Docker', percent: 62 },
      { name: 'Postman', percent: 75 },
    ],
  },
  {
    title: 'Database',
    icon: <HiCircleStack />,
    skills: [
      { name: 'MySQL', percent: 78 },
      { name: 'PostgreSQL', percent: 74 },
      { name: 'Supabase', percent: 72 },
      { name: 'Firebase', percent: 76 },
    ],
  },
  {
    title: 'Cloud & Big Data',
    icon: <HiCloud />,
    skills: [
      { name: 'AWS', percent: 70 },
      { name: 'Hadoop', percent: 66 },
      { name: 'Spark', percent: 68 },
    ],
  },
  {
    title: 'Computer Vision',
    icon: <HiCpuChip />,
    skills: [
      { name: 'YOLOv8', percent: 78 },
      { name: 'ArcFace', percent: 72 },
      { name: 'OpenCV', percent: 80 },
    ],
  },
  {
    title: 'Data Analytics',
    icon: <HiChartBar />,
    skills: [
      { name: 'NumPy', percent: 75 },
      { name: 'Pandas', percent: 78 },
      { name: 'EDA', percent: 72 },
      { name: 'Visualization', percent: 70 },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills & Expertise
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Technologies I work with
        </motion.p>

        <motion.div
          className="skills-grid"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, catIdx) => (
            <motion.div
              className="glass-card skill-category"
              key={catIdx}
              variants={cardVariants}
            >
              <div className="skill-category-header">
                <div className="skill-category-icon">{category.icon}</div>
                <h3 className="skill-category-title">{category.title}</h3>
              </div>

              {category.skills.map((skill, skillIdx) => (
                <div className="skill-item" key={skillIdx}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.percent}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className={`skill-bar-fill${inView ? ' animate' : ''}`}
                      style={{ width: inView ? `${skill.percent}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="contact-socials"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ marginTop: '2rem' }}
        >
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
      </div>
    </section>
  );
};

export default Skills;
