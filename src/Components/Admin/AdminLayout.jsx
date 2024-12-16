import React, {useState} from 'react';
import './AdminLayout.css';
import OrderManagement from './OrderManagement';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  const handleMenuClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="header">
        <h1>Admin Panel</h1>
      </header>

      {/* Sidebar */}
      <div className="main-content">
        <aside className="sidebar">
          <div className="menu-item" onClick={() => handleMenuClick("Dashboard")}>Dashboard</div>
          <div className="menu-item dropdown">
            <span>Quản lý User</span>
            <div className="dropdown-content">
              <div onClick={() => handleMenuClick("Users")}>Users</div>
              <div onClick={() => handleMenuClick("Roles")}>Roles</div>
            </div>
          </div>
          <div className="menu-item" onClick={() => handleMenuClick("Orders")}>Quản lý Đơn hàng</div>
          <div className="menu-item" onClick={() => handleMenuClick("Category")}>Quản lý Danh mục</div>
          <div className="menu-item" onClick={() => handleMenuClick("Product")}>Quản lý Sản phẩm</div>
          <div className="menu-item" onClick={() => handleMenuClick("Settings")}>Settings</div>
        </aside>

        {/* Main Content */}
        <section className="content">
          {activePage === "Dashboard" && <h2>Welcome to the Dashboard</h2>}
          {activePage === "Users" && <h2>Manage Users</h2>}
          {activePage === "Roles" && <h2>Manage Roles</h2>}
          {activePage === "Settings" && <h2>Application Settings</h2>}
          {activePage === "Orders" && <OrderManagement />}
          {activePage === "Category" && <CategoryManagement />}
          {activePage === "Product" && <ProductManagement />}
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
