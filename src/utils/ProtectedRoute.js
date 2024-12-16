import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token'); // Hoặc sessionStorage.getItem('token')

  if (!token) {
    // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token); // Decode JWT để lấy thông tin user
    console.log("tocken", decodedToken)
    const userRole = decodedToken.sub; // Thay "role" bằng key role của bạn trong payload
    console.log("userRole", userRole)

    if (!allowedRoles.includes(userRole)) {
      // Chuyển hướng nếu role không được phép
      return <Navigate to="/unauthorized"  />;
    }

    return children; // Cho phép truy cập nếu role hợp lệ
  } catch (error) {
    console.error('Invalid token', error);
    // Chuyển hướng đến login nếu token không hợp lệ
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
