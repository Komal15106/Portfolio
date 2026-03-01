import React, { useEffect, useState } from 'react';
import {
  Github,
  ExternalLink,
  Brain,
  Activity,
  DollarSign,
  Palette,
  ChevronRight,
  Code2,
  User,
  Mail,
  Bot,
  Linkedin,
  Moon,
  Sun
} from 'lucide-react';
import Tilt from 'react-parallax-tilt';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { initAudio, playSound } from './audio';
import './App.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};


const projects = [
  {
    id: 1,
    title: 'Medical Prediction App',
    description: 'A robust health assessment application running on Streamlit that allows users to select General Health or Specialist prediction modes. Analyzes input data to provide disease risk scores and actionable health recommendations.',
    tech: ['Python', 'Streamlit', 'Machine Learning', 'Pandas'],
    icon: <Activity size={24} />,
    links: { github: '#', demo: '#' },
    delay: '0.2s'
  },
  {
    id: 3,
    title: 'Currency Converter Project',
    description: 'A structured currency conversion utility designed to fetch live rates and reliably manage financial calculations across different global currencies with high precision and speed.',
    tech: ['JavaScript', 'API Integration', 'Finance'],
    icon: <DollarSign size={24} />,
    links: { github: '#', demo: '#' },
    delay: '0.6s'
  },
  {
    id: 4,
    title: 'AI Interview Prep App',
    description: 'An advanced AI-powered platform designed to simulate real-world interviews, providing dynamic feedback, customized questions, and insightful scorecards to help users ace their technical interviews.',
    tech: ['React', 'AI Integration', 'Node.js'],
    icon: <Brain size={24} />,
    links: { github: '#', demo: '#' },
    delay: '0.8s'
  },
  {
    id: 5,
    title: 'IntelliTask AI',
    description: 'A smart task management system powered by AI to automatically prioritize, categorize, and schedule daily tasks to boost productivity and workflow efficiency.',
    tech: ['React', 'AI Integration', 'Node.js'],
    icon: <Bot size={24} />,
    links: { github: '#', demo: '#' },
    delay: '1.0s'
  }
];

function App() {
  const [showEmailMenu, setShowEmailMenu] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isLightMode ? 'light' : 'dark');
  }, [isLightMode]);

  // Core Effects & Audio Mount Configuration
  useEffect(() => {
    // Universal UI Click Handler
    const handleClick = (e) => {
      initAudio(); // Must bootstrap audio context directly on user gesture
      // Only play the arcade sound if clicking on an interactive element
      if (e.target.closest('a, .btn, .project-card, .logo, button')) {
        playSound('click');
      }
    };

    // Throttled Scroll Synthesizer
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > 150) {
        playSound('scroll');
        lastScrollTime = now;
      }
    };

    // Slick Hover Effects for Buttons & Links
    const handleHover = () => playSound('hover');
    const interactables = document.querySelectorAll('a, .btn, .project-card, .logo');
    interactables.forEach(el => el.addEventListener('mouseenter', handleHover));

    // Listener Attachments
    const appContainer = document.querySelector('.app-container');
    window.addEventListener('click', handleClick);
    if (appContainer) {
      appContainer.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('click', handleClick);
      if (appContainer) {
        appContainer.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
      interactables.forEach(el => el.removeEventListener('mouseenter', handleHover));
    };
  }, []);

  return (
    <div className="app-container">

      {/* Theme Toggle */}
      <div className="theme-switcher" style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 1000 }}>
        <button
          className="theme-toggle-btn glass-panel"
          onClick={() => { setIsLightMode(!isLightMode); playSound('click'); }}
          title="Toggle Light/Dark Mode"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--accent-cyan)',
            color: 'var(--accent-cyan)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}
        >
          {isLightMode ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      {/* Hero Section */}
      <section className="hero container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="eyebrow">Creative Developer & Designer</motion.span>
          <motion.h1 variants={fadeInUp} className="hero-title">
            Crafting digital <br />
            <span className="text-gradient">experiences</span> that matter.
          </motion.h1>
          <motion.p variants={fadeInUp} className="hero-desc">
            Transforming complex problems into elegant, user-centric solutions.
            Specializing in dynamic web applications, data-driven interfaces, and modern UI/UX design.
          </motion.p>
          <motion.div variants={fadeInUp} className="hero-actions">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#about" className="btn btn-outline">
              <User size={20} /> About Me
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="btn btn-primary">
              View My Work <ChevronRight size={20} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://github.com/Komal15106" target="_blank" rel="noreferrer" className="btn btn-outline">
              <Github size={20} /> Github
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="about container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-title">About Me</h2>
        </motion.div>
        <motion.div
          className="glass-panel about-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          onViewportEnter={(e) => {
            if (e?.target && !e.target.dataset.played) {
              playSound('reveal');
              e.target.dataset.played = 'true';
            }
          }}
        >
          <div className="about-content">
            <p>
              I am a passionate developer and designer with a knack for building dynamic, scalable,
              and visually stunning digital experiences. I specialize in merging advanced technology
              like AI/ML with highly polished user interfaces.
            </p>
            <p>
              My journey in tech spans from developing robust backends to crafting intuitive product flows.
              I believe in writing clean code and creating applications that not only solve complex problems
              but also delight users through exceptional aesthetics.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          onViewportEnter={(e) => {
            if (e?.target && !e.target.dataset.played) {
              playSound('reveal');
              e.target.dataset.played = 'true';
            }
          }}
        >
          <h2 className="section-title">Works</h2>
        </motion.div>

        <motion.div
          className="grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeInUp} onViewportEnter={(e) => { if (e?.target && !e.target.dataset.played) { playSound('reveal'); e.target.dataset.played = 'true'; } }}>
              <Tilt
                className="glass-panel project-card"
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                transitionSpeed={1000}
                scale={1.02}
              >
                <div className="project-inner">
                  <motion.div
                    className="project-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.icon}
                  </motion.div>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-hover-content">
                    <div className="project-hover-inner">
                      <p className="project-desc">{project.description}</p>
                      <div className="project-tech">
                        {project.tech.map((t, i) => (
                          <span key={i} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact container">
        <motion.div
          className="contact-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          onViewportEnter={(e) => {
            if (e?.target && !e.target.dataset.played) {
              playSound('reveal');
              e.target.dataset.played = 'true';
            }
          }}
        >
          <h2 className="hero-title">Get In Touch</h2>
          <p className="contact-desc">
            Thanks for visiting! I'm currently open for new opportunities. Whether you have a project in mind, a question to ask, or just want to connect, feel free to reach out to me!
          </p>
          <div className="contact-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowEmailMenu(!showEmailMenu); playSound('click'); }}
                className="btn btn-primary"
              >
                <Mail size={20} /> Contact Me
              </motion.button>
              {showEmailMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    minWidth: '220px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    zIndex: 50
                  }}
                >
                  <a href="mailto:pandasxtexh@gmail.com" className="email-option" onClick={() => playSound('click')}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Business</span>
                    pandasxtexh@gmail.com
                  </a>
                  <div style={{ height: '1px', background: 'var(--card-border)', margin: '0.3rem 0' }}></div>
                  <a href="mailto:komalx1506@gmail.com" className="email-option" onClick={() => playSound('click')}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Personal</span>
                    komalx1506@gmail.com
                  </a>
                </motion.div>
              )}
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/komal15106"
              target="_blank" rel="noreferrer"
              className="btn btn-outline"
            >
              <Linkedin size={20} /> LinkedIn
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Komal15106"
              target="_blank" rel="noreferrer"
              className="btn btn-outline"
            >
              <Github size={20} /> GitHub
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="footer container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <p>© {new Date().getFullYear()} Komal. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--card-border)' }}>Built with React & Vite & Framer Motion</p>
      </motion.footer>
    </div>
  );
}

export default App;
