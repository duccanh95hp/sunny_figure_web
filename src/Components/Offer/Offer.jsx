import React from "react";
import './Offer.css'
import exculsive_image from '../Assets/luffy_bia.jpg'

const Offer = () => {
    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Exculsive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check now</button>
            </div>
            <div className="offers-right">
                <img src={exculsive_image} alt="" />
            </div>
        </div>
    )
}

export default Offer