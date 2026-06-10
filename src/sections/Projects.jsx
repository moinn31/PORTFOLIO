import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VanillaTilt from 'vanilla-tilt';
import {
  HiCodeBracket,
  HiArrowTopRightOnSquare,
  HiExclamationTriangle,
} from 'react-icons/hi2';
import { githubProjectOverrides, githubUsername } from '../data/profileData';

const fallbackProjects = Object.entries(githubProjectOverrides).map(([repoName, override]) => ({
  title: repoName.replace(/-/g, ' '),
  repoName,
  desc: override.description,
  tags: override.tags,
  github: `https://github.com/${githubUsername}/${repoName}`,
  live: override.live || null,
  language: override.tags[0] || 'GitHub',
  isFallback: true,
}));

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadProjects = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=pushed`,
          {
            signal: controller.signal,
            headers: {
              Accept: 'application/vnd.github+json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Unable to load GitHub projects right now.')
        }

        const repos = await response.json();
        const mappedProjects = repos
          .filter((repo) => !repo.fork && !repo.archived)
          .map((repo) => {
            const override = githubProjectOverrides[repo.name] || {}
            const tags = override.tags || [repo.language || 'GitHub']

            return {
              title: repo.name.replace(/-/g, ' '),
              repoName: repo.name,
              desc: override.description || repo.description || 'GitHub repository automatically pulled into the portfolio.',
              tags: [...tags.slice(0, 3), repo.language].filter(Boolean).slice(0, 4),
              github: repo.html_url,
              live: override.live || repo.homepage || null,
              language: repo.language || 'GitHub',
              stars: repo.stargazers_count,
              updatedAt: repo.pushed_at,
              isFallback: false,
            }
          })
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

        setProjects(mappedProjects.length ? mappedProjects : fallbackProjects)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setProjects(fallbackProjects)
          setError('Live GitHub sync is unavailable right now, so the portfolio is showing your curated project list.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProjects()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!inView || projects.length === 0) {
      return undefined
    }

    tiltRefs.current.forEach((el) => {
      if (el) {
        VanillaTilt.init(el, {
          max: 8,
          speed: 300,
          glare: true,
          'max-glare': 0.15,
          scale: 1.02,
        })
      }
    })

    return () => {
      tiltRefs.current.forEach((el) => {
        if (el && el.vanillaTilt) {
          el.vanillaTilt.destroy()
        }
      })
    }
  }, [inView, projects]);

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
          Things I have built. New GitHub repositories appear here automatically.
        </motion.p>

        {error && (
          <div className="portfolio-sync-note">
            <HiExclamationTriangle />
            <span>{error}</span>
          </div>
        )}

        {loading && <div className="portfolio-sync-loading">Syncing public GitHub repositories...</div>}

        <motion.div
          className="projects-grid"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => {
            const Icon = HiCodeBracket;
            return (
              <motion.div
                key={project.repoName || project.title}
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
