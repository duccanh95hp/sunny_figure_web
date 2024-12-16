import React, {createContext, useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ShopContext = createContext(null);

// const getDefaultCart = ()=>{
//     let cart = {};
//     for (let index = 0; index < all_product.length+1; index++) {
//        cart[index] = 0;
//     }
//     return cart;
// }

const ShopContextProvider = (props) =>{

    // const [cartItems, setCartItems] = useState(getDefaultCart())
    const [cartItems, setCartItems] = useState([])
    
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hay chưa
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
    
            if (existingItem) {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng mua
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantityBuy: cartItem.quantityBuy + 1 }
                        : cartItem
                );
            } else {
                // Nếu sản phẩm chưa có trong giỏ, thêm mới với số lượng 1
                return [...prevItems, { ...item, quantityBuy: 1 }];
            }
        });
        toast.success("Đặt hàng thành công");
    };
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(cartItem => cartItem.id === itemId);
    
            if (existingItem) {
                if (existingItem.quantityBuy > 1) {
                    // Nếu số lượng mua lớn hơn 1, chỉ giảm số lượng
                    return prevItems.map(cartItem =>
                        cartItem.id === itemId
                            ? { ...cartItem, quantityBuy: cartItem.quantityBuy - 1 }
                            : cartItem
                    );
                } else {
                    // Nếu số lượng mua là 1, xóa sản phẩm khỏi giỏ hàng
                    return prevItems.filter(cartItem => cartItem.id !== itemId);
                }
            }
            return prevItems; // Nếu sản phẩm không tồn tại, trả về giỏ hàng không thay đổi
        });
    };
    

    const getTotalCartAmount = () => {
        return cartItems.reduce((total, item) => total + item.quantityBuy * item.price, 0);
    }
    const getTotalCartItem = () => {
        return cartItems.reduce((total, item) => total + item.quantityBuy, 0);
    };

    const clearCart = () => {
        setCartItems([]); // Đặt cartItems thành mảng rỗng
    };

    const contextValue = {getTotalCartItem,getTotalCartAmount, cartItems, addToCart, removeFromCart, clearCart}

    

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider