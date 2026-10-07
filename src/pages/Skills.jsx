import { useState } from 'react'
import { motion } from 'framer-motion'

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null)

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    const skillCategories = [
        {
            title: "Programming Languages",
            icon: "💻",
            gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            accentColor: '#6366f1',
            skills: [
                { name: "C++", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16.5 12h4" /><path d="M18.5 10v4" /><path d="M7 6a6 6 0 1 0 0 12" /></svg> },
                { name: "Python", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2c-3 0-5 2-5 5v2h8V7c0-2-2-4-5-4z" /><path d="M9 14H4v-1c0-2 2-3 4-3h3" /><path d="M12 22c3 0 5-2 5-5v-2H9v2c0 2 2 4 5 4z" /><path d="M15 10h5v1c0 2-2 3-4 3h-3" /></svg> },
                { name: "JavaScript", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z" /><path d="M7 7h3v9" /><path d="M12 18h-2" /><path d="M17 18h-2v-4a2 2 0 0 1 2-2h1" /></svg> },
                { name: "SQL", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> }
            ]
        },
        {
            title: "Web Development",
            icon: "🌐",
            gradient: "linear-gradient(135deg, #22d3ee, #06b6d4)",
            accentColor: '#22d3ee',
            skills: [
                { name: "React.js", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="2" /></svg> },
                { name: "Node.js", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l9 5v8l-9 5-9-5V8l9-5z" /><circle cx="12" cy="12" r="3" /></svg> },
                { name: "MongoDB", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v19" /><path d="M5 10c0-4 3-7 7-7s7 3 7 7c0 7-7 12-7 12S5 17 5 10z" /></svg> },
                { name: "HTML/CSS", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18l-2 18-9 3-9-3L3 3z" /><path d="M12 18l-4-1.5L7 7h10" /></svg> },
                { name: "Express.js", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 8l8 8" /><path d="M16 8l-8 8" /><circle cx="12" cy="12" r="10" /></svg> },
                { name: "REST APIs", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg> }
            ]
        },
        {
            title: "AI & Machine Learning",
            icon: "🤖",
            gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
            accentColor: '#f59e0b',
            skills: [
                { name: "NLP", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
                { name: "LLM Fine-tuning", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 0 1 4 4c0 .7-.2 1.3-.5 1.8L12 12 8.5 7.8c-.3-.5-.5-1.1-.5-1.8a4 4 0 0 1 4-4z" /><path d="M9 18l3 3 3-3" /><path d="M12 12v9" /></svg> },
                { name: "Transformers", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg> },
                { name: "Model Training", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
                { name: "Chatbots", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" /></svg> },
                { name: "Sentiment Analysis", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg> }
            ]
        },
        {
            title: "Core CS Concepts",
            icon: "🧠",
            gradient: "linear-gradient(135deg, #ec4899, #db2777)",
            accentColor: '#ec4899',
            skills: [
                { name: "Data Structures", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg> },
                { name: "OOP", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
                { name: "Algorithms", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
                { name: "Database Design", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z" /><path d="M21 9H3" /><path d="M21 15H3" /><path d="M12 3v18" /></svg> }
            ]
        },
        {
            title: "Tools & Technologies",
            icon: "🔧",
            gradient: "linear-gradient(135deg, #10b981, #059669)",
            accentColor: '#10b981',
            skills: [
                { name: "Git/GitHub", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg> },
                { name: "Oracle SQL", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                { name: "VS Code", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2L5 8l10 14" /><path d="M5 16l10-14" /><circle cx="12" cy="12" r="2" /></svg> },
                { name: "Data Scraping", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline points="21 12 16.5 14.6 16.5 19.79" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg> }
            ]
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
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="section-header"
                    >
                        <span className="section-tag">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                            Expertise
                        </span>
                        <h1 className="section-title">My Skills</h1>
                        <p className="section-subtitle">
                            A comprehensive overview of my technical skills and expertise acquired through
                            my Computer Science degree and personal projects.
                        </p>
                    </motion.div>

                    {/* Skills categories */}
                    <div className="skills-container" style={{ marginTop: '3rem' }}>
                        {skillCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.title}
                                className="skill-category-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            >
                                {/* Category header with icon */}
                                <div className="skill-category-header">
                                    <div className="skill-category-icon" style={{ background: category.gradient }}>
                                        <span>{category.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="skill-category-title">{category.title}</h3>
                                        <div className="skill-category-count">{category.skills.length} skills</div>
                                    </div>
                                    <div className="skill-category-line" style={{ background: category.gradient }} />
                                </div>

                                <div className="skills-grid">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill.name}
                                            className="skill-card-enhanced"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: categoryIndex * 0.1 + skillIndex * 0.05
                                            }}
                                            whileHover={{
                                                y: -8,
                                                transition: { duration: 0.2 },
                                            }}
                                            onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                        >
                                            {/* Hover glow */}
                                            <motion.div
                                                className="skill-card-glow"
                                                style={{ background: category.gradient }}
                                                animate={{
                                                    opacity: hoveredSkill === `${categoryIndex}-${skillIndex}` ? 0.15 : 0
                                                }}
                                            />
                                            <div className="skill-icon-wrapper" style={{
                                                color: category.accentColor,
                                                borderColor: `${category.accentColor}30`,
                                            }}>
                                                {skill.icon}
                                            </div>
                                            <h4 className="skill-name">{skill.name}</h4>
                                            {/* Accent dot */}
                                            <div className="skill-accent-dot" style={{ background: category.accentColor }} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Languages Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        style={{ marginTop: '3rem' }}
                    >
                        <div className="glass-card languages-card">
                            <div className="card-corner-glow" />
                            <h3 className="languages-title">
                                <span>🗣️</span>
                                Languages
                            </h3>
                            <div className="languages-grid">
                                <motion.div
                                    className="language-item"
                                    whileHover={{ scale: 1.03, y: -3 }}
                                >
                                    <span className="language-flag">🇬🇧</span>
                                    <div>
                                        <h4 className="language-name">English</h4>
                                        <p className="language-level">Professional Proficiency</p>
                                        <div className="language-bar">
                                            <motion.div
                                                className="language-bar-fill"
                                                initial={{ width: 0 }}
                                                animate={{ width: '90%' }}
                                                transition={{ duration: 1, delay: 0.8 }}
                                                style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="language-item"
                                    whileHover={{ scale: 1.03, y: -3 }}
                                >
                                    <span className="language-flag">🇵🇰</span>
                                    <div>
                                        <h4 className="language-name">Urdu</h4>
                                        <p className="language-level">Native Language</p>
                                        <div className="language-bar">
                                            <motion.div
                                                className="language-bar-fill"
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 1, delay: 1 }}
                                                style={{ background: 'linear-gradient(90deg, #10b981, #059669)' }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}

export default Skills
