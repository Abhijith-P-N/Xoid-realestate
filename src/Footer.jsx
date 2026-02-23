import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <h2 className="logo">XOÏD</h2>
                        <p className="brand-tagline">
                            Discover your perfect home with XOÏD. We provide premium real estate services tailored to your lifestyle.
                        </p>
                        <div className="social-links">
                            <span className="social-icon"><Facebook size={20} /></span>
                            <span className="social-icon"><Instagram size={20} /></span>
                            <span className="social-icon"><Twitter size={20} /></span>
                            <span className="social-icon"><Linkedin size={20} /></span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#buy">Buy Properties</a></li>
                            <li><a href="#rent">Rent Properties</a></li>
                            <li><a href="#sell">Sell Your Home</a></li>
                            <li><a href="#agents">Find an Agent</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-links">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#valuation">Property Valuation</a></li>
                            <li><a href="#management">Home Management</a></li>
                            <li><a href="#investment">Investment Advice</a></li>
                            <li><a href="#insurance">Home Insurance</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <div className="contact-item">
                            <MapPin size={18} />
                            <span>Mangalore, India</span>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} />
                            <span>+919400106048</span>
                        </div>
                        <div className="contact-item">
                            <Mail size={18} />
                            <span>xoidrealestate@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} XOÏD Real Estate. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
