import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import * as request from "../../utils/request";
import { useAuth } from "../../Context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi submit mặc định của form

    try {
      const { name, password } = form;

      if (!name || !password) {
        toast.warning("Bạn cần điền thông tin để đăng nhập");
        return;
      }
      const payLoad = {
        username: name,
        password: password,
      };
      const response = await request.post("/auth/signin", payLoad);

      if (response.code === 200) {
        const token = response.data.accessToken;
        if (token) {
          sessionStorage.setItem("token", token);
          login(token);
        } else {
          console.error("Token not found in response");
        }
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(`${response.message}`);
      }
    } catch (err) {
      toast.error(`${err.response?.data?.message || "Đã xảy ra lỗi"}`);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Đăng nhập</h1>
      <p className="login-description">
        Trở lại với thế giới figure của Sunny Figure!
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-control">
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="name">Tên </label>
        </div>
        <div className="login-form-control">
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="password">Mật khẩu</label>
        </div>
        <button type="submit" className="login-submit-btn">
          Đăng nhập
        </button>
      </form>
      <div className="register-footer">
        Chưa có tài khoản?{" "}
        <a href="/register" className="register-login-link">
          Đăng ký ngay
        </a>
      </div>
    </div>
  );
};

export default Login;
