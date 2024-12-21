import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./CategoryManagement.css";

import * as request from "../../utils/request";

const CategoryManagement = () => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const [filters, setFilters] = useState({ name: null, status: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("ACTIVE");
  const pageSize = 5;

 useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.post('/category/all', filters); // Gọi phương thức POST từ request.js với payload
                setCategories(response.data); // Lưu dữ liệu trả về vào state
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            } finally {
                setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
            }
        };
        fetchData();
    }, [filters]); // [] có nghĩa là chỉ gọi API một lần khi component được mount
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

  const handleAddNewCategory = () => {
    setIsEditMode(false);
    setCategoryName("");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditCategory = (id) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setIsEditMode(true);
      setCategoryId(id);
      setCategoryName(category.name);
      setDescription(category.description);
      setIsModalOpen(true);
    }
  };

   const handleSaveCategory = async () => {
    if (isEditMode) {
      // Edit logic
      
      const updateCategory = {
        name: categoryName,
        description: description,
        status: status
      };
      const fetchData = async () => {
        try {
            await request.put(`/category/${categoryId}`,updateCategory); // Gọi phương thức POST từ request.js với payload
            toast.success("Cập nhật thành công")
            setCategories((prevCategories) =>
              prevCategories.map((cat) =>
                cat.id === categoryId
                  ? { ...cat, name: categoryName, status }
                  : cat
              )
            );
        } catch (err) {
            setError('Error fetching data');
            toast.error("Cập nhật thất bại")
            console.error(err);
        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
        }
      };
      fetchData();
    } else {
      // Add logic
      const newCategory = {
        name: categoryName,
        description: description,
      };
      const fetchData = async () => {
        try {
            const respon = await request.post('/category', newCategory); // Gọi phương thức POST từ request.js với payload
            setCategories([...categories, respon.data]);
            toast.success("Tạo mới thành công")
        } catch (err) {
            setError('Error fetching data');
            toast.error("Tạo mới thất bại")
            console.error(err);
        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
        }
      };
      fetchData();
    }

    // Reset state and close modal
    setIsModalOpen(false);
    setCategoryName("");
    setDescription("");
  };
const handleDeleteCategory = (id) => {
  toast.info(
    <div>
      <p>Bạn có xóa Danh mục này không ?</p>
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
    { autoClose: false } // Disable auto-close for confirmation
  );
};

const confirmDelete = async (id) => {
  toast.dismiss(); // Close the confirmation toast
  try {
    await request.del(`/category/${id}`);
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
    toast.success("Xóa thành công");
  } catch (err) {
    console.error(err);
    toast.error("Xóa thất bại");
  }
};


  // const filteredCategories = categories.filter((category) =>
  //   category.name.toLowerCase().includes(filters.name.toLowerCase())
  // );

  const paginatedCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  const totalPages = Math.ceil(categories.length / pageSize);

  return (
    <div className="category-management">
      <h2>Quản lý Danh mục</h2>

      {/* Add New Button */}
      <button onClick={handleAddNewCategory}>Thêm mới danh mục</button>

      {/* Filter */}
      <div className="search-section">
        <input
          type="text"
          name="name"
          placeholder="Tên Danh mục"
          value={filters.name}
          onChange={handleFilterChange}
        />
      </div>

      {/* Categories Table */}
      <table className="categories-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Danh mục</th>
            <th>Trạng thái</th>
            <th>Mô tả</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCategories.map((category, index) => (
            <tr key={category.id}>
              <td>{(currentPage - 1) * pageSize + index + 1}</td>
              <td>{category.name}</td>
              <td>{category.status}</td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => handleEditCategory(category.id)}>Edit</button>
                <button style={{backgroundColor: "red"}} onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {paginatedCategories.length === 0 && (
            <tr>
              <td colSpan="4">No categories found.</td>
            </tr>
          )}
        </tbody>
      </table>

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
            <h3 style={{marginBottom : "10px"}}>{isEditMode ? "Sửa Danh mục" : "Thêm Danh mục"}</h3>
            <div className="addcategory">
              <label>
                Tên Danh mục:
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Trạng thái:
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Mô tả:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleSaveCategory}>
                {isEditMode ? "Save Changes" : "Add"}
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
