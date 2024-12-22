import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import * as format from "../../utils/format";

const Item = (props) => {
  return (
    <div className="product-page-product-item item">
      <Link to={`/product/${props.id}`}>
        <img
          src={props.avatarUrl}
          alt={props.name}
          className="product-page-product-image"
        />{" "}
      </Link>
      <h4 className="product-page-product-name">{props.name}</h4>
      <p className="product-page-product-price-old">
        Giá gốc: <span>{format.formatMoney(props.originalPrice)}₫</span>
      </p>
      <p className="product-page-product-price-new">
        Giá khuyến mại: <span>{format.formatMoney(props.price)}₫</span>
      </p>
    </div>
  );
};

export default Item;
