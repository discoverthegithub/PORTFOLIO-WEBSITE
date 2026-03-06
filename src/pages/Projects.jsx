import { motion } from 'framer-motion'

const Projects = () => {
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    const projects = [
        {
            title: "Smart Scrum Assistant",
            type: "Final Year Project",
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
            highlight: true
        },
        {
            title: "Decentralized Asset Receiver",
            type: "Web Application",
            description: "A web-based platform addressing the problem of 'dead' cryptocurrency wallets. Users can securely store wallet keys and add beneficiary emails for seamless asset transfer. Planned blockchain integration for complete transparency.",
            tags: ["React", "Node.js", "MongoDB", "Blockchain", "Security"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
        },
        {
            title: "MedCom - Medical Facility Provider",
            type: "Web Development Course Project",
            description: "A comprehensive e-commerce platform enabling medical companies to sell products directly to customers. Features genuine product verification, competitive pricing, and doorstep delivery convenience.",
            tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
        },
        {
            title: "AI/ML Model Training Projects",
            type: "Academic Projects",
            description: "Collection of machine learning projects including Sentiment Analysis models, Chatbot development, and Sentence Completion systems using transformer architectures and LLM fine-tuning techniques.",
            tags: ["Python", "Transformers", "NLP", "LLM", "Fine-tuning"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                    <path d="M7.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                    <path d="M16.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
        },
        {
            title: "GitHub Clone",
            type: "Data Structures Project",
            description: "A lightweight GitHub-inspired platform designed using custom data structures such as linked lists, stacks, and hash tables. Demonstrates practical application of data structures for version control.",
            tags: ["C++", "Data Structures", "Linked Lists", "Hash Tables"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
        },
        {
            title: "Balloting System",
            type: "OOP Project",
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
            gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
        },
        {
            title: "Endless Runner Game",
            type: "Programming Fundamentals Project",
            description: "A fun 2D game developed using fundamental programming concepts such as loops, conditionals, and basic file handling. The game challenges users to avoid obstacles and achieve high scores.",
            tags: ["C++", "Game Dev", "File Handling"],
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="3" width="12" height="18" rx="2" />
                    <path d="M12 17v.01" />
                    <path d="M9 9h6v6H9z" />
                </svg>
            ),
            gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
        }
    ]

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
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="section-title">My Projects</h1>
                        <p className="section-subtitle">
                            A showcase of my work spanning web development, AI/ML, and software engineering.
                            Each project represents a unique challenge and learning experience.
                        </p>
                    </motion.div>

                    <div className="projects-grid" style={{ marginTop: '3rem' }}>
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                className="glass-card project-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                style={project.highlight ? {
                                    border: '2px solid rgba(99, 102, 241, 0.5)',
                                    boxShadow: '0 0 40px rgba(99, 102, 241, 0.15)'
                                } : {}}
                            >
                                <div className="project-image" style={{
                                    background: `linear-gradient(145deg, rgba(26, 26, 37, 0.9), rgba(15, 15, 25, 0.95))`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {/* Background glow */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '150px',
                                        height: '150px',
                                        background: project.gradient,
                                        filter: 'blur(50px)',
                                        opacity: 0.4,
                                        borderRadius: '50%'
                                    }} />

                                    {/* Icon container */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
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
                                            boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)`,
                                            color: 'white'
                                        }}
                                    >
                                        {project.icon}
                                    </motion.div>

                                    {/* Highlight badge for FYP */}
                                    {project.highlight && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.7rem',
                                            fontWeight: '600',
                                            color: 'white',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            ⭐ Featured
                                        </div>
                                    )}
                                </div>

                                <div className="project-content" style={{ padding: '1.5rem' }}>
                                    <span className="project-type" style={{
                                        background: project.gradient,
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        fontWeight: '600',
                                        color: 'white',
                                        marginBottom: '0.75rem'
                                    }}>
                                        {project.type}
                                    </span>
                                    <h3 style={{
                                        fontFamily: 'Outfit, sans-serif',
                                        fontSize: '1.25rem',
                                        fontWeight: '700',
                                        marginBottom: '0.75rem',
                                        color: 'var(--color-text-primary)'
                                    }}>
                                        {project.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.7',
                                        marginBottom: '1rem'
                                    }}>
                                        {project.description}
                                    </p>
                                    <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                style={{
                                                    padding: '0.25rem 0.75rem',
                                                    background: 'rgba(99, 102, 241, 0.1)',
                                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                                    borderRadius: '20px',
                                                    fontSize: '0.75rem',
                                                    color: 'var(--color-accent-primary)',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Projects
