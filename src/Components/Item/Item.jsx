import React from "react";
import './Item.css'
import { Link } from "react-router-dom";
import * as format from '../../utils/format' 

const Item = (props) => {
    return (
        <div className='item'>
           <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
            <p>{props.name}</p>
            <div className="item-price">
                <div className="item-price-new">
                    {format.formatMoney(props.new_price) } VNĐ
                </div>
                <div className="item-price-old">
                    {format.formatMoney(props.old_price) } VNĐ
                </div>
            </div>
        </div>
    )
}

export default Item