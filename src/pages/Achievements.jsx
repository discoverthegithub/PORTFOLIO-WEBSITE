import { motion } from 'framer-motion'
import { FaMicrophone, FaBriefcase, FaTrophy, FaGraduationCap, FaRobot, FaBrain, FaLaptopCode, FaLink } from 'react-icons/fa'

const Achievements = () => {
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    const achievements = [
        {
            category: "Event Management & Leadership",
            items: [
                {
                    title: "TEDx FAST 2025 - Management Team",
                    description: "Participated in organizing and managing TEDx event at FAST NUCES, coordinating with speakers, attendees, and ensuring smooth event execution.",
                    icon: <FaMicrophone size={24} />,
                    year: "2025"
                },
                {
                    title: "FAST Job Fair 2025 - Management Team",
                    description: "Actively contributed to the management of Job Fair 2025, helping connect students with potential employers and facilitating career opportunities.",
                    icon: <FaBriefcase size={24} />,
                    year: "2025"
                },
                {
                    title: "FAST Job Fair 2023 - Management Team",
                    description: "Part of the organizing committee for Job Fair 2023, managing logistics and ensuring successful execution of the event.",
                    icon: <FaBriefcase size={24} />,
                    year: "2023"
                },
                {
                    title: "FAST Daira - Management Committee",
                    description: "Participated in managing FAST Daira - the flagship national olympiad of the university. Coordinated with participants from different universities across Pakistan for gaming and coding competitions.",
                    icon: <FaTrophy size={24} />,
                    year: "2024"
                }
            ]
        },
        {
            category: "Academic Excellence",
            items: [
                {
                    title: "FAST NUCES - Computer Science",
                    description: "Pursuing Bachelor's degree in Computer Science from one of Pakistan's most prestigious universities for technology education.",
                    icon: <FaGraduationCap size={24} />,
                    year: "2022-2026"
                },
                {
                    title: "Final Year Project - Smart Scrum Assistant",
                    description: "Leading an innovative FYP integrating AI/ML with project management, demonstrating practical application of LLM fine-tuning and NLP.",
                    icon: <FaRobot size={24} />,
                    year: "2025-2026"
                }
            ]
        },
        {
            category: "Technical Achievements",
            items: [
                {
                    title: "AI/ML Model Development",
                    description: "Developed multiple ML models including sentiment analysis, chatbots, and sentence completion systems using transformer architectures and LLM fine-tuning.",
                    icon: <FaBrain size={24} />,
                    year: "2024-2025"
                },
                {
                    title: "Full Stack Web Development",
                    description: "Built multiple full-stack applications including MedCom, Decentralized Asset Receiver, and other web platforms using MERN stack.",
                    icon: <FaLaptopCode size={24} />,
                    year: "2023-2025"
                },
                {
                    title: "Blockchain Integration Planning",
                    description: "Designed architecture for blockchain integration in the Decentralized Asset Receiver project for enhanced transparency and security.",
                    icon: <FaLink size={24} />,
                    year: "2025"
                }
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
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="section-title">Beyond Success: My Triumphs</h1>
                        <p className="section-subtitle">
                            Each milestone reflects not just achievement, but a relentless pursuit of
                            excellence and a commitment to surpassing expectations.
                        </p>
                    </motion.div>

                    <div style={{ marginTop: '3rem' }}>
                        {achievements.map((section, sectionIndex) => (
                            <motion.div
                                key={section.category}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: sectionIndex * 0.15 }}
                                style={{ marginBottom: '3rem' }}
                            >
                                <h2 style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#6366f1',
                                    marginBottom: '1.5rem',
                                    paddingBottom: '0.5rem',
                                    borderBottom: '2px solid rgba(99, 102, 241, 0.2)'
                                }}>
                                    {section.category}
                                </h2>

                                <div className="achievements-grid">
                                    {section.items.map((item, itemIndex) => (
                                        <motion.div
                                            key={item.title}
                                            className="glass-card achievement-card"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: sectionIndex * 0.15 + itemIndex * 0.1
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)'
                                            }}
                                        >
                                            <div className="achievement-icon">
                                                {item.icon}
                                            </div>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                            <span className="achievement-year">{item.year}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Extra Section - What Drives Me */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        style={{ marginTop: '2rem' }}
                    >
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <h3 style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontSize: '1.75rem',
                                marginBottom: '1rem',
                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                What Drives Me
                            </h3>
                            <p style={{
                                color: '#94a3b8',
                                fontSize: '1.1rem',
                                lineHeight: '1.8',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                I believe in the power of technology to transform lives and solve real-world problems.
                                My journey in computer science has been driven by curiosity, a desire to innovate,
                                and a commitment to continuous learning. From managing large-scale university events
                                to building AI-powered applications, I strive to make a meaningful impact in everything I do.
                            </p>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '3rem',
                                marginTop: '2rem',
                                flexWrap: 'wrap'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                        fontFamily: 'Outfit, sans-serif',
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        7+
                                    </div>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Projects Completed</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                        fontFamily: 'Outfit, sans-serif',
                                        background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        4+
                                    </div>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Events Managed</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                        fontFamily: 'Outfit, sans-serif',
                                        background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        4
                                    </div>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Years at FAST</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}

export default Achievements
