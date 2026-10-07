import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMicrophone, FaBriefcase, FaTrophy, FaGraduationCap, FaRobot, FaBrain, FaLaptopCode, FaLink } from 'react-icons/fa'

/* ── Animated Counter ── */
const CountUp = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [started])

    useEffect(() => {
        if (!started) return
        const num = parseInt(target)
        if (isNaN(num)) { setCount(target); return }
        const duration = 1500
        const start = Date.now()
        const timer = setInterval(() => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * num))
            if (progress >= 1) clearInterval(timer)
        }, 16)
        return () => clearInterval(timer)
    }, [started, target])

    return <span ref={ref}>{count}{suffix}</span>
}

const Achievements = () => {
    const [activeCategory, setActiveCategory] = useState(null)
    const [hoveredCard, setHoveredCard] = useState(null)

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    const categoryMeta = {
        "Event Management & Leadership": {
            gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            accentColor: '#6366f1',
            emoji: '🎤',
            bgGlow: 'rgba(99, 102, 241, 0.08)',
        },
        "Academic Excellence": {
            gradient: "linear-gradient(135deg, #22d3ee, #06b6d4)",
            accentColor: '#22d3ee',
            emoji: '🎓',
            bgGlow: 'rgba(34, 211, 238, 0.08)',
        },
        "Technical Achievements": {
            gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
            accentColor: '#f59e0b',
            emoji: '⚡',
            bgGlow: 'rgba(245, 158, 11, 0.08)',
        }
    }

    const achievements = [
        {
            category: "Event Management & Leadership",
            items: [
                {
                    title: "TEDx FAST 2025 - Management Team",
                    description: "Participated in organizing and managing TEDx event at FAST NUCES, coordinating with speakers, attendees, and ensuring smooth event execution.",
                    icon: <FaMicrophone size={22} />,
                    year: "2025",
                    impact: "500+ Attendees"
                },
                {
                    title: "FAST Job Fair 2025 - Management Team",
                    description: "Actively contributed to the management of Job Fair 2025, helping connect students with potential employers and facilitating career opportunities.",
                    icon: <FaBriefcase size={22} />,
                    year: "2025",
                    impact: "30+ Companies"
                },
                {
                    title: "FAST Job Fair 2023 - Management Team",
                    description: "Part of the organizing committee for Job Fair 2023, managing logistics and ensuring successful execution of the event.",
                    icon: <FaBriefcase size={22} />,
                    year: "2023",
                    impact: "Career Networking"
                },
                {
                    title: "FAST Daira - Management Committee",
                    description: "Participated in managing FAST Daira - the flagship national olympiad of the university. Coordinated with participants from different universities across Pakistan for gaming and coding competitions.",
                    icon: <FaTrophy size={22} />,
                    year: "2024",
                    impact: "National Event"
                }
            ]
        },
        {
            category: "Academic Excellence",
            items: [
                {
                    title: "FAST NUCES - Computer Science",
                    description: "Pursuing Bachelor's degree in Computer Science from one of Pakistan's most prestigious universities for technology education.",
                    icon: <FaGraduationCap size={22} />,
                    year: "2022-2026",
                    impact: "Top University"
                },
                {
                    title: "Final Year Project - Smart Scrum Assistant",
                    description: "Leading an innovative FYP integrating AI/ML with project management, demonstrating practical application of LLM fine-tuning and NLP.",
                    icon: <FaRobot size={22} />,
                    year: "2025-2026",
                    impact: "AI-Powered FYP"
                }
            ]
        },
        {
            category: "Technical Achievements",
            items: [
                {
                    title: "AI/ML Model Development",
                    description: "Developed multiple ML models including sentiment analysis, chatbots, and sentence completion systems using transformer architectures and LLM fine-tuning.",
                    icon: <FaBrain size={22} />,
                    year: "2024-2025",
                    impact: "Multiple Models"
                },
                {
                    title: "Full Stack Web Development",
                    description: "Built multiple full-stack applications including MedCom, Decentralized Asset Receiver, and other web platforms using MERN stack.",
                    icon: <FaLaptopCode size={22} />,
                    year: "2023-2025",
                    impact: "7+ Applications"
                },
                {
                    title: "Blockchain Integration Planning",
                    description: "Designed architecture for blockchain integration in the Decentralized Asset Receiver project for enhanced transparency and security.",
                    icon: <FaLink size={22} />,
                    year: "2025",
                    impact: "Innovation"
                }
            ]
        }
    ]

    const stats = [
        { number: 7, label: 'Projects Completed', suffix: '+', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', icon: '💻' },
        { number: 4, label: 'Events Managed', suffix: '+', gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)', icon: '🎯' },
        { number: 4, label: 'Years at FAST', suffix: '', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', icon: '🎓' },
        { number: 11, label: 'Achievements', suffix: '', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', icon: '🏆' },
    ]

    const totalAchievements = achievements.reduce((acc, s) => acc + s.items.length, 0)

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
        >
            <section className="section" style={{ paddingTop: '120px' }}>
                <div className="container">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="section-header"
                        style={{ textAlign: 'center' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                            style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                        >
                            🏆
                        </motion.div>
                        <span className="section-tag" style={{ margin: '0 auto 1rem' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            Milestones
                        </span>
                        <h1 className="section-title" style={{ textAlign: 'center' }}>Beyond Success: My Triumphs</h1>
                        <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
                            Each milestone reflects not just achievement, but a relentless pursuit of
                            excellence and a commitment to surpassing expectations.
                        </p>
                    </motion.div>

                    {/* Stats bar */}
                    <motion.div
                        className="achievement-stats-bar"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="achievement-stat-item"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                whileHover={{ scale: 1.08, y: -4 }}
                            >
                                <span className="achievement-stat-icon">{stat.icon}</span>
                                <div className="achievement-stat-number" style={{
                                    background: stat.gradient,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    <CountUp target={stat.number} suffix={stat.suffix} />
                                </div>
                                <p className="achievement-stat-label">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Achievement categories */}
                    <div style={{ marginTop: '3rem' }}>
                        {achievements.map((section, sectionIndex) => {
                            const meta = categoryMeta[section.category]
                            return (
                                <motion.div
                                    key={section.category}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: sectionIndex * 0.15 }}
                                    style={{ marginBottom: '3rem' }}
                                >
                                    {/* Category header */}
                                    <motion.div
                                        className="achievement-category-header"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.div
                                            className="achievement-category-icon"
                                            style={{ background: meta.gradient }}
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                        >
                                            <span>{meta.emoji}</span>
                                        </motion.div>
                                        <h2 className="achievement-category-title">{section.category}</h2>
                                        <span className="achievement-category-count">{section.items.length} items</span>
                                        <div className="achievement-category-line" style={{ background: meta.gradient }} />
                                    </motion.div>

                                    <div className="achievements-grid">
                                        {section.items.map((item, itemIndex) => (
                                            <motion.div
                                                key={item.title}
                                                className="glass-card achievement-card-enhanced"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: sectionIndex * 0.15 + itemIndex * 0.1
                                                }}
                                                whileHover={{
                                                    y: -8,
                                                    transition: { duration: 0.25 },
                                                }}
                                                onMouseEnter={() => setHoveredCard(`${sectionIndex}-${itemIndex}`)}
                                                onMouseLeave={() => setHoveredCard(null)}
                                            >
                                                {/* Top accent */}
                                                <div className="achievement-card-accent" style={{ background: meta.gradient }} />

                                                {/* Hover glow */}
                                                <motion.div
                                                    className="achievement-card-bg-glow"
                                                    animate={{
                                                        opacity: hoveredCard === `${sectionIndex}-${itemIndex}` ? 1 : 0,
                                                    }}
                                                    style={{ background: meta.bgGlow }}
                                                />

                                                <div className="achievement-icon-enhanced" style={{
                                                    background: `${meta.accentColor}15`,
                                                    color: meta.accentColor,
                                                    borderColor: `${meta.accentColor}30`,
                                                }}>
                                                    {item.icon}
                                                </div>

                                                <h3 className="achievement-title">{item.title}</h3>
                                                <p className="achievement-desc">{item.description}</p>

                                                <div className="achievement-footer">
                                                    <span className="achievement-year-badge" style={{
                                                        color: meta.accentColor,
                                                        background: `${meta.accentColor}12`,
                                                        borderColor: `${meta.accentColor}25`,
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                            <line x1="16" y1="2" x2="16" y2="6" />
                                                            <line x1="8" y1="2" x2="8" y2="6" />
                                                            <line x1="3" y1="10" x2="21" y2="10" />
                                                        </svg>
                                                        {item.year}
                                                    </span>
                                                    {item.impact && (
                                                        <span className="achievement-impact-badge" style={{
                                                            color: meta.accentColor,
                                                            background: `${meta.accentColor}08`,
                                                            borderColor: `${meta.accentColor}20`,
                                                        }}>
                                                            ✨ {item.impact}
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* What Drives Me */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        style={{ marginTop: '2rem' }}
                    >
                        <div className="glass-card drives-card">
                            <div className="card-corner-glow" />
                            <div className="card-corner-glow card-corner-glow-cyan" style={{ top: 'auto', bottom: '-20%' }} />

                            {/* Decorative floating elements */}
                            <motion.div
                                className="drives-float-element"
                                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '2rem', opacity: 0.15 }}
                            >
                                💡
                            </motion.div>
                            <motion.div
                                className="drives-float-element"
                                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                style={{ position: 'absolute', top: '15%', right: '8%', fontSize: '2rem', opacity: 0.15 }}
                            >
                                ⚡
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7, type: 'spring' }}
                                className="drives-emoji"
                            >
                                🚀
                            </motion.div>

                            <h3 className="drives-title">What Drives Me</h3>

                            <p className="drives-text">
                                I believe in the power of technology to transform lives and solve real-world problems.
                                My journey in computer science has been driven by curiosity, a desire to innovate,
                                and a commitment to continuous learning. From managing large-scale university events
                                to building AI-powered applications, I strive to make a meaningful impact in everything I do.
                            </p>

                            <div className="drives-stats">
                                {stats.slice(0, 3).map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        className="drives-stat"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                        whileHover={{ scale: 1.08, y: -3 }}
                                    >
                                        <div className="drives-stat-number" style={{ background: stat.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                            <CountUp target={stat.number} suffix={stat.suffix} />
                                        </div>
                                        <p className="drives-stat-label">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}

export default Achievements
