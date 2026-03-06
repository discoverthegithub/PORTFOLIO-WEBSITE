import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Apply theme to document
        if (isDark) {
            document.documentElement.classList.remove('light-theme')
            document.documentElement.classList.add('dark-theme')
        } else {
            document.documentElement.classList.remove('dark-theme')
            document.documentElement.classList.add('light-theme')
        }
    }, [isDark])

    const toggleMenu = () => setIsOpen(!isOpen)
    const toggleTheme = () => setIsDark(!isDark)

    const navLinks = [
        { path: '/', label: 'About' },
        { path: '/projects', label: 'Projects' },
        { path: '/skills', label: 'Skills' },
        { path: '/achievements', label: 'Achievements' },
    ]

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container nav-container">
                <NavLink to="/" className="nav-logo">
                    MT<span style={{ color: '#8b5cf6' }}>.</span>
                </NavLink>

                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="nav-right">
                    <motion.button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDark ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18h6M10 22h4M15.09 14.17A6 6 0 0 0 9.91 8.91 6 6 0 0 0 12 2c.34 0 .67.02 1 .07A6 6 0 0 0 12 14a6 6 0 0 0 3.09.17z" />
                                <line x1="12" y1="2" x2="12" y2="2" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f59e0b' }}>
                                <path d="M9 18h6M10 22h4M12 2v1M12 21v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
                                <circle cx="12" cy="12" r="5" />
                            </svg>
                        )}
                    </motion.button>

                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar
