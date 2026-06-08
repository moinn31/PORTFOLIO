import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiArrowTrendingUp,
  HiChartBar,
  HiTableCells,
  HiCalculator,
  HiBeaker,
  HiPresentationChartBar,
  HiCircleStack,
  HiDocumentChartBar,
} from 'react-icons/hi2';

const metrics = [
  { label: 'Data Points Analyzed', value: '50K+', change: '+12.5%' },
  { label: 'Models Built', value: '15+', change: '+8.3%' },
  { label: 'Dashboards Created', value: '10+', change: '+15.2%' },
];

const skills = [
  { name: 'Python', percent: 85 },
  { name: 'NumPy', percent: 75 },
  { name: 'Pandas', percent: 78 },
  { name: 'SQL', percent: 78 },
  { name: 'EDA', percent: 72 },
  { name: 'Viz', percent: 70 },
  { name: 'Excel', percent: 80 },
  { name: 'Stats', percent: 74 },
];

const toolChips = [
  { name: 'NumPy', icon: HiCalculator },
  { name: 'Pandas', icon: HiTableCells },
  { name: 'Matplotlib', icon: HiChartBar },
  { name: 'Seaborn', icon: HiPresentationChartBar },
  { name: 'Jupyter', icon: HiBeaker },
  { name: 'SQL', icon: HiCircleStack },
  { name: 'Excel', icon: HiDocumentChartBar },
  { name: 'Power BI', icon: HiPresentationChartBar },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const Analytics = () => {
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [chartRef, chartInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    if (chartInView) {
      const timer = setTimeout(() => setAnimateBars(true), 200);
      return () => clearTimeout(timer);
    }
  }, [chartInView]);

  return (
    <section id="analytics" className="section">
      <div className="container" ref={sectionRef}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Analytics Dashboard
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Visualizing my data analytics expertise
        </motion.p>

        {/* Metric Cards */}
        <motion.div
          className="analytics-grid"
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="analytics-card glass-card"
            >
              <div className="analytics-card-header">
                <span className="analytics-card-title">{metric.label}</span>
              </div>
              <div className="analytics-card-value">{metric.value}</div>
              <div className="analytics-card-change">
                <HiArrowTrendingUp /> {metric.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          className="analytics-chart-container glass-card"
          ref={chartRef}
          initial={{ opacity: 0, y: 40 }}
          animate={chartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '28px' }}>
            Skill Proficiency Overview
          </h3>
          <div className="chart-bar-group">
            {skills.map((skill) => (
              <div key={skill.name} className="chart-bar-wrapper">
                <div
                  className="chart-bar"
                  style={{
                    height: animateBars ? `${(skill.percent / 100) * 200}px` : '0px',
                  }}
                >
                  <span className="chart-bar-value">{skill.percent}%</span>
                </div>
                <span className="chart-bar-label">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools Chips */}
        <motion.div
          className="glass-card"
          style={{ marginTop: '32px', padding: '32px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '28px' }}>
            Core Analytics Tools
          </h3>
          <div className="analytics-skills-grid">
            {toolChips.map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  className="analytics-skill-chip"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="analytics-skill-icon">
                    <Icon />
                  </span>
                  <span className="analytics-skill-name">{tool.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;
