import { useState } from "react";
import Hero from "./Hero";
import PropertyCard from "./PropertyCard";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const HomePage = () => {
    const [filterType, setFilterType] = useState("All");
    const [activeSearch, setActiveSearch] = useState("");
    const [advancedFilters, setAdvancedFilters] = useState({
        minPrice: undefined,
        maxPrice: undefined,
        beds: 0,
        baths: 0,
        category: "",
    });

    const properties = useQuery(api.properties.getProperties, {
        type: filterType === "All" ? undefined : filterType,
        search: activeSearch,
        ...advancedFilters,
    });

    const handleSearch = (term) => {
        setActiveSearch(term);
    };

    const handleFilterUpdate = (newFilters) => {
        setAdvancedFilters((prev) => ({ ...prev, ...newFilters }));
    };

    return (
        <>
            <Hero
                activeTab={filterType}
                onTabChange={setFilterType}
                onSearch={handleSearch}
                onFilterUpdate={handleFilterUpdate}
            />

            <div className="container" style={{ marginTop: "50px", marginBottom: "80px" }}>
                <h2 style={{ marginBottom: "20px" }}>
                    {filterType === "All" ? "Featured Properties" : `${filterType} Properties`}
                </h2>

                <div className="card-grid">
                    {properties === undefined ? (
                        <div style={{ textAlign: "center", padding: "40px", width: "100%", gridColumn: "1/-1" }}>
                            <p style={{ color: "#666", fontSize: "18px" }}>Updating properties...</p>
                        </div>
                    ) : (
                        <>
                            {properties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                            {properties.length === 0 && (
                                <div style={{ textAlign: "center", padding: "40px", width: "100%", gridColumn: "1/-1" }}>
                                    <p style={{ color: "#666", fontSize: "18px" }}>No properties found matching your criteria.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomePage;
