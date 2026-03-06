import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import profileImage from '../assets/images/tayyab-profile.jpg'

const Home = () => {
    const [showEmailPopup, setShowEmailPopup] = useState(false)

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    }

    const scrollToContact = (e) => {
        e.preventDefault()
        const contactSection = document.getElementById('contact')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleEmailClick = (e) => {
        e.preventDefault()
        setShowEmailPopup(true)
    }

    const closeEmailPopup = () => {
        setShowEmailPopup(false)
    }

    const copyEmail = () => {
        navigator.clipboard.writeText('tayyabshabaz1234@gmail.com')
        alert('Email copied to clipboard!')
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
        >
            {/* Email Popup */}
            <AnimatePresence>
                {showEmailPopup && (
                    <motion.div
                        className="email-popup-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeEmailPopup}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'linear-gradient(145deg, rgba(26, 26, 37, 0.95) 0%, rgba(15, 15, 25, 0.98) 100%)',
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                borderRadius: '24px',
                                padding: '2.5rem',
                                maxWidth: '380px',
                                width: '90%',
                                textAlign: 'center',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(99, 102, 241, 0.15)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Glow effect */}
                            <div style={{
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                                pointerEvents: 'none'
                            }} />

                            {/* Close button */}
                            <button
                                onClick={closeEmailPopup}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'var(--color-text-muted)',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                                    e.target.style.color = 'var(--color-text-primary)'
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                                    e.target.style.color = 'var(--color-text-muted)'
                                }}
                            >
                                ✕
                            </button>

                            {/* Gmail Icon with glow */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: 'spring', damping: 15 }}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #EA4335 0%, #FBBC05 33%, #34A853 66%, #4285F4 100%)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    boxShadow: '0 10px 40px rgba(234, 67, 53, 0.3), 0 0 30px rgba(66, 133, 244, 0.2)',
                                    position: 'relative'
                                }}
                            >
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                                </svg>
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    marginBottom: '0.75rem',
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                Let's Connect!
                            </motion.h3>

                            {/* Email display */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                    borderRadius: '12px',
                                    padding: '1rem 1.5rem',
                                    marginBottom: '1.5rem'
                                }}
                            >
                                <p style={{
                                    color: '#a5b4fc',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    fontFamily: 'monospace',
                                    letterSpacing: '0.5px'
                                }}>
                                    tayyabshabaz1234@gmail.com
                                </p>
                            </motion.div>

                            {/* Copy button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                onClick={copyEmail}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: '1rem 2rem',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontFamily: 'Outfit, sans-serif',
                                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                Copy Email Address
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div className="hero-text" variants={itemVariants}>
                            <h1>
                                Hi, I'm
                                <span className="name">Muhammad Tayyab</span>
                            </h1>
                            <p className="subtitle">
                                Full Stack Developer & AI/ML Enthusiast
                            </p>
                            <p className="description">
                                Final year Computer Science student at FAST NUCES, Lahore.
                                Passionate about building innovative web applications and exploring
                                the frontiers of Artificial Intelligence, Natural Language Processing,
                                and Machine Learning. Transforming ideas into elegant, scalable solutions.
                            </p>
                            <div className="hero-buttons">
                                <NavLink to="/projects" className="btn btn-primary">
                                    View Projects
                                </NavLink>
                                <a href="#contact" onClick={scrollToContact} className="btn btn-secondary">
                                    Contact Me
                                </a>
                            </div>
                        </motion.div>

                        <motion.div className="hero-image" variants={itemVariants}>
                            <div className="profile-image-container">
                                <motion.div
                                    className="floating-badge"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    🎓 FAST NUCES
                                </motion.div>
                                <motion.div
                                    className="floating-badge"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                >
                                    💻 Full Stack
                                </motion.div>
                                <motion.div
                                    className="floating-badge"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                >
                                    🤖 AI/ML
                                </motion.div>
                                <img
                                    src={profileImage}
                                    alt="Muhammad Tayyab"
                                    className="profile-image"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="section" id="about">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">About Me</h2>
                        <p className="section-subtitle">
                            Get to know more about my journey, education, and what drives me.
                        </p>
                    </motion.div>

                    <div className="about-grid" style={{ marginTop: '3rem' }}>
                        <motion.div
                            className="glass-card about-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
                        >
                            {/* Background glow */}
                            <div style={{
                                position: 'absolute',
                                top: '-20%',
                                right: '-20%',
                                width: '200px',
                                height: '200px',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                filter: 'blur(80px)',
                                opacity: 0.15,
                                borderRadius: '50%'
                            }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Who I Am</h3>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                                I'm a passionate Computer Science student in my final semester at
                                FAST National University of Computer and Emerging Sciences (NUCES),
                                Lahore - one of Pakistan's premier universities for technology education.
                            </p>
                            <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                                Originally from Lahore, I've cultivated a deep interest in web development,
                                artificial intelligence, and creating solutions that make a real impact.
                                My journey in tech has been driven by curiosity and a desire to build
                                applications that solve real-world problems.
                            </p>
                            <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                                I specialize in MERN stack development and have extensive experience with
                                LLM fine-tuning, NLP, and building intelligent applications. I believe in
                                writing clean, maintainable code and creating user experiences that delight.
                            </p>
                        </motion.div>

                        <motion.div
                            className="glass-card about-card"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
                        >
                            {/* Background glow */}
                            <div style={{
                                position: 'absolute',
                                top: '-20%',
                                left: '-20%',
                                width: '200px',
                                height: '200px',
                                background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
                                filter: 'blur(80px)',
                                opacity: 0.15,
                                borderRadius: '50%'
                            }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 20px rgba(34, 211, 238, 0.3)'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                </div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Education</h3>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                padding: '1.25rem',
                                background: 'rgba(99, 102, 241, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(99, 102, 241, 0.1)',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '600', marginBottom: '0.25rem' }}>Bachelor of Science in Computer Science</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>FAST National University (NUCES), Lahore</p>
                                    <p style={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: '500' }}>Final Semester • 2022 - 2026</p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                padding: '1.25rem',
                                background: 'rgba(34, 211, 238, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(34, 211, 238, 0.1)'
                            }}>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '600', marginBottom: '0.25rem' }}>Intermediate (FSc Pre-Engineering)</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>KIPS College, Lahore</p>
                                    <p style={{ color: '#22d3ee', fontSize: '0.85rem', fontWeight: '500' }}>Completed</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section" id="contact">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Get In Touch</h2>
                        <p className="section-subtitle">
                            Feel free to reach out for collaborations, opportunities, or just a friendly chat!
                        </p>
                    </motion.div>

                    <div className="contact-content" style={{ marginTop: '3rem' }}>
                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="glass-card contact-card" style={{ padding: '1.25rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div className="contact-details">
                                    <h4>Email</h4>
                                    <a href="mailto:tayyabshabaz1234@gmail.com">tayyabshabaz1234@gmail.com</a>
                                </div>
                            </div>

                            <div className="glass-card contact-card" style={{ padding: '1.25rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div className="contact-details">
                                    <h4>Location</h4>
                                    <p>Lahore, Pakistan</p>
                                </div>
                            </div>

                            <div className="glass-card contact-card" style={{ padding: '1.25rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                    </svg>
                                </div>
                                <div className="contact-details">
                                    <h4>University</h4>
                                    <p>FAST NUCES, Lahore</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                                    Connect With Me
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                </p>

                                <div className="social-links">
                                    <a
                                        href="http://linkedin.com/in/muhammad-tayyab-97059826b"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link linkedin"
                                        title="LinkedIn"
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/t_a_y_y_y_a_b"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link instagram"
                                        title="Instagram"
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                    <button
                                        onClick={handleEmailClick}
                                        className="social-link gmail"
                                        title="Email"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                                        </svg>
                                    </button>
                                </div>

                                <a
                                    href="/resume.pdf"
                                    download="Muhammad_Tayyab_Resume.pdf"
                                    className="btn btn-primary"
                                    style={{
                                        marginTop: '1.5rem',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    ⬇️ Download My Resume
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Home
