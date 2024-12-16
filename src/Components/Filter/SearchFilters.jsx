// SearchFilters.js
import React, { useEffect, useRef, useState } from "react";
import "./SearchFilters.css";
import { debounce } from "lodash";

const SearchFilters = ({ filters, onFiltersChange, onFilterSubmit }) => {
  const { name, priceFrom, priceTo } = filters;
  const [valueSearch, setValueSearch] = useState("");
  const activeInputRef = useRef(null);

  const debouncedSearch = debounce(async (key, e) => {
    onFiltersChange({ ...filters, [key]: e });
  }, 300);

  const handleInputChange = (key) => (e) => {
    e.preventDefault();
    const value = e.target.value;
    setValueSearch(value);
    debouncedSearch(key, value);
  };

  // const handleFocus = (key, e) => {
  //     activeInputRef.current = key;
  // };

//   useEffect(() => {
//     setValueSearch(name);
//   }, [name]);

  return (
    <div className="shopcategory-filters">
      <input
        type="text"
        placeholder="Search product by name"
        value={name}
        // onFocus={(e) => handleFocus("name", e)}
        onChange={handleInputChange("name")}
        onBlur={onFilterSubmit}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={priceFrom}
        // onFocus={(e) => handleFocus("priceFrom", e)}
        onChange={handleInputChange("priceFrom")}
        onBlur={onFilterSubmit}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={priceTo}
        // onFocus={(e) => handleFocus("priceTo", e)}
        onChange={handleInputChange("priceTo")}
        onBlur={onFilterSubmit}
      />
    </div>
  );
};

export default SearchFilters;
