import React, { useContext } from "react";
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from "../../Context/ShopContext";
import * as format from '../../utils/format'

const ProductDisplay = (props) => {
    const {product} = props
    const {addToCart} = useContext(ShopContext)
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.avatarUrl} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">{format.formatMoney(product.originalPrice)} VNĐ</div>
                    <div className="productdisplay-right-price-new">{format.formatMoney(product.price)} VNĐ</div>
                </div>

                <div className="productdisplay-right-description">
                    {product.description}
                </div>

                <div className="productdisplay-right-description">
                    <span>Chiều cao :</span> {product.height}
                </div>

                <div className="productdisplay-right-description">
                    <span>Trọng lượng :</span> {product.weight}
                </div>

                <div className="productdisplay-right-description">
                   <span>Phụ kiện :</span> {product.accessory}
                </div>

                <div className="productdisplay-right-description">
                   <span>Vỏ hộp kèm sản phẩm :</span> {product.box}
                </div>

                <p className="productdisplay-right-category"><span>Category : </span>{product.category.name}</p>
                <p className="productdisplay-right-category"><span>Chất liệu : </span>{product.manufacturer}</p>

                <div className="productdisplay-right-description">
                   <span>Số lượng :</span> {product.stockQuantity}
                </div>
                
                <button className="button-add-to-cart" onClick={()=>{addToCart(product)}}>Thêm vào giỏ</button>
                
            </div>
        </div>
    )
}

export default ProductDisplay