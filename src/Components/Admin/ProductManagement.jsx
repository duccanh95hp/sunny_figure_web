import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './ProductManagement.css'
import * as request from "../../utils/request";
import * as format from "../../utils/format"

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    categoryName: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    size: 10
  });
  

  const [productData, setProductData] = useState({
    avatarUrl: "",
    name: "",
    price: "",
    nameCategory: "",
    stockQuantity: "",
    manufacturer: "",
    height: "",
    weight: "",
    box: "",
    createdAt: "",
    categoryId: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCat = await request.post('/category/all',{name: null, status: null}); // Gọi phương thức POST từ request.js với payload
        setCategories(responseCat.data); // Lưu dữ liệu trả về vào state
      } catch (err) {
          setError('Error fetching data');
          console.error(err);
      } finally {
          
      }
    };
    fetchData();
  },[]);
  

  useEffect(() => {
          const fetchData = async () => {
              try {
                  searchCriteria.page = currentPage;
                  const response = await request.post('/product', searchCriteria); // Gọi phương thức POST từ request.js với payload
                  setProducts(response.data.result); // Lưu dữ liệu trả về vào state
                  setTotalPages(response.data.totalPages)

                  // const responseCat = await request.post('/category/all',{name: null, status: null}); // Gọi phương thức POST từ request.js với payload
                  // setCategories(responseCat.data); // Lưu dữ liệu trả về vào state
              } catch (err) {
                  setError('Error fetching data');
                  setProducts([]);
                  console.error(err);
              } finally {
                  setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
              }
          };
          fetchData();
      }, [searchCriteria, currentPage]); // [] có nghĩa là chỉ gọi API một lần khi component được mount
  
      if (loading) return <p>Loading...</p>;
      // if (error) return <p>{error}</p>;

  
  // const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleAddNewProduct = () => {
    setIsEditMode(false);
    setProductData({
      file: null,
      name: "",
      price: "",
      originalPrice: "",
      nameCategory: "",
      stockQuantity: "",
      manufacturer: "",
      height: "",
      weight: "",
      box: "",
      categoryId: null,
      accessory: "",
      description: ""
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (id) => {
    const product = products.find((prod) => prod.id === id);
    if (product) {
      setIsEditMode(true);
      setProductId(id);
      setProductData({...product, categoryId: product.category.id || ""});
      setIsModalOpen(true);
    }
  };

  const handleDeleteProduct = (id) => {
    // Hiển thị thông báo xác nhận bằng toast
    toast.info(
      <div>
        <p>Bạn chắc chắn xóa sản phẩm này ?</p>
        <button
          onClick={() => confirmDelete(id)}
          style={{
            margin: "0 10px",
            padding: "5px 10px",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss()}
          style={{
            padding: "5px 10px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          No
        </button>
      </div>,
      { autoClose: false } // Không tự động đóng để chờ người dùng chọn
    );
  };
  
  const confirmDelete = async (id) => {
    toast.dismiss(); // Đóng thông báo xác nhận
    try {
      // Gọi API xóa sản phẩm
      await request.del(`/product/${id}`);
      setProducts((prevProducts) => prevProducts.filter((prod) => prod.id !== id));
      toast.success("Xóa thành công");
    } catch (err) {
      console.error(err);
      toast.error("Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = () => {
    if (isEditMode) {
      const formData = new FormData();
      if (productData.file) formData.append("file", productData.file);
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("originalPrice", productData.originalPrice)
      formData.append("categoryId", productData.categoryId);
      formData.append("stockQuantity", productData.stockQuantity);
      formData.append("manufacturer", productData.manufacturer);
      formData.append("height", productData.height);
      formData.append("weight", productData.weight);
      formData.append("box", productData.box);
      formData.append("accessory", productData.accessory)
      formData.append("description",productData.description)
      const fetchData = async () => {
             try {
                 const response = await request.post(`/product/${productData.id}`,formData,{
                  headers: {
                    "Content-Type": "multipart/form-data", // Đảm bảo Content-Type đúng
                  }
                 }); // Gọi phương thức POST từ request.js với payload
                //  setProducts([ response.data, ...products]);
                 // Update product
                setProducts((prevProducts) =>
                  
                  prevProducts.map((prod) =>
                    prod.id === response.data.id ? { ...prod, ...response.data } : prod
                  )
                );
                toast.success("Cập nhật thành công")
             } catch (err) {
                 setError('Error fetching data');
                 toast.error("Cập nhật thất bại")
             } finally {
                 setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
             }
           };
     
           fetchData();
      
    } else {
      // Add new product
      const payLoad = productData;
      const fetchData = async () => {
             try {
                 const response = await request.post('/product',payLoad,{
                  headers: {
                    "Content-Type": "multipart/form-data", // Đảm bảo Content-Type đúng
                  },
                 }); // Gọi phương thức POST từ request.js với payload
                 setProducts([ response.data, ...products]);
                 toast.success("Thêm mới thành công")
             } catch (err) {
                 toast.error("Thêm mới thất bại")
                 console.error(err);
             } finally {
                 setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
             }
           };
           fetchData();
    }

    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find((cat) => cat.id === Number(selectedCategoryId));
  
    setProductData((prev) => ({
      ...prev,
      nameCategory: selectedCategory ? selectedCategory.name : "",
      categoryId: selectedCategoryId,
      
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData((prev) => ({
      ...prev,
      file: file, // Lưu file đã chọn vào state
    }));
  };

  return (
    <div>
       <h2>Quản lý Sản phẩm</h2>
      {/* Add New Product Button */}
      <button onClick={handleAddNewProduct}>Thêm mới Sản phẩm</button>

      <div className="search-section">
        {/* <h3>Search Products</h3> */}
        <input
          type="text"
          name="name"
          placeholder="Tên Sản phẩm"
          value={searchCriteria.name}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="categoryName"
          placeholder="Tên Danh mục"
          value={searchCriteria.categoryName}
          onChange={handleSearchChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Giá nhỏ nhất"
          value={searchCriteria.minPrice}
          onChange={handleSearchChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Giá lớn nhất"
          value={searchCriteria.maxPrice}
          onChange={handleSearchChange}
        />
      </div>

      {/* Product Table */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên Sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Vật liệu</th>
            <th>Chiều cao</th>
            <th>Cân nặng</th>
            <th>Box</th>
            <th>Ngày tạo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.avatarUrl} alt={product.name} width="50" />
              </td>
              <td>{product.name}</td>
              <td>{format.formatMoney(product.price)} VND</td>
              <td>{product.category.name}</td>
              <td>{product.stockQuantity}</td>
              <td>{product.manufacturer}</td>
              <td>{product.height}</td>
              <td>{product.weight}</td>
              <td>{product.box}</td>
              <td>{format.formatDate(product.createdAt)}</td>
              <td>
                <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                <button style={{ backgroundColor: "red"}} onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h3>{isEditMode ? "Sửa Sản phẩm" : "Thêm Sản phẩm"}</h3>
            <div>
              <label>
                Upload Ảnh:
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Tên Sản phảm:
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Giá:
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Giá gốc
                <input
                  type="number"
                  name="originalPrice"
                  value={productData.originalPrice}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Danh mục:
                <select
                  name="nameCategory"
                  value={productData.categoryId}
                  onChange={(e) => handleCategoryChange(e)}
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <option value="">Chọn Danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                Tồn kho:
                <input
                  type="number"
                  name="stockQuantity"
                  value={productData.stockQuantity}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Vật liệu:
                <input
                  type="text"
                  name="manufacturer"
                  value={productData.manufacturer}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Chiều cao:
                <input
                  type="text"
                  name="height"
                  value={productData.height}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Cân nặng:
                <input
                  type="text"
                  name="weight"
                  value={productData.weight}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Box:
                <input
                  type="text"
                  name="box"
                  value={productData.box}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Phụ kiện:
                <input
                  type="text"
                  name="accessory"
                  value={productData.accessory}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>

            <div>
              <label>
                Mô tả:
                <input
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
           
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleSaveProduct}>
                {isEditMode ? "Save Changes" : "Add"}
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
