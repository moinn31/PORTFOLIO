import React from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi2';

const experienceData = [
  {
    date: 'MAY 2025 — JUL 2025',
    title: 'Digital & Analytics Intern',
    company: 'CEAT Limited',
    tasks: [
      'Claim Report Digitization — Transformed manual claim processes into streamlined digital workflows',
      'Workflow Automation — Automated repetitive tasks to improve operational efficiency',
      'Dashboard Development & Reporting — Built interactive dashboards for data-driven decision making',
    ],
  },
];

const timelineVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          My professional journey
        </motion.p>

        <div className="timeline">
          {experienceData.map((exp, idx) => (
            <motion.div
              className="timeline-item"
              key={idx}
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="timeline-dot" />
              <div className="glass-card timeline-card">
                <span className="timeline-date">{exp.date}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <p className="timeline-company">{exp.company}</p>
                <div className="timeline-tasks">
                  {exp.tasks.map((task, taskIdx) => (
                    <div className="timeline-task" key={taskIdx}>
                      <span className="timeline-task-icon">
                        <HiCheck />
                      </span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
