import React, { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";

import './Navbar.css'
import logo from '../Assets/sunny_figure.jpg';
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from "../../Context/ShopContext";
import nav_drowdown from '../Assets/dropdown_icon.png'
import { useAuth } from "../../Context/AuthContext";
import avatar_icon from "../Assets/avatar_2.png"

const Navbar = () => {
    const [menu, setMenu] = useState("shop")
    const {getTotalCartItem} = useContext(ShopContext)
    const menuRef = useRef()
    // State để theo dõi trạng thái đăng nhập
    const { isLoggedIn, logout } = useAuth();

    const drowdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
    // Hàm xử lý logout

    return (
        <div className="navbar">
            <Link to='/'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>Sunny Figure</p>
            </div>
            </Link>
            <img className="nav-drowdown" onClick={drowdown_toggle} src={nav_drowdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() =>{setMenu("shop")}}><Link style={{ textDecoration: "none"}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={() =>{setMenu("san-pham")}}><Link style={{ textDecoration: "none"}} to='/san-pham'>Sản phẩm</Link>{menu==="san-pham"?<hr/>:<></>}</li>
                <li onClick={() =>{setMenu("gioi-thieu")}}><Link style={{ textDecoration: "none"}} to='/gioi-thieu'>Giới thiệu</Link>{menu==="gioi-thieu"?<hr/>:<></>}</li>
                <li onClick={() =>{setMenu("chinh-sach")}}><Link style={{ textDecoration: "none"}} to='/chinh-sach'>Chính sách</Link>{menu==="chinh-sach"?<hr/>:<></>}</li>
                <li onClick={() =>{setMenu("website")}}><Link style={{ textDecoration: "none"}} to='/sunny-website'>Sunny Website</Link>{menu==="website"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
            {isLoggedIn ? (
                <>
                <Link to="/profile" className="nav-avatar">
                 <img id="avatar_user" src={avatar_icon} alt="Avatar" />
                </Link>
               
                <button className="anime-button" onClick={logout}>Logout</button>
                </>
            ) : (
                // Hiển thị nút Login nếu chưa đăng nhập
                <Link to='/login'><button className="anime-button">Login</button></Link>
            )}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItem()}</div>
            </div>
        </div>
    )
}
export default Navbar