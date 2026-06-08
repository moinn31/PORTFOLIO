import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VanillaTilt from 'vanilla-tilt';
import {
  HiRocketLaunch,
  HiCpuChip,
  HiHeart,
  HiShieldCheck,
  HiCodeBracket,
  HiArrowTopRightOnSquare,
} from 'react-icons/hi2';

const projects = [
  {
    title: 'KAFE 01',
    desc: 'A full-stack web application for cafe management with modern UI and real-time features.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express'],
    github: '#',
    live: 'https://kafe-01.vercel.app/',
    icon: HiRocketLaunch,
  },
  {
    title: 'Smart Attendance System',
    desc: 'AI-powered attendance tracking using facial recognition for educational institutions.',
    tags: ['Python', 'OpenCV', 'Machine Learning', 'Flask'],
    github: '#',
    live: null,
    icon: HiCpuChip,
  },
  {
    title: 'Pet Fest Hub',
    desc: 'A comprehensive pet festival management platform with event scheduling and registrations.',
    tags: ['Java', 'MySQL', 'JDBC', 'Swing'],
    github: '#',
    live: null,
    icon: HiHeart,
  },
  {
    title: 'SecureVoteChain',
    desc: 'Blockchain-based secure e-voting system ensuring transparency and tamper-proof elections.',
    tags: ['Blockchain', 'Solidity', 'React', 'Web3'],
    github: '#',
    live: null,
    icon: HiShieldCheck,
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
