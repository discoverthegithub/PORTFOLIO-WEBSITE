import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import profileImage from '../assets/images/tayyab-profile.jpg'

/* ── Custom useInView Hook ── */
const useCustomInView = (options = {}) => {
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    if (options.once) observer.unobserve(element)
                }
            },
            { rootMargin: options.margin || '0px', threshold: 0.1 }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [options.once, options.margin])

    return [ref, isInView]
}

/* ── Typewriter Hook ── */
const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) => {
    const [text, setText] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentWord = words[wordIndex]
        let timeout

        if (!isDeleting && text === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), pauseTime)
        } else if (isDeleting && text === '') {
            setIsDeleting(false)
            setWordIndex((prev) => (prev + 1) % words.length)
        } else {
            timeout = setTimeout(() => {
                setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)))
            }, isDeleting ? deletingSpeed : typingSpeed)
        }

        return () => clearTimeout(timeout)
    }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

    return text
}

/* ── Particle Canvas ── */
const ParticleCanvas = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationId
        let particles = []
        let mouse = { x: undefined, y: undefined }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const handleMouse = (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }
        window.addEventListener('mousemove', handleMouse)

        class Particle {
            constructor() {
                this.reset()
            }
            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 2.5 + 0.5
                this.speedX = (Math.random() - 0.5) * 0.5
                this.speedY = (Math.random() - 0.5) * 0.5
                this.opacity = Math.random() * 0.5 + 0.1
                this.hue = [239, 270, 200, 320][Math.floor(Math.random() * 4)]
                this.pulse = Math.random() * Math.PI * 2
            }
            update() {
                this.x += this.speedX
                this.y += this.speedY
                this.pulse += 0.02

                if (mouse.x !== undefined) {
                    const dx = mouse.x - this.x
                    const dy = mouse.y - this.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 150) {
                        this.x -= dx * 0.015
                        this.y -= dy * 0.015
                        this.opacity = Math.min(this.opacity + 0.03, 0.9)
                    }
                }

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset()
                }
            }
            draw() {
                const glow = Math.sin(this.pulse) * 0.3 + 0.7
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size * glow, 0, Math.PI * 2)
                ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity * glow})`
                ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, 0.6)`
                ctx.shadowBlur = 15
                ctx.fill()
                ctx.shadowBlur = 0
            }
        }

        const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 150)
        for (let i = 0; i < count; i++) particles.push(new Particle())

        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 120)})`
                        ctx.lineWidth = 0.6
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => { p.update(); p.draw() })
            connectParticles()
            animationId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouse)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}

/* ── Animated Counter ── */
const AnimatedCounter = ({ target, label, suffix = '', icon }) => {
    const [count, setCount] = useState(0)
    const [ref, isInView] = useCustomInView({ once: true, margin: '-50px' })

    useEffect(() => {
        if (!isInView) return
        let start = 0
        const duration = 2000
        const startTime = Date.now()
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress >= 1) clearInterval(timer)
        }, 16)
        return () => clearInterval(timer)
    }, [isInView, target])

    return (
        <motion.div
            ref={ref}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
        >
            <div className="stat-icon-wrapper">{icon}</div>
            <div className="stat-number">
                {count}{suffix}
            </div>
            <div className="stat-label">{label}</div>
            <div className="stat-glow" />
        </motion.div>
    )
}

/* ── Magnetic Button ── */
const MagneticButton = ({ children, className, ...props }) => {
    const btnRef = useRef(null)

    const handleMouseMove = (e) => {
        const btn = btnRef.current
        if (!btn) return
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    }

    const handleMouseLeave = () => {
        const btn = btnRef.current
        if (!btn) return
        btn.style.transform = 'translate(0, 0)'
        btn.style.transition = 'transform 0.3s ease'
    }

    return (
        <div
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block', transition: 'transform 0.1s ease' }}
        >
            {props.to ? (
                <NavLink to={props.to} className={className}>{children}</NavLink>
            ) : props.href ? (
                <a href={props.href} onClick={props.onClick} className={className}>{children}</a>
            ) : null}
        </div>
    )
}


/* ── Tech Icons ── */
const techIcons = [
    { label: 'React', emoji: '⚛️', color: '#61dafb' },
    { label: 'Node.js', emoji: '🟢', color: '#68a063' },
    { label: 'Python', emoji: '🐍', color: '#3776ab' },
    { label: 'AI/ML', emoji: '🤖', color: '#ff6b6b' },
    { label: 'MongoDB', emoji: '🍃', color: '#47a248' },
    { label: 'TypeScript', emoji: '📘', color: '#3178c6' },
]

/* ── Interest Cards Data ── */
const interests = [
    { emoji: '🌐', title: 'Web Development', desc: 'Building full-stack applications with modern frameworks' },
    { emoji: '🤖', title: 'Artificial Intelligence', desc: 'Exploring NLP, LLMs, and transformer architectures' },
    { emoji: '📊', title: 'Machine Learning', desc: 'Training models for real-world problem solving' },
    { emoji: '🔗', title: 'Blockchain', desc: 'Decentralized solutions for transparency & security' },
]

const Home = () => {
    const [showEmailPopup, setShowEmailPopup] = useState(false)
    const heroRef = useRef(null)
    const typedText = useTypewriter([
        'Full Stack Developer',
        'AI/ML Enthusiast',
        'MERN Stack Expert',
        'NLP Researcher',
        'Problem Solver',
    ], 90, 50, 2200)

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
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
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
                            <div style={{
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                                pointerEvents: 'none'
                            }} />

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

            {/* ═══════════ HERO SECTION ═══════════ */}
            <section className="hero" ref={heroRef}>
                <ParticleCanvas />

                {/* Decorative gradient orbs */}
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-orb hero-orb-3" />

                {/* Animated mesh gradient */}
                <div className="hero-mesh-gradient" />

                <div className="container">
                    <motion.div
                        className="hero-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div className="hero-text" variants={itemVariants}>
                            <motion.div
                                className="hero-badge"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                            >
                                <span className="hero-badge-dot" />
                                Available for opportunities
                            </motion.div>

                            <h1>
                                Hi, I'm
                                <span className="name">Muhammad Tayyab</span>
                            </h1>

                            <p className="subtitle">
                                <span className="typed-text">{typedText}</span>
                                <span className="typed-cursor">|</span>
                            </p>

                            <p className="description">
                                Final year Computer Science student at FAST NUCES, Lahore.
                                Passionate about building innovative web applications and exploring
                                the frontiers of Artificial Intelligence, Natural Language Processing,
                                and Machine Learning. Transforming ideas into elegant, scalable solutions.
                            </p>

                            <div className="hero-buttons">
                                <MagneticButton to="/projects" className="btn btn-primary">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                    </svg>
                                    View Projects
                                </MagneticButton>
                                <MagneticButton href="#contact" onClick={scrollToContact} className="btn btn-secondary">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    Contact Me
                                </MagneticButton>
                            </div>

                            {/* Tech stack pills */}
                            <motion.div
                                className="hero-tech-stack"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                            >
                                {techIcons.map((tech, i) => (
                                    <motion.span
                                        key={tech.label}
                                        className="tech-pill"
                                        whileHover={{ scale: 1.1, y: -3, boxShadow: `0 8px 25px ${tech.color}33` }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1.1 + i * 0.08 }}
                                    >
                                        <span>{tech.emoji}</span>
                                        {tech.label}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div className="hero-image" variants={itemVariants}>
                            <div className="profile-image-container">
                                <div className="profile-ring" />
                                <div className="profile-ring profile-ring-2" />

                                <motion.div
                                    className="floating-badge"
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    🎓 FAST NUCES
                                </motion.div>
                                <motion.div
                                    className="floating-badge"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                                >
                                    💻 Full Stack
                                </motion.div>
                                <motion.div
                                    className="floating-badge"
                                    animate={{ y: [0, -14, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
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

                {/* Scroll indicator */}
                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                    </motion.div>
                    <span>Scroll to explore</span>
                </motion.div>
            </section>

            {/* ═══════════ STATS SECTION ═══════════ */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <AnimatedCounter target={10} label="Projects Built" suffix="+"
                            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>} />
                        <AnimatedCounter target={5} label="Technologies" suffix="+"
                            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>} />
                        <AnimatedCounter target={4} label="Years Coding" suffix="+"
                            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>} />
                        <AnimatedCounter target={3} label="AI/ML Projects" suffix="+"
                            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" /></svg>} />
                    </div>
                </div>
            </section>

            {/* ═══════════ ABOUT SECTION ═══════════ */}
            <section className="section" id="about">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-header"
                    >
                        <span className="section-tag">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            About Me
                        </span>
                        <h2 className="section-title">Know Me Better</h2>
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
                            <div className="card-corner-glow" />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="icon-box icon-box-indigo">
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
                            <div className="card-corner-glow card-corner-glow-cyan" />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="icon-box icon-box-cyan">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                </div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Education</h3>
                            </div>

                            {/* Timeline style education */}
                            <div className="education-timeline">
                                <div className="timeline-item">
                                    <div className="timeline-dot" />
                                    <div className="timeline-content">
                                        <div className="timeline-card">
                                            <div className="icon-box icon-box-sm icon-box-indigo">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                    <polyline points="9 22 9 12 15 12 15 22" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '600', marginBottom: '0.25rem' }}>Bachelor of Science in Computer Science</h4>
                                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>FAST National University (NUCES), Lahore</p>
                                                <span className="timeline-badge timeline-badge-accent">Final Semester • 2022 - 2026</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot timeline-dot-cyan" />
                                    <div className="timeline-content">
                                        <div className="timeline-card">
                                            <div className="icon-box icon-box-sm icon-box-cyan">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '600', marginBottom: '0.25rem' }}>Intermediate (FSc Pre-Engineering)</h4>
                                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>KIPS College, Lahore</p>
                                                <span className="timeline-badge timeline-badge-cyan">Completed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Interest Cards */}
                    <motion.div
                        className="interests-grid"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{ marginTop: '3rem' }}
                    >
                        {interests.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="glass-card interest-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                <div className="interest-emoji">{item.emoji}</div>
                                <h4 className="interest-title">{item.title}</h4>
                                <p className="interest-desc">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ CONTACT SECTION ═══════════ */}
            <section className="section" id="contact">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-header"
                    >
                        <span className="section-tag">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            Contact
                        </span>
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
                            {[
                                {
                                    icon: (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    ),
                                    title: 'Email',
                                    value: 'tayyabshabaz1234@gmail.com',
                                    isLink: true,
                                    href: 'mailto:tayyabshabaz1234@gmail.com'
                                },
                                {
                                    icon: (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    ),
                                    title: 'Location',
                                    value: 'Lahore, Pakistan',
                                    isLink: false
                                },
                                {
                                    icon: (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                    ),
                                    title: 'University',
                                    value: 'FAST NUCES, Lahore',
                                    isLink: false
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    className="glass-card contact-card"
                                    style={{ padding: '1.25rem' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 5, boxShadow: '0 0 30px rgba(99, 102, 241, 0.15)' }}
                                >
                                    <div className="icon-box icon-box-indigo">{item.icon}</div>
                                    <div className="contact-details">
                                        <h4>{item.title}</h4>
                                        {item.isLink ? (
                                            <a href={item.href}>{item.value}</a>
                                        ) : (
                                            <p>{item.value}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="glass-card connect-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                                <div className="card-corner-glow" />
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
                                    className="btn btn-primary resume-btn"
                                    style={{
                                        marginTop: '1.5rem',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Download My Resume
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
