# 1. Sử dụng image node chính thức để build ứng dụng
FROM node:16 AS build

# 2. Đặt thư mục làm việc bên trong container
WORKDIR /app

# 3. Sao chép package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# 4. Cài đặt dependencies
RUN npm install

# 5. Sao chép toàn bộ mã nguồn vào container
COPY . .

# 6. Build ứng dụng ReactJS
RUN npm run build

# 7. Sử dụng image Nginx để phục vụ ứng dụng
FROM nginx:alpine

# 8. Sao chép file build vào thư mục root của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# 9. Sao chép file cấu hình Nginx (tuỳ chọn)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 10. Expose cổng 80 để phục vụ ứng dụng
EXPOSE 80

# 11. Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
