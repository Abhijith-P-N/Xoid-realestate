import Contact from "./Contact";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
    const navigate = useNavigate();

    return (
        <div className="contact-page">
            <div className="container" style={{ paddingTop: "40px" }}>
                <button onClick={() => navigate(-1)} className="back-link">
                    <ArrowLeft size={20} />
                    <span>Go Back</span>
                </button>
            </div>
            <Contact />

            <div className="container" style={{ paddingBottom: "80px" }}>
                <div className="contact-footer-info" style={{
                    marginTop: "40px",
                    padding: "40px",
                    background: "#fafafa",
                    borderRadius: "24px",
                    textAlign: "center"
                }}>
                    <h3>Business Hours</h3>
                    <p style={{ color: "#666", marginTop: "10px" }}>
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
