import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const [hoveredCard, setHoveredCard] = useState(null)
    const [expandedCard, setExpandedCard] = useState(null)

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    const projects = [
        {
            title: "Smart Scrum Assistant",
            type: "Final Year Project",
            category: "AI/ML",
            description: "An intelligent project management tool for software houses. Features AI-powered conversion of raw client requirements into properly formatted user stories using a fine-tuned GPT model. Includes automatic developer assignment and real-time progress tracking.",
            tags: ["React", "Node.js", "MongoDB", "GPT Fine-tuning", "NLP", "AI"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0 1 12 2z" />
                    <path d="M12 6a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2" />
                    <path d="M12 6a6 6 0 0 0-6 6c0 2.22 1.21 4.16 3 5.2" />
                    <circle cx="12" cy="6" r="2" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            accentColor: '#8b5cf6',
            highlight: true,
            features: ['AI-Powered User Stories', 'Smart Developer Assignment', 'Real-time Tracking', 'Sprint Management']
        },
        {
            title: "Decentralized Asset Receiver",
            type: "Web Application",
            category: "Web Dev",
            description: "A web-based platform addressing the problem of 'dead' cryptocurrency wallets. Users can securely store wallet keys and add beneficiary emails for seamless asset transfer. Planned blockchain integration for complete transparency.",
            tags: ["React", "Node.js", "MongoDB", "Blockchain", "Security"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)",
            accentColor: '#22d3ee',
            highlight: false,
            features: ['Secure Wallet Storage', 'Beneficiary System', 'Blockchain Ready', 'Email Notifications']
        },
        {
            title: "MedCom - Medical Facility Provider",
            type: "Web Development Course Project",
            category: "Web Dev",
            description: "A comprehensive e-commerce platform enabling medical companies to sell products directly to customers. Features genuine product verification, competitive pricing, and doorstep delivery convenience.",
            tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            accentColor: '#10b981',
            highlight: false,
            features: ['Product Verification', 'E-commerce Platform', 'Doorstep Delivery', 'Multi-vendor']
        },
        {
            title: "AI/ML Model Training Projects",
            type: "Academic Projects",
            category: "AI/ML",
            description: "Collection of machine learning projects including Sentiment Analysis models, Chatbot development, and Sentence Completion systems using transformer architectures and LLM fine-tuning techniques.",
            tags: ["Python", "Transformers", "NLP", "LLM", "Fine-tuning"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                    <path d="M7.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                    <path d="M16.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            accentColor: '#f59e0b',
            highlight: false,
            features: ['Sentiment Analysis', 'Chatbot Dev', 'LLM Fine-tuning', 'Transformer Models']
        },
        {
            title: "GitHub Clone",
            type: "Data Structures Project",
            category: "Academic",
            description: "A lightweight GitHub-inspired platform designed using custom data structures such as linked lists, stacks, and hash tables. Demonstrates practical application of data structures for version control.",
            tags: ["C++", "Data Structures", "Linked Lists", "Hash Tables"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            accentColor: '#6366f1',
            highlight: false,
            features: ['Version Control', 'Custom Data Structures', 'Repository Management', 'Branch Support']
        },
        {
            title: "Balloting System",
            type: "OOP Project",
            category: "Academic",
            description: "An object-oriented application simulating a real-world balloting system. Developed using OOP concepts such as classes, inheritance, encapsulation, and polymorphism for secure ballot casting.",
            tags: ["C++", "OOP", "Inheritance", "Polymorphism"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                    <rect x="7" y="14" width="3" height="6" rx="1" />
                    <rect x="12" y="10" width="3" height="10" rx="1" />
                    <rect x="17" y="6" width="3" height="14" rx="1" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
            accentColor: '#ec4899',
            highlight: false,
            features: ['Secure Voting', 'OOP Design Patterns', 'Encryption', 'Result Analytics']
        },
        {
            title: "Endless Runner Game",
            type: "Programming Fundamentals Project",
            category: "Academic",
            description: "A fun 2D game developed using fundamental programming concepts such as loops, conditionals, and basic file handling. The game challenges users to avoid obstacles and achieve high scores.",
            tags: ["C++", "Game Dev", "File Handling"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="3" width="12" height="18" rx="2" />
                    <path d="M12 17v.01" />
                    <path d="M9 9h6v6H9z" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            accentColor: '#ef4444',
            highlight: false,
            features: ['2D Game Engine', 'Score System', 'Obstacle Generation', 'High Score Saving']
        }
    ]

    const filters = ['All', 'AI/ML', 'Web Dev', 'Academic']
    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter)

    /* 3D tilt card effect */
    const handleMouseMove = (e, cardRef) => {
        if (!cardRef) return
        const rect = cardRef.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        const rotateX = (y - 0.5) * -10
        const rotateY = (x - 0.5) * 10
        cardRef.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    }

    const handleMouseLeave = (cardRef) => {
        if (!cardRef) return
        cardRef.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
        cardRef.style.transition = 'transform 0.5s ease'
    }

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
                    >
                        <span className="section-tag">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                            Portfolio
                        </span>
                        <h1 className="section-title">My Projects</h1>
                        <p className="section-subtitle">
                            A showcase of my work spanning web development, AI/ML, and software engineering.
                            Each project represents a unique challenge and learning experience.
                        </p>
                    </motion.div>

                    {/* Project count */}
                    <motion.div
                        className="project-count-bar"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <span className="project-count-number">{filteredProjects.length}</span>
                        <span className="project-count-label">
                            {activeFilter === 'All' ? 'Total Projects' : `${activeFilter} Projects`}
                        </span>
                    </motion.div>

                    {/* Filter tabs */}
                    <motion.div
                        className="filter-tabs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {filters.map((filter) => (
                            <motion.button
                                key={filter}
                                className={`filter-tab ${activeFilter === filter ? 'filter-tab-active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {filter === 'AI/ML' && '🤖 '}
                                {filter === 'Web Dev' && '🌐 '}
                                {filter === 'Academic' && '🎓 '}
                                {filter === 'All' && '📁 '}
                                {filter}
                                {activeFilter === filter && (
                                    <motion.div
                                        className="filter-tab-indicator"
                                        layoutId="activeFilter"
                                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Projects grid */}
                    <div className="projects-grid" style={{ marginTop: '2rem' }}>
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    className={`glass-card project-card ${project.highlight ? 'project-card-featured' : ''}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                    onMouseOut={(e) => handleMouseLeave(e.currentTarget)}
                                    style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease' }}
                                >
                                    {/* Top accent line */}
                                    <div className="project-accent-line" style={{ background: project.gradient }} />

                                    <div className="project-image" style={{
                                        background: `linear-gradient(145deg, rgba(26, 26, 37, 0.9), rgba(15, 15, 25, 0.95))`,
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Animated background glow */}
                                        <motion.div
                                            animate={{
                                                scale: hoveredCard === index ? 1.5 : 1,
                                                opacity: hoveredCard === index ? 0.7 : 0.3
                                            }}
                                            transition={{ duration: 0.5 }}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '150px',
                                                height: '150px',
                                                background: project.gradient,
                                                filter: 'blur(50px)',
                                                borderRadius: '50%'
                                            }}
                                        />

                                        {/* Floating particles decoration */}
                                        <div className="project-particles">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="project-particle"
                                                    style={{ background: project.accentColor }}
                                                    animate={{
                                                        y: [0, -20, 0],
                                                        x: [0, Math.sin(i) * 10, 0],
                                                        opacity: [0.2, 0.8, 0.2],
                                                    }}
                                                    transition={{
                                                        duration: 2 + i * 0.5,
                                                        repeat: Infinity,
                                                        delay: i * 0.3,
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Floating grid pattern */}
                                        <div className="project-grid-overlay" />

                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ scale: 1.15, rotate: 8 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            style={{
                                                width: '90px',
                                                height: '90px',
                                                background: project.gradient,
                                                borderRadius: '24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                zIndex: 1,
                                                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${project.accentColor}33`,
                                                color: 'white'
                                            }}
                                        >
                                            {project.icon}
                                        </motion.div>

                                        {/* Featured badge */}
                                        {project.highlight && (
                                            <motion.div
                                                className="project-featured-badge"
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                                Featured
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="project-content" style={{ padding: '1.5rem' }}>
                                        <span className="project-type-badge" style={{
                                            color: project.accentColor,
                                            borderColor: `${project.accentColor}33`,
                                            background: `${project.accentColor}10`,
                                        }}>
                                            {project.type}
                                        </span>
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-desc">{project.description}</p>

                                        {/* Feature list - shown on hover */}
                                        <AnimatePresence>
                                            {hoveredCard === index && project.features && (
                                                <motion.div
                                                    className="project-features"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {project.features.map((feature, fi) => (
                                                        <motion.span
                                                            key={feature}
                                                            className="project-feature-item"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: fi * 0.05 }}
                                                            style={{ color: project.accentColor }}
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                            {feature}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="project-tags">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="project-tag-pill">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Projects
