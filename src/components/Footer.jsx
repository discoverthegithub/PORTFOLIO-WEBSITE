import { NavLink } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div style={{ marginBottom: '1rem' }}>
                    <NavLink to="/" className="nav-logo" style={{ fontSize: '1.25rem' }}>
                        MT<span style={{ color: '#8b5cf6' }}>.</span>
                    </NavLink>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <NavLink to="/" className="nav-link">About</NavLink>
                    <NavLink to="/projects" className="nav-link">Projects</NavLink>
                    <NavLink to="/skills" className="nav-link">Skills</NavLink>
                    <NavLink to="/achievements" className="nav-link">Achievements</NavLink>
                </div>
                <p>
                    © {currentYear} <span className="gradient-text">Muhammad Tayyab</span>. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
