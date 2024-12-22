import React from "react";
import { motion } from "framer-motion";

import "./CSS/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <h1 className="about-page-title">Giới thiệu</h1>
      <p className="about-page-subtitle">
        <span className="highlight">Sunny Figure</span>{" "}
        tự hào là nơi mang đến những sản phẩm độc đáo và chất lượng cho các khách hàng .
      </p>

      {/* Nội dung */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-page-content"
      >
        <div className="about-page-content">
          <p>
            1. Chúng tôi chuyên cung cấp các sản phẩm mô hình chất lượng, đa dạng từ nhân vật anime, manga đến game và văn hóa đại chúng.
            Tại <span className="highlight">Sunny Figure</span>, bạn sẽ tìm thấy
            những sản phẩm độc đáo và chất lượng cao để bổ sung vào bộ sưu tập của mình.
          </p>
          <p>
            2. Ngoài các mô hình nhân vật, chúng tôi còn cung cấp các sản phẩm
            liên quan khác như: sách, light novel, goods, và các vật phẩm trưng
            bày độc đáo.
          </p>
          <p>
            3. Chúng tôi hỗ trợ bạn thiết kế các giải pháp trưng bày và bảo quản
            sản phẩm, với các kệ mica, hộp kính, đảm bảo sự chuyên nghiệp và
            thẩm mỹ cho không gian của bạn.
          </p>
         
          <p>
            Chúng tôi hy vọng <span className="highlight">Sunny Figure</span> sẽ
            trở thành người bạn đồng hành trong hành trình đam mê của bạn, mang
            lại niềm vui và sự hài lòng tuyệt đối.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
