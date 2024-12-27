import React from "react";
import { Link } from "react-router-dom";

import './Offer.css';
import exculsive_image from '../Assets/luffy_bia.jpg';

const Offer = () => {
    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <Link to="/san-pham"><button>Check now</button></Link>
            </div>
            <div className="offers-right">
                <img src={exculsive_image} alt="Exclusive Offer" />
            </div>
        </div>
    );
};

export default Offer;
