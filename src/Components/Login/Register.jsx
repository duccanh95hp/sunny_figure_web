import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import * as request from "../../utils/request";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, email, password, confirmPassword } = form;
      if (password !== confirmPassword) {
        toast.warning("Mật khẩu không khớp!");
        return;
      }
      const payload = {
        username: username,
        email: email,
        password: password,
      };
      const response = await request.post("/api/auth/signup", payload);

      if (response.code === 200) {
        toast.success(response.message);
        navigate("/login")
      } else {
        toast.error(`${response.message}`);
      }
    } catch (err) {}
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Đăng ký</h1>
      <p className="register-description">
        Tham gia Sunny Figure và khám phá thế giới của những bộ figure độc đáo!
      </p>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form-control">
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="username">Tên đăng nhập</label>
        </div>
        <div className="register-form-control">
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="register-form-control">
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
        <div className="register-form-control">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        </div>
        <button type="submit" className="register-submit-btn">
          Đăng ký
        </button>
      </form>
      <div className="register-footer">
        Đã có tài khoản?{" "}
        <a href="/login" className="register-login-link">
          Đăng nhập ngay
        </a>
      </div>
    </div>
  );
};

export default Register;
