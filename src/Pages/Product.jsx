import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

import * as request from '../utils/request.js'

const Product = () => {
    const {productId} = useParams();
    const [dataProduct, setDataProduct] = useState({}); // Tạo state để lưu dữ liệu sản phẩm
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Gọi API POST để lấy dữ liệu sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await request.get(`product/${productId}`); // Gọi phương thức POST từ request.js với payload
                setDataProduct(response.data); // Lưu dữ liệu trả về vào state
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
        <div>
            <Breadcrum product={dataProduct}/>
            <ProductDisplay product={dataProduct}/>
            <DescriptionBox/>
            <RelatedProducts categoryId= {dataProduct.category.id}/>
        </div>
    )
}

export default Product