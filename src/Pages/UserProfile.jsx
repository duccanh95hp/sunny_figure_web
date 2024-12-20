import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Button, Form, Row, Col, Modal, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as request from '../utils/request.js'
import './CSS/UserProfile.css';
import * as format from '../utils/format.js'
import moment from "moment";
import { size } from 'lodash';

const { Option } = Select;

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [form] = Form.useForm();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchFilters, setSearchFilters] = useState({
        fromDate: null,
        toDate: null,
        status: null
    });
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        // Gọi API lấy thông tin người dùng
        const fetchUserProfile = async () => {
            try {
                const userData = await request.get('/api/auth/detail');
                console.log("user",userData)
                setUser(userData);
                form.setFieldsValue({
                    username: userData.data.username,
                    email: userData.data.email,
                    telephone: userData.data.telephone,
                    address: userData.data.address,
                    birthday: moment(userData.data.birthday, "DD-MM-YYYY"),
                    affiliateCode: userData.data.affiliateCode,
                    affiliateAmount: format.formatMoney(userData.data.affiliateAmount) + " VNĐ"
                });
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };
        

        // Gọi API lấy danh sách đơn hàng
        const fetchOrders = async () => {
            const payLoad = {
                size: 99999,
                page: 1,
                fromDate: searchFilters.fromDate,
                toDate: searchFilters.toDate,
                status: searchFilters.status
            }
            
            try {
                const orderData = await request.post('/order/all', payLoad);
                setOrders(orderData.data.result);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchUserProfile();
        fetchOrders();
    }, []);
    const handleFormSubmit = async (values) => {
        try {
            const payload = {
                telephone: values.telephone,
                address: values.address,
                birthday: values.birthday.format("YYYY-MM-DD"), // Chuyển ngày sinh về định dạng cần lưu trữ
            };
            await request.post('/api/auth/update', payload);
            toast.success("Cập nhật thành công")
           
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error('Cập nhật thất bại')
        }
    };

    const handleSearch = () => {
        const { fromDate, toDate, status } = searchFilters;
    
        // Thiết lập payload từ searchFilters
        const payLoad = {
            fromDate: fromDate || null,
            toDate: toDate || null,
            status: status || null
        };
    
        // Gọi fetchOrders với payload mới
        fetchOrders(payLoad);
    };
    
    const fetchOrders = async (payLoad) => {
        try {
            const orderData = await request.post('/order/all', payLoad);
            if (orderData && orderData.data && orderData.data.result) {
                setOrders(orderData.data.result); // Cập nhật state với dữ liệu API
            } else {
                setOrders([]); // Nếu không có dữ liệu
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            setOrders([]);
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setSearchFilters((prev) => ({ ...prev, status: value }));
    };

    const showDetails = (order) => {
        const fetchData = async () => {
            try {
                
                const response = await request.get(`order/${order.id}`); // Gọi phương thức get từ request.js với payload
                setSelectedOrder(response);
                console.log("selectedOrder",selectedOrder)
               
            } catch (err) {
                
                console.error(err);
            } finally {
                
            }
        };
        fetchData();
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: "Mã Order",
            dataIndex: "orderCode",
            key: "orderCode",
        },
        {
            title: "Thời gian đặt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value) => format.formatDate(value),
        },
        {
            title: "Thời gian thanh toán",
            dataIndex: "paymentTime",
            key: "paymentTime",
            render: (value) => format.formatDate(value),
        },
        {
            title: "Tổng tiền (VNĐ)",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (value) => format.formatMoney(value),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color =
                    status === "Completed"
                        ? "green"
                        : status === "Cancelled"
                        ? "red"
                        : "blue";
                return <span style={{ color }}>{status}</span>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button type="link" onClick={() => showDetails(record)}>
                    Detail
                </Button>
            ),
        },
    ];


    return (
        <div className="user-profile">
            <h1>Thông tin User</h1>
            {user ? (
                <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                style={{ maxWidth: "600px" }}
            >
                <Form.Item
                    label="Tên"
                    name="username"
                >
                    <Input readOnly />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input readOnly />
                </Form.Item>

                <Form.Item
                    label="Điện thoại"
                    name="telephone"
                    rules={[
                        { required: true, message: "Phone is required" },
                        { pattern: /^\d+$/, message: "Phone must be numbers only" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: "Address is required" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ngày sinh"
                    name="birthday"
                    rules={[{ required: true, message: "Date of Birth is required" }]}
                >
                    <DatePicker
                        format="DD/MM/YYYY"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Mã giới thiệu"
                    name="affiliateCode"
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    label="Tiền hoa hồng"
                    name="affiliateAmount"
                >
                    <Input readOnly />
                </Form.Item>
                <div className='note_affiliate'>Khi lớn hơn 100,000 VNĐ có thể liên hệ Admin qua Sđt/zalo: 0795345097 để nhận tiền hoa hồng </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
               
            </Form>
            ) : (
                <p>Loading user information...</p>
            )}

            <h2>Danh sách đơn hàng</h2>
            <div style={{ padding: 20 }}>
            {/* <h2>Order List</h2> */}
            <Form
                layout="vertical"
                style={{ marginBottom: 20 }}
            >
                <Row gutter={16}>
                    
                    <Col span={3}>
                        <Form.Item label="From">
                            <Input
                                name="from"
                                placeholder="Enter starting location"
                                onChange={handleInputChange}
                                value={searchFilters.fromDate}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label="To">
                            <Input
                                name="to"
                                placeholder="Enter destination"
                                onChange={handleInputChange}
                                value={searchFilters.toDate}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label="Status">
                            <Select
                                placeholder="Select status"
                                onChange={handleSelectChange}
                                value={searchFilters.status}
                                allowClear
                            >
                                <Option value="COMP">Completed</Option>
                                <Option value="PROCESS">Processing</Option>
                                <Option value="CANCEL">Cancelled</Option>
                                <Option value="NEW">New</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col span={3}>
                        <Form.Item label="Size">
                            <Input
                                name="size"
                                placeholder="Enter destination"
                                onChange={handleInputChange}
                                value={searchFilters.size}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label="Page">
                            <Input
                                name="page"
                                placeholder="Enter destination"
                                onChange={handleInputChange}
                                value={searchFilters.page}
                            />
                        </Form.Item>
                    </Col> */}
                </Row>
                <Button onClick={handleSearch} type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    Search
                </Button>
            </Form>
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{
                    pageSize: 10, // Số lượng hiển thị mỗi trang
                    total: orders.length, // Tổng số mục (thay bằng tổng từ API nếu có)
                    onChange: (page, pageSize) => {
                        setSearchFilters((prev) => ({
                            ...prev,
                            page: page,
                            size: pageSize,
                        }));
            
                        // Gọi API với trang mới
                        const newPayLoad = { ...searchFilters, page, size: pageSize };
                        fetchOrders(newPayLoad);
                    },
                }}
            />
            <Modal
                title="Order Details"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Close
                    </Button>,
                ]}
            >
                {selectedOrder && (
                    <div>
                       <table>
                            <thead>
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.data.detailDtoList.map((order) => (
                                    <tr key={order.image}>
                                        <td>
                                            <img
                                                src={order.image}
                                                alt={order.nameProduct}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </td>
                                        <td>{order.nameProduct}</td>
                                        <td>{order.quantity}</td>
                                        <td>{format.formatMoney(order.price)} VNĐ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>
        </div>
        </div>
    );
};

export default UserProfile;
