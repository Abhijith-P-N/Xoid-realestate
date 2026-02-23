import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rawImages = property.images || [];
  const rawImage = property.image || "";

  // DEBUG: log what Convex is returning
  console.log("[PropertyCard] property.image:", rawImage);
  console.log("[PropertyCard] property.images:", rawImages);
  console.log("[PropertyCard] images type:", typeof rawImages, Array.isArray(rawImages));

  const images = Array.from(new Set([
    ...(rawImage ? [rawImage] : []),
    ...(Array.isArray(rawImages) ? rawImages : [])
  ])).filter(img => typeof img === "string" && img.trim().length > 0);

  console.log("[PropertyCard] resolved finalImages:", images);

  const finalImages = images;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % finalImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + finalImages.length) % finalImages.length);
  };

  // Replace with your actual WhatsApp number (with country code, no + or spaces)
  const WHATSAPP_NUMBER = "919400106048";

  const handleInquiry = (e) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hi! I'm interested in this property:\n\n🏠 *${property.title}*\n📍 ${property.location}\n💰 ₹${property.price.toLocaleString()}\n\nPlease send more details.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div
      className="property-card"
      onClick={() => navigate(`/property/${property._id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-image-container">
        <img
          src={finalImages[currentImageIndex]}
          alt={property.title}
          onError={(e) => {
            console.error("[PropertyCard] Image failed to load:", finalImages[currentImageIndex]);
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";
          }}
        />
        {finalImages.length > 1 && (
          <>
            <button className="carousel-arrow left" onClick={prevImage}>
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-arrow right" onClick={nextImage}>
              <ChevronRight size={20} />
            </button>
            <div className="carousel-dots">
              {finalImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === currentImageIndex ? "active" : ""}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="property-card-content">
        <div className="card-header">
          <h3>{property.title}</h3>
          <button className="inquiry-btn-sm" onClick={handleInquiry} title="Send Inquiry">
            <MessageSquare size={16} />
          </button>
        </div>
        <p>{property.location}</p>
        <div className="card-footer">
          <div className="price-box">
            <h4>₹ {property.price.toLocaleString()}</h4>
            {property.negotiable && <span className="negotiable-tag">Negotiable</span>}
          </div>
          <p className="bhk">BHK {property.beds}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
