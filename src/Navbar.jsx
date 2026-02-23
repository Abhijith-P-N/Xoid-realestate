import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="hamburger" onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
          <Link to="/" className="logo-link">
            <h2 className="logo">XOÏD</h2>
          </Link>
        </div>

        <div className="desktop-menu">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </div>

        <div className="navbar-right">
          {/* Sign in removed as per request */}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${open ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <button className="close-btn" onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
          <div className="mobile-links">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}>Contact</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;