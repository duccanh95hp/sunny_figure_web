import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./CSS/ProductPage.css";
import * as request from "../utils/request";
import * as format from "../utils/format";

// Component duy nhất
const ProductPage = () => {
  const [filters, setFilters] = useState({
    name: "",
    categoryId: "",
    priceFrom: "",
    priceTo: "",
    page: 1,
    size: 9,
  });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [priceToOptions, setPriceToOptions] = useState([
    "100000",
    "200000",
    "500000",
    "1000000",
    "1500000",
    "2000000",
  ]);
  const updatePriceToOptions = (selectedPriceFrom) => {
    const allPriceToOptions = [
      "100000",
      "200000",
      "500000",
      "1000000",
      "1500000",
      "2000000",
    ];
  
    const updatedOptions = allPriceToOptions.filter(
      (price) => Number(price) >= Number(selectedPriceFrom)
    );
  
    setPriceToOptions(updatedOptions);
  };
  // Lấy danh mục sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await request.post("/category/all", {
        name: null,
        status: "ACTIVE",
      });

      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await request.post("/product", filters);
        setProducts(response.data.result);
        setTotal(response.data.totalPages);
      } catch (err) {
        console.log(err);
        setProducts([]);
        setTotal(1);
      }
    };

    fetchProducts();
  }, [filters]);

  // Thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value, page: 1 }); // Reset về trang 1 khi thay đổi bộ lọc
  };

  // Chuyển trang
  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <div className="product-page-container">
      {/* Bộ lọc sản phẩm */}
      <div className="product-page-filter-section">
        <h3>Bộ lọc sản phẩm</h3>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Danh mục:</label>
          <select
            name="categoryId"
            value={filters.categoryId}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Giá từ:</label>
          <select
            name="priceFrom"
            value={filters.priceFrom}
            onChange={(e) => {
              handleFilterChange(e);
              updatePriceToOptions(e.target.value); // Cập nhật "Giá đến"
            }}
          >
            <option value="0">0</option>
            <option value="100000">100,000</option>
            <option value="200000">200,000</option>
            <option value="500000">500,000</option>
            <option value="1000000">1,000,000</option>
            <option value="1500000">1,500,000</option>
          </select>
        </div>

        <div>
          <label>Đến:</label>
          <select
            name="priceTo"
            value={filters.priceTo}
            onChange={handleFilterChange}
          >
            <option value="">Không giới hạn</option> {/* Giá trị mặc định */}
            {priceToOptions.map((price) => (
              <option key={price} value={price}>
                {format.formatMoney(price).toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <button onClick={() => setFilters({ ...filters, page: 1 })}>
          Tìm kiếm
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="product-page-product-section">
        <h3>Danh sách sản phẩm</h3>
        <div className="product-page-product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-page-product-item">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.avatarUrl}
                  alt={product.name}
                  className="product-page-product-image"
                />
                <h4 className="product-page-product-name">{product.name}</h4>
                <p className="product-page-product-price-old">
                  Giá gốc:{" "}
                  <span>{format.formatMoney(product.originalPrice)}₫</span>
                </p>
                <p className="product-page-product-price-new">
                  Giá khuyến mại:{" "}
                  <span>{format.formatMoney(product.price)}₫</span>
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="product-page-pagination">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page <= 1}
          >
            Trước
          </button>
          <span>
            Trang {filters.page} / {total}
          </span>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page >= Math.ceil(total / filters.pageSize)}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
