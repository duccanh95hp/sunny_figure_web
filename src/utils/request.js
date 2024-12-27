import axios from "axios";

const request = axios.create({
    baseURL: '/api',
    // baseURL: 'http://sunny-figure.pro.vn/api',
    timeout: 50000
})
const addAuthorizationHeader = (option = {}) => {
    const token = sessionStorage.getItem('token'); // Lấy JWT từ localStorage (hoặc nơi lưu trữ khác)
    return {
        ...option,
        headers: {
            ...option.headers, // Giữ lại các headers khác (nếu có)
            'Authorization': `Bearer ${token}`, // Thêm Authorization header
        },
    };
};
export const get = async(path, option = {}) => {
    const finalOption = addAuthorizationHeader(option); // Thêm Authorization header
    const response = await request.get(path, finalOption);
    return response.data;
}
// Method POST (có truyền body lên server)
export const post = async (path, data, option = {}) => {
    const finalOption = addAuthorizationHeader(option); // Thêm Authorization header
    const response = await request.post(path, data, finalOption); // truyền data vào
    return response.data;
};

// Method PUT (có truyền body để cập nhật)
export const put = async (path, data, option = {}) => {
    const finalOption = addAuthorizationHeader(option); // Thêm Authorization header
    const response = await request.put(path, data, finalOption); // truyền data vào
    return response.data;
};

// Method DELETE
export const del = async (path, option = {}) => {
    const finalOption = addAuthorizationHeader(option); // Thêm Authorization header
    const response = await request.delete(path, finalOption);
    return response.data;
};
export default request;