import { useState } from "react";
import { Search, SlidersHorizontal, Bed, Bath, DollarSign, XCircle } from "lucide-react";

const Hero = ({ activeTab, onTabChange, onSearch, onFilterUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    minPrice: "",
    maxPrice: "",
    beds: 0,
    baths: 0,
  });

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const cleanedFilters = {
      ...localFilters,
      minPrice: localFilters.minPrice === "" ? undefined : Number(localFilters.minPrice),
      maxPrice: localFilters.maxPrice === "" ? undefined : Number(localFilters.maxPrice),
      beds: Number(localFilters.beds),
      baths: Number(localFilters.baths),
    };
    onFilterUpdate(cleanedFilters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const reset = { minPrice: undefined, maxPrice: undefined, beds: 0, baths: 0 };
    setLocalFilters({ minPrice: "", maxPrice: "", beds: 0, baths: 0 });
    onFilterUpdate(reset);
    setShowFilters(false);
  };

  return (
    <div className="hero-wrapper">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="Luxury real estate property exterior — XOID Real Estate"
        className="hero-image"
        loading="eager"
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Center Content */}
      <div className="hero-content">
        <h1>Properties to call home</h1>

        {/* Search Card */}
        <div className="search-card">
          {/* Tabs */}
          <div className="tabs">
            {["All", "Buy", "Rent"].map((tab) => (
              <span
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => onTabChange(tab)}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Search Row */}
          <div className="search-row">
            <div className="input-with-icon">
              <Search size={18} className="search-icon-inside" />
              <input
                placeholder="Search suburb, postcode or state"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className={`filter-btn ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
            <button className="search-btn" onClick={handleSearchClick}>
              Search
            </button>
          </div>

          {/* Advanced Filters Dropdown (Expansion) */}
          {showFilters && (
            <div className="advanced-filters-panel">
              <div className="filter-grid">
                <div className="filter-group">
                  <label><DollarSign size={16} /> Price Range</label>
                  <div className="price-inputs">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min Price"
                      value={localFilters.minPrice}
                      onChange={handleFilterChange}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max Price"
                      value={localFilters.maxPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>

                <div className="filter-row">
                  <div className="filter-group">
                    <label><Bed size={16} /> Beds</label>
                    <div className="select-wrapper">
                      <select name="beds" value={localFilters.beds} onChange={handleFilterChange}>
                        <option value="0">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>
                  <div className="filter-group">
                    <label><Bath size={16} /> Baths</label>
                    <div className="select-wrapper">
                      <select name="baths" value={localFilters.baths} onChange={handleFilterChange}>
                        <option value="0">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-actions">
                <button className="reset-btn" onClick={resetFilters}>Reset All Filters</button>
                <button className="apply-btn" onClick={applyFilters}>Apply Filters</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
