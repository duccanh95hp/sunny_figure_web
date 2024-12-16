import React, { useState, useEffect } from "react";
import './NewCollections.css'
import Item from "../Item/Item";
import * as request from '../../utils/request.js'

const NewCollections = () => {
    const [dataProduct, setDataProduct] = useState([{}]); // Tạo state để lưu dữ liệu sản phẩm
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Gọi API POST để lấy dữ liệu sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            try {
                const payload = {
                    page: 1,
                    size: 8,
                    type: "NEW"
                };
                const response = await request.post('product', payload); // Gọi phương thức POST từ request.js với payload
                setDataProduct(response.data.result); // Lưu dữ liệu trả về vào state
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            } finally {
                setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
            }
        };

        fetchData();
    }, []); // [] có nghĩa là chỉ gọi API một lần khi component được mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {dataProduct.map((item,i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.avatarUrl} new_price={item.price} old_price={item.price} />
                })}
            </div>
        </div>
    )
}

export default NewCollections