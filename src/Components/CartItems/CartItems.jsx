import React, { useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CartItems.css'
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png'
import * as request from '../../utils/request.js'
import * as format from '../../utils/format.js'

const CartItems = () => {
    const {getTotalCartAmount, removeFromCart} = useContext(ShopContext)

    const { cartItems, clearCart } = useContext(ShopContext);

    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    const [deliveryInformation, setDeliveryInformation] = useState({
        telephone: '',
        address: '',
        name: '',
        id: null
    });

    const [product, setProduct] = useState([{
        productId: null,
        price: 0,
        quantity: 0
    }]);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const updatedProducts = cartItems.map(item => ({
            productId: item.id,
            price: item.price,
            quantity: item.quantityBuy,
        }));
        setProduct(updatedProducts);
        
        const fetchData = async () => {
            try{
                const response = await request.get('/delivery_information');
                setSavedAddresses(response.data)
            } catch (err) {
                console.error('Error fetching addresses:', error);
            }
        }
        if(token){
            fetchData();
        }
        
    }, [cartItems]); // Tham số [] đảm bảo chỉ chạy một lần khi component mount
    
    const [dataOrder, setDataOrder] = useState([{}]); // Tạo state để lưu dữ liệu sản phẩm
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm xử lý thay đổi thông tin giao hàng
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInformation({
            ...deliveryInformation,
            [name]: value
        });
    };

    const handleCheckout = async () => {
        // Validate dữ liệu (ví dụ)
        console.log("delivery", deliveryInformation)
        if ((!deliveryInformation.name || !deliveryInformation.telephone || !deliveryInformation.address)) {
            toast.error("Hãy điền đầy đủ thông tin giao hàng");
            return;
        }
        console.log("product", product)
        if(product.length <= 0) {
            toast.error("Bạn chưa mua hàng");
            return;
        }
        const fetchData = async () => {
            try {
               
                if(!token){
                    toast.warning("Bạn cần đăng nhập để mua hàng")
                    return;
                }
                const payload = {
                    paymentMethod: "chuyển khoản",
                    deliveryInformation: deliveryInformation,
                    orderDetailEntities: product
                };
                const response = await request.post('order', payload); // Gọi phương thức POST từ request.js với payload
                if(response.code)
                setDataOrder(response.data.result); // Lưu dữ liệu trả về vào state
                clearCart();
                toast.success("Thanh toán thành công! Cảm ơn bạn đã đặt hàng.");
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            } finally {
                setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
            }
        };
        
        
        fetchData();
        
    };
    const handleAddressSelect = (event) => {
        const addressId = event.target.value;
        const selected = savedAddresses.find(address => address.id == addressId);
        if (selected) {
            setDeliveryInformation({
                ...deliveryInformation,
                name: selected?.name || "",
                telephone: selected?.telephone || "",
                address: selected?.address || "",
                id: selected?.id || null
              });
        }
        setSelectedAddress(event.target.value);
      };
    
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Ảnh</p>
                <p>Tên sản phẩm</p>
                <p>Giá</p>
                <p>Số lượng</p>
                <p>Tổng</p>
                <p>Xóa</p>
            </div>
            <hr />
            {cartItems.map((e,i)=>{
              
                        return <div key={i}>
                                    <div className="cartitems-format cartitems-format-main">
                                        <img src={e.avatarUrl} alt="" className='carticon-product-icon' />
                                    
                                        <p>{e.name}</p>
                                        <p>{format.formatMoney(e.price)} VNĐ</p>
                                        <button className='cartitems-quantity'>{e.quantityBuy}</button>
                                        <p>{format.formatMoney(e.price*e.quantityBuy)} VNĐ</p>
                                        <img className='cartitems-remove-icon' src={remove_icon} onClick={() => {removeFromCart(e.id)}} alt="" />
                                
                                    </div>
                                    <hr />
                                </div>
                  
            })}
            <hr />
            <div className="delivery-information">
                <h2>Địa chỉ giao hàng</h2>
                <div className="delivery-content">
                {/* Form for entering new delivery information */}
                    <div className="delivery-form">
                    <form>
                        <div>
                        <label>Tên người nhận:</label>
                        <input
                            type="text"
                            name="name"
                            value={deliveryInformation.name}
                            onChange={handleInputChange}
                            placeholder="Nhập tên"
                        />
                        </div>
                        <div>
                        <label>Số điện thoại:</label>
                        <input
                            type="text"
                            name="telephone"
                            value={deliveryInformation.telephone}
                            onChange={handleInputChange}
                            placeholder="Số điện thoại"
                        />
                        </div>
                        <div>
                        <label>Địa chỉ :</label>
                        <input
                            type="text"
                            name="address"
                            value={deliveryInformation.address}
                            onChange={handleInputChange}
                            placeholder="Địa chỉ"
                        />
                        </div>
                    </form>
                    </div>

                    {/* Dropdown for selecting saved address */}
                    <div className="delivery-saved-addresses">
                        <h3>Lựa chọn địa chỉ</h3>
                        <select
                            value={selectedAddress}
                            onChange={handleAddressSelect}
                        >
                            <option value="">-- Chọn địa chỉ --</option>
                            {savedAddresses.map(address => (
                            <option key={address.id} value={address.id}>
                               {address.name} - {address.telephone} - {address.address}
                            </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Tổng tiền</p>
                            <p>{format.formatMoney(getTotalCartAmount())} VNĐ</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Phí ship</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>{format.formatMoney(getTotalCartAmount())} VNĐ</h3>
                        </div>
                    </div>
                    <button type="button" onClick={handleCheckout}>Thanh toán</button>
                </div>
                <div className="cartitems-promocode">
                    <p>Nhập mã khuyến mãi</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Mã code' />
                        <button>Submit</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CartItems