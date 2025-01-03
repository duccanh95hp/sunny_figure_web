import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./OrderManagement.css";
import * as request from "../../utils/request";
import * as format from "../../utils/format"

// You can use a simple modal or a library like Ant Design for the modal
import { Modal } from "antd"; // If you want to use Ant Design's Modal component
import { size } from "lodash";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // Order data
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchCriteria, setSearchCriteria] = useState({
    orderCode: null,
    name: null,
    email: null,
    phone: null,
    status: null,
    fromDate: null,
    toDate: null,
    page: 1,
    size: 10
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrder, setEditingOrder] = useState(null); // Order being edited
  const [viewingOrder, setViewingOrder] = useState(null); // Order being viewed

  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
  const [updateOrder, setUpdateOrder] = useState(null); // Đơn hàng đang được chỉnh sửa
  const [newStatus, setNewStatus] = useState(""); // Trạng thái mới được chọn

const handleOpenModal = (order) => {
  setUpdateOrder(order); // Lưu đơn hàng được chọn
  setNewStatus(order.status); // Hiển thị trạng thái hiện tại trong modal
  setIsModalOpen(true); // Mở modal
};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        searchCriteria.page = currentPage;
        const response = await request.post('/order/all', searchCriteria);
        setOrders(response.data.result);
        setTotalPages(response.data.totalPages)
        setLoading(false);
      } catch (err) {
        setOrders([]);
      } finally {

      }
    };
    fetchOrders();
  }, [searchCriteria, currentPage]);
  if (loading) return <p>Loading...</p>;

  // const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
      setSearchCriteria((prev) => ({ ...prev, [name]: value }));
      setCurrentPage(1);
    };
    const handleDateSearchChange = (event) => {
      const { name, value } = event.target;

    if (value) {
      // Chuyển đổi sang dd/MM/yyyy để gửi đi
      const [year, month, day] = value.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      setSearchCriteria((prevState) => ({
        ...prevState,
        [`${name}Display`]: value, // Lưu giá trị để hiển thị (yyyy-MM-dd)
        [name]: formattedDate,     // Lưu giá trị để gửi đi (dd/MM/yyyy)
      }));
    } else {
      setSearchCriteria((prevState) => ({
        ...prevState,
        [`${name}Display`]: value,
        [name]: value,
      }));
    }
  };
  

  const handleEditOrder = (order) => {
    setEditingOrder(order);
  };

  const handleSaveOrder = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === editingOrder.id ? editingOrder : order))
    );
    setEditingOrder(null);
  };

  const handleViewDetail = (order) => {
    const fetchData = async () => {
      try {
          const response = await request.get(`order/${order.id}`); // Gọi phương thức get từ request.js với payload
          setViewingOrder(response);
      } catch (err) {
          
          console.error(err);
      } finally {
          
      }
    };
    fetchData();
  };

  const closeDetailModal = () => {
    setViewingOrder(null);
  };

  const closeEditModal = () => {
    setEditingOrder(null);
  };

  const handleUpdateStatus = async () => {
    if (!updateOrder) return;
  
    try {
      const payLoad = {
        status: newStatus
      }
      // Call API để cập nhật trạng thái
      await request.post(`/order/status/${updateOrder.id}`, payLoad);
  
      // Cập nhật danh sách đơn hàng
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updateOrder.id ? { ...order, status: newStatus } : order
        )
      );
  
      // Đóng modal
      setIsModalOpen(false);
      setUpdateOrder(null);
      toast.success("Cập nhật thành công")
      
    } catch (error) {
     
      toast.error(error.response.data.message)
    }
  };
 

  return (
    <div className="order-management">
      <h2>Quản lý Đơn hàng</h2>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-fields">
          <input
            type="text"
            name="orderCode"
            placeholder="Mã đơn"
            value={searchCriteria.orderCode}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Tên khách hàng"
            value={searchCriteria.name}
            onChange={handleSearchChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={searchCriteria.email}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={searchCriteria.phone}
            onChange={handleSearchChange}
          />
          <select name="status" value={searchCriteria.status} onChange={handleSearchChange}>
            <option value="">Trạng thái</option>
            <option value="NEW">NEW</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
          <input
            placeholder="Từ ngày"
            type="date"
            name="fromDate"
            value={searchCriteria.fromDateDisplay || ""}
            onChange={handleDateSearchChange}
          />
          <input
            placeholder="Đến ngày"
            type="date"
            name="toDate"
            value={searchCriteria.toDateDisplay || ""}
            onChange={handleDateSearchChange}
          />
        </div>
      </div>

      {/* Orders Table */}
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Địa chỉ giao</th>
            <th>Tổng tiền</th>
            <th>Ngày thanh toán</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderCode}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.deliveryAddress}</td>
              <td>{format.formatMoney(order.totalPrice)} VNĐ</td>
              <td>{format.formatDate(order.paymentTime)}</td>
              <td >
                {/* {order.status} */}
                <button onClick={() => handleOpenModal(order)}>{order.status}</button>
              </td>
              <td>{format.formatDate(order.createdAt)}</td>
              <td>
                {/* <button onClick={() => handleEditOrder(order)}>Edit</button> */}
                <button onClick={() => handleViewDetail(order)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Order Detail Modal */}
      <Modal
        title="Chi tiết đơn hàng"
        visible={viewingOrder !== null}
        onCancel={closeDetailModal}
        footer={null}
      >
        {viewingOrder && (
                    <div>
                       <table>
                            <thead>
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewingOrder.data.detailDtoList.map((order) => (
                                    <tr key={order.image}>
                                        <td>
                                            <img
                                                src={order.image}
                                                alt={order.nameProduct}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </td>
                                        <td>{order.nameProduct}</td>
                                        <td>{order.quantity}</td>
                                        <td>{format.formatMoney(order.price)} VNĐ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
      </Modal>

      {/* Edit Order Modal */}
      {/* <Modal
        title="Edit Order"
        visible={editingOrder !== null}
        onCancel={closeEditModal}
        onOk={handleSaveOrder}
      >
        {editingOrder && (
          <>
            <p><strong>Order Code:</strong> {editingOrder.orderCode}</p>
            <input
              type="text"
              value={editingOrder.name}
              onChange={(e) =>
                setEditingOrder({ ...editingOrder, name: e.target.value })
              }
            />
            <input
              type="text"
              value={editingOrder.deliveryAddress}
              onChange={(e) =>
                setEditingOrder({ ...editingOrder, deliveryAddress: e.target.value })
              }
            />
            <select
              value={editingOrder.status}
              onChange={(e) =>
                setEditingOrder({ ...editingOrder, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </>
        )}
      </Modal> */}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Cập nhật trạng thái</h3>
         
            {/* <p><strong>Current Status:</strong> {selectedOrder?.status}</p> */}

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="NEW">NEW</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELED">CANCELED</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleUpdateStatus}>Save</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderManagement;
