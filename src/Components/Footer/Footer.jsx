import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'
import footer_logo from '../Assets/sunny_figure.jpg'
import instagram_icon from '../Assets/fb.png'
import pintester_icon from '../Assets/tictok.png'
import wwhatsapp_icon from '../Assets/youtobe.png'
const Footer = () => {
    return (
        <div className='footer'>
            <Link to='/'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>SUNNY FIGURE</p>
            </div>
            </Link>
            <ul className="footer-links">
                
                <Link to="/san-pham"><li>Products</li></Link>
                <Link to="/chinh-sach"><li>Policy</li></Link>
                <Link to="/gioi-thieu"><li>About</li></Link>
                <Link to="/lien-he"><li>Contact</li></Link>
            </ul>
            <div className="footer-social-icon">
                <Link to='https://www.facebook.com/sunnyFigure'>
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                </Link>
                <Link to='https://www.tiktok.com/@sunny_anime'>
                <div className="footer-icons-container">
                    <img src={pintester_icon} alt="" />
                </div>
                </Link>
                <Link to='https://www.youtube.com/@sunny_anime_vn'>
                <div className="footer-icons-container">
                    <img src={wwhatsapp_icon} alt="" />
                </div>
                </Link>
            </div>
            <div className="footer-coppyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reverved</p>
            </div>
        </div>
    )
}

export default Footer