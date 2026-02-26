import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import {
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    Share2,
    Bed,
    Bath,
    Maximize,
    MapPin,
    ArrowLeft,
    Check,
    Home,
    Layers,
    Car,
    Gauge,
    Fuel,
    Settings2,
    Palette,
    Zap,
    CalendarDays
} from "lucide-react";
import PropertyCard from "./PropertyCard";

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // In a real app, you'd fetch by ID. Since we have a query for all, we can filter or use getPropertyById if it exists.
    // We added getPropertyById in properties.ts earlier.
    const property = useQuery(api.properties.getPropertyById, { id: id });

    // Fetch related properties by category
    const allRelatedProperties = useQuery(api.properties.getProperties, {
        category: property?.category
    });

    const relatedProperties = allRelatedProperties
        ? allRelatedProperties
            .filter(p => p._id !== id)
            .slice(0, 4)
        : [];

    // Dynamic page title for SEO
    useEffect(() => {
        if (property?.title) {
            document.title = `${property.title} | XOID Real Estate`;
            // Update canonical and OG URL dynamically
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.href = window.location.href;
            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute('content', window.location.href);
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', `${property.title} | XOID Real Estate`);
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', property.description?.slice(0, 160) || '');
            return () => {
                document.title = 'XOID Real Estate | Buy, Sell & Rent Properties in Kerala';
            };
        }
    }, [property]);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    if (property === undefined) {
        return (
            <div className="container" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p>Loading property details...</p>
            </div>
        );
    }

    if (property === null) {
        return (
            <div className="container" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <h2>Property Not Found</h2>
                <button onClick={() => navigate("/")} className="reset-btn" style={{ marginTop: "20px" }}>
                    Back to Home
                </button>
            </div>
        );
    }

    const images = Array.from(new Set([
        ...(property.image ? [property.image] : []),
        ...(property.images || [])
    ])).filter(img => typeof img === 'string' && img.length > 0);

    const finalImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa"];

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % finalImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + finalImages.length) % finalImages.length);

    // Replace with your actual WhatsApp number (with country code, no + or spaces)
    const WHATSAPP_NUMBER = "919400106048";

    const handleInquiry = () => {
        const msg = encodeURIComponent(
            `Hi! I'm interested in the property:\n\n🏠 *${property.title}*\n📍 ${property.location}\n💰 ₹${property.price.toLocaleString()}\n\nPlease share more details.`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    };

    const handleShare = async () => {
        const shareData = {
            title: property.title,
            text: property.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    return (
        <>
            <div className="property-details-page">
                <div className="container">
                    <button onClick={() => navigate(-1)} className="back-link">
                        <ArrowLeft size={20} />
                        <span>Back to Search</span>
                    </button>

                    <div className="details-layout">
                        <div className="details-main">
                            <div className="main-carousel">
                                <div className="carousel-view" style={{ cursor: 'zoom-in' }} onClick={() => { setLightboxIndex(currentImageIndex); setLightboxOpen(true); }}>
                                    <img src={finalImages[currentImageIndex]} alt={property.title} loading="eager" />
                                    <div className="lightbox-hint">Tap to view full image</div>
                                    {finalImages.length > 1 && (
                                        <>
                                            <button className="carousel-arrow left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                                                <ChevronLeft size={24} />
                                            </button>
                                            <button className="carousel-arrow right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                                                <ChevronRight size={24} />
                                            </button>
                                            <div className="carousel-dots">
                                                {finalImages.map((_, idx) => (
                                                    <span
                                                        key={idx}
                                                        className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="thumbnail-strip">
                                    {finalImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`thumb ${idx === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(idx)}
                                        >
                                            <img src={img} alt={`${property.title} - photo ${idx + 1}`} loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="details-content">
                                <h1>
                                    {property.title}
                                    {property.type === "Sold" && (
                                        <span className="sold-title-badge">SOLD</span>
                                    )}
                                </h1>
                                <div className="location-tag">
                                    <MapPin size={18} />
                                    <span>{property.location}</span>
                                </div>
                                {property.address && (
                                    <div className="exact-address">
                                        <span className="addr-label">Exact Location:</span>
                                        {property.address.startsWith("http") ? (
                                            <a href={property.address} target="_blank" rel="noopener noreferrer" className="addr-value link">
                                                {property.address}
                                            </a>
                                        ) : (
                                            <span className="addr-value">{property.address}</span>
                                        )}
                                    </div>
                                )}

                                <div className="content-sidebar-mobile">
                                    <div className="price-card">
                                        {property.type === "Sold" ? (
                                            <span className="category-label sold-label">SOLD</span>
                                        ) : (
                                            <span className="category-label">{property.category || "Property"} for {property.type || "Sale"}</span>
                                        )}
                                        <h2 className="sidebar-price">
                                            <span>₹{property.price.toLocaleString()}</span>
                                            {property.negotiable && <span className="negotiable-badge-inline">Negotiable</span>}
                                        </h2>
                                        <div className="action-row">
                                            {property.type === "Sold" ? (
                                                <div className="sold-notice">🔒 This listing is no longer available</div>
                                            ) : (
                                                <>
                                                    <button className="inquiry-btn" onClick={handleInquiry}>
                                                        <MessageSquare size={18} />
                                                        <span>Send Inquiry</span>
                                                    </button>
                                                    <button className={`share-btn ${copied ? 'copied' : ''}`} onClick={handleShare}>
                                                        {copied ? <Check size={18} /> : <Share2 size={18} />}
                                                        <span>{copied ? "Link Copied" : "Share"}</span>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Features Grid — conditional on category */}
                                {property.category?.toLowerCase() === 'vehicle' ? (
                                    <div className="features-grid">
                                        {property.year && (
                                            <div className="feature-item">
                                                <CalendarDays size={24} />
                                                <div className="feature-text">
                                                    <span className="label">Year</span>
                                                    <span className="value">{property.year}</span>
                                                </div>
                                            </div>
                                        )}
                                        {property.mileage && (
                                            <div className="feature-item">
                                                <Gauge size={24} />
                                                <div className="feature-text">
                                                    <span className="label">Mileage</span>
                                                    <span className="value">{property.mileage}</span>
                                                </div>
                                            </div>
                                        )}
                                        {property.fuelType && (
                                            <div className="feature-item">
                                                <Fuel size={24} />
                                                <div className="feature-text">
                                                    <span className="label">Fuel Type</span>
                                                    <span className="value">{property.fuelType}</span>
                                                </div>
                                            </div>
                                        )}
                                        {property.transmission && (
                                            <div className="feature-item">
                                                <Settings2 size={24} />
                                                <div className="feature-text">
                                                    <span className="label">Transmission</span>
                                                    <span className="value">{property.transmission}</span>
                                                </div>
                                            </div>
                                        )}
                                        {property.vehicleColor && (
                                            <div className="feature-item">
                                                <Palette size={24} />
                                                <div className="feature-text">
                                                    <span className="label">Color</span>
                                                    <span className="value">{property.vehicleColor}</span>
                                                </div>
                                            </div>
                                        )}
                                        {property.engine && (
                                            <div className="feature-item">
                                                <Zap size={24} />
                                                <div className="feature-text">
                                                    <span className="label">Engine</span>
                                                    <span className="value">{property.engine}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (() => {
                                    const cat = property.category?.toLowerCase();
                                    const isPlot = cat === 'plot' || cat === 'land';
                                    const isCommercial = cat === 'commercial';
                                    const hasRooms = !isPlot && !isCommercial; // House, Apartment, Villa etc.
                                    return (
                                        <div className="features-grid">
                                            {/* Beds — only for residential */}
                                            {hasRooms && property.beds > 0 && (
                                                <div className="feature-item">
                                                    <Bed size={24} />
                                                    <div className="feature-text">
                                                        <span className="label">Bedrooms</span>
                                                        <span className="value">{property.beds} Rooms</span>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Baths — only for residential */}
                                            {hasRooms && property.baths > 0 && (
                                                <div className="feature-item">
                                                    <Bath size={24} />
                                                    <div className="feature-text">
                                                        <span className="label">Bathrooms</span>
                                                        <span className="value">{property.baths} Baths</span>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Area — all categories */}
                                            {property.area > 0 && (
                                                <div className="feature-item">
                                                    <Maximize size={24} />
                                                    <div className="feature-text">
                                                        <span className="label">Area</span>
                                                        <span className="value">{property.area} sqft</span>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Furnished — residential only */}
                                            {hasRooms && property.furnished && (
                                                <div className="feature-item">
                                                    <Home size={24} />
                                                    <div className="feature-text">
                                                        <span className="label">Furnishing</span>
                                                        <span className="value">{property.furnished}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Floor — residential + commercial */}
                                            {!isPlot && property.floor && (
                                                <div className="feature-item">
                                                    <Layers size={24} />
                                                    <div className="feature-text">
                                                        <span className="label">Floor</span>
                                                        <span className="value">{property.floor}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Parking — residential + commercial */}
                                            {!isPlot && property.parking && (
                                                <div className="feature-item">
                                                    <Car size={24} />
                                                    <div className="feature-text">
                                                        <span className="label">Parking</span>
                                                        <span className="value">{property.parking}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}

                                <div className="description-section">
                                    <h3>Description</h3>
                                    <p>{property.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details-sidebar">
                            <div className="sticky-sidebar">
                                <div className="price-card">
                                    {property.type === "Sold" ? (
                                        <span className="category-label sold-label">SOLD</span>
                                    ) : (
                                        <span className="category-label">{property.category || "Property"} for {property.type || "Sale"}</span>
                                    )}
                                    <h2 className="sidebar-price">
                                        <span>₹{property.price.toLocaleString()}</span>
                                        {property.negotiable && <span className="negotiable-badge-inline">Negotiable</span>}
                                    </h2>
                                    {property.area > 0 && (
                                        <p className="area-price">₹ {Math.round(property.price / property.area).toLocaleString()} / sqft</p>
                                    )}

                                    <div className="action-column">
                                        {property.type === "Sold" ? (
                                            <div className="sold-notice">🔒 This listing is no longer available</div>
                                        ) : (
                                            <>
                                                <button className="inquiry-btn full-width" onClick={handleInquiry}>
                                                    <MessageSquare size={18} />
                                                    <span>Send Inquiry</span>
                                                </button>
                                                <button className={`share-btn full-width ${copied ? 'copied' : ''}`} onClick={handleShare}>
                                                    {copied ? <Check size={18} /> : <Share2 size={18} />}
                                                    <span>{copied ? "Share with Friends" : "Share Property"}</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="agent-card">
                                    <div className="agent-header">
                                        <div className="agent-info">
                                            <h4>Concierge Team</h4>
                                            <p>Verified Partner</p>
                                        </div>
                                    </div>
                                    <p className="agent-call">Need Help? <a href="#">Chat with an expert</a></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {relatedProperties.length > 0 && (
                        <div className="related-section">
                            <div className="section-header">
                                <span className="section-subtitle">Discover More</span>
                                <h2 className="section-title">Related Properties</h2>
                            </div>
                            <div className="card-grid">
                                {relatedProperties.map((prop) => (
                                    <PropertyCard key={prop._id} property={prop} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
                    <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
                    {finalImages.length > 1 && (
                        <>
                            <button className="lightbox-arrow left" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + finalImages.length) % finalImages.length); }}>❮</button>
                            <button className="lightbox-arrow right" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % finalImages.length); }}>❯</button>
                        </>
                    )}
                    <img
                        className="lightbox-img"
                        src={finalImages[lightboxIndex]}
                        alt={property.title}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="lightbox-counter">{lightboxIndex + 1} / {finalImages.length}</div>
                </div>
            )}
        </>
    );
};

export default PropertyDetailsPage;
