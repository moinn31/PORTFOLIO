import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VanillaTilt from 'vanilla-tilt';
import {
  HiRocketLaunch,
  HiCpuChip,
  HiHeart,
  HiShieldCheck,
  HiDocumentText,
  HiCodeBracket,
  HiArrowTopRightOnSquare,
} from 'react-icons/hi2';

const projects = [
  {
    title: 'KAFE-01',
    desc: 'A modern cafe management web app with a polished interface and full-stack architecture.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/moinn31/KAFE-01',
    live: 'https://kafe-01.vercel.app/',
    icon: HiRocketLaunch,
  },
  {
    title: 'Attendance Tracking System',
    desc: 'An attendance system built to streamline tracking and management for classroom use.',
    tags: ['Python', 'OpenCV', 'Machine Learning', 'Flask'],
    github: 'https://github.com/moinn31/ATTENDANCE-TRACKING-SYSTEM',
    live: null,
    icon: HiCpuChip,
  },
  {
    title: 'Pet Event Management',
    desc: 'A Java Swing desktop application for organizing pet events, registrations, and scheduling.',
    tags: ['Java', 'MySQL', 'JDBC', 'Swing'],
    github: 'https://github.com/moinn31/PetEventManagement',
    live: null,
    icon: HiHeart,
  },
  {
    title: 'SecureVoteChain',
    desc: 'Blockchain-based secure e-voting system ensuring transparency and tamper-proof elections.',
    tags: ['Blockchain', 'Solidity', 'React', 'Web3'],
    github: 'https://github.com/moinn31/SecureVoteChain',
    live: null,
    icon: HiShieldCheck,
  },
  {
    title: 'Vegetable Variety Classifier AI',
    desc: 'A machine learning project for classifying vegetable varieties from images with AI workflows.',
    tags: ['Python', 'Machine Learning', 'Image Classification', 'AI'],
    github: 'https://github.com/moinn31/Vegetable-Variety-Classifier-AI',
    live: null,
    icon: HiDocumentText,
  },
  {
    title: 'Simple HTML Page',
    desc: 'A lightweight static website focused on clean structure, responsive layout, and fast delivery.',
    tags: ['HTML', 'CSS', 'Responsive Design'],
    github: 'https://github.com/moinn31/simple-html-page',
    live: null,
    icon: HiCodeBracket,
  },
  {
    title: 'Portfolio Website',
    desc: 'This portfolio itself, designed to present projects, skills, and contact details in one place.',
    tags: ['React', 'Vite', 'Framer Motion'],
    github: 'https://github.com/moinn31/PORTFOLIO',
    live: null,
    icon: HiRocketLaunch,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const tiltRefs = useRef([]);

  useEffect(() => {
    if (inView) {
      tiltRefs.current.forEach((el) => {
        if (el) {
          VanillaTilt.init(el, {
            max: 8,
            speed: 300,
            glare: true,
            'max-glare': 0.15,
            scale: 1.02,
          });
        }
      });
    }

    return () => {
      tiltRefs.current.forEach((el) => {
        if (el && el.vanillaTilt) {
          el.vanillaTilt.destroy();
        }
      });
    };
  }, [inView]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Things I have built
        </motion.p>

        <motion.div
          className="projects-grid"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className="project-card"
                ref={(el) => (tiltRefs.current[index] = el)}
              >
                <div className="project-image">
                  <span className="project-image-icon">
                    <Icon />
                  </span>
                </div>
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a
                      href={project.github}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <HiCodeBracket /> GitHub
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <HiArrowTopRightOnSquare /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
