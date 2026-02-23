import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! Our team will get back to you shortly.");
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="contact-container">
                    <div className="contact-info">
                        <span className="section-subtitle">Get in Touch</span>
                        <h2 className="section-title">Ready to find your <br /> dream home?</h2>
                        <p>Connect with our expert concierge team for personalized property guidance and exclusive listings.</p>

                        <div className="contact-details">
                            <div className="details-item">
                                <div className="detail-icon"><Phone size={20} /></div>
                                <div className="detail-text">
                                    <span className="label">Call us</span>
                                    <span className="value">+91 123 456 7890</span>
                                </div>
                            </div>
                            <div className="details-item">
                                <div className="detail-icon"><Mail size={20} /></div>
                                <div className="detail-text">
                                    <span className="label">Email us</span>
                                    <span className="value">hello@xoid.com</span>
                                </div>
                            </div>
                            <div className="details-item">
                                <div className="detail-icon"><MapPin size={20} /></div>
                                <div className="detail-text">
                                    <span className="label">Visit us</span>
                                    <span className="value">123 Luxury Ave, Bangalore, KA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" placeholder="Full Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email Address" required />
                            </div>
                            <div className="form-group">
                                <select required>
                                    <option value="">Interested in...</option>
                                    <option value="buy">Buying Property</option>
                                    <option value="rent">Renting Property</option>
                                    <option value="sell">Selling Property</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Your Message" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
