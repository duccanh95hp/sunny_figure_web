import React from "react";
import './Hero.css'

const Hero = () => {
    return (
        <div className="anime-banner">
            <div className="overlay">
                <h1 className="title">
                    <span className="animated-text">Sunny Figure</span>
                </h1>
                <p className="subtitle">Chào mừng bạn đến với thế giới anime đầy màu sắc!</p>
                {/* <button className="cta-button">Khám Phá Ngay</button> */}
            </div>
        </div>
    )
}

export default Hero