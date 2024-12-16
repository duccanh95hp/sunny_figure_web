import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";
import * as request from "../utils/request.js";
import SearchFilters from "../Components/Filter/SearchFilters.jsx";

const ShopCategory = (props) => {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State cho bộ lọc
  const [filters, setFilters] = useState({
    name: "",
    priceFrom: "",
    priceTo: "",
  });

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);

  useEffect(() => {
    fetchProducts();
  }, [filters, page, props.category, size]);

  // Gọi API để lấy danh sách sản phẩm
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const payload = {
        page,
        size,
        categoryId: parseInt(props.category),
        name: filters.name.trim(),
        priceFrom: filters.priceFrom ? parseInt(filters.priceFrom) : undefined,
        priceTo: filters.priceTo ? parseInt(filters.priceTo) : undefined,
      };

      const response = await request.post("product", payload);
      setDataProduct(response.data === null ? [] : response.data.result);
    } catch (err) {
      setError("Error fetching data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, page, size, props.category]);

  // Debounce để giảm tần suất gọi API
  // const debouncedFetch = useCallback(
  //     debounce(() => {
  //         setPage(1); // Reset trang về 1 khi lọc
  //         fetchProducts();
  //     }, 500),
  //     [fetchProducts]
  // );

  // Gọi API lần đầu tiên hoặc khi `page`, `size`, hoặc `category` thay đổi
  // useEffect(() => {
  //     fetchProducts();
  // }, [fetchProducts]);

  // Cleanup debounce khi component bị unmount
  // useEffect(() => {
  //     return () => debouncedFetch.cancel();
  // }, [debouncedFetch]);

  const handleFiltersChange = (newFilters) => {  
    setFilters(newFilters);
  };

  const handleFilterSubmit = () => {
    // debouncedFetch();
  };
  console.log("banner", props.banner);
//   if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <SearchFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onFilterSubmit={handleFilterSubmit}
      />

      <div className="shopcategory-products">
        {dataProduct.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.avatarUrl}
              new_price={item.price}
              old_price={item.price}
            />
          );
        })}
      </div>
      <div className="shopcategory-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={dataProduct.length < size}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopCategory;
