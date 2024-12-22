import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CSS/SunnyWebsitePage.css";

const SunnyWebsitePage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="policy-page">
      {/* Header */}
      <h1 className="policy-page-title">Chào mừng đến với Sunny Website</h1>
      <p className="policy-page-subtitle">
        Dịch vụ thiết kế web chuyên nghiệp từ A-Z, cam kết tạo ra những sản phẩm chất lượng, thu hút và hiệu quả.
      </p>

      {/* Chính sách bán hàng */}
      <div className="policy-section">
        <h2
          className="policy-section-title"
          onClick={() => toggleSection("salePolicy")}
        >
          Lợi ích của website bán hàng
        </h2>
        <AnimatePresence>
          {activeSection === "salePolicy" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="policy-section-content"
            >
              <h4>1. Giúp tăng độ nhận diện thương hiệu</h4>
             
              <h4>2. Tăng khả năng tiếp cận khách hàng.</h4>
              
              <h4>3. Chi phí tiết kiệm vận hành đơn giản.</h4>
              
              <h4>4. Chi phí dành cho quảng cáo thấp.</h4>
             
              <h4>5. Tối ưu hóa chất lượng dịch vụ</h4>
              
              <h4>6. Thúc đẩy doanh số tăng lợi nhuận bán hàng. </h4>

              <h4>7. Tăng khả năng cạnh tranh so với đối thủ. </h4>

              <h4>8. Mở rộng phạm vi tiếp cận.</h4>

              <h4>9. Mua sắm thoải mái.</h4>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Lý Do Chọn Sunny Website */}
      <div className="policy-section">
        <h2
          className="policy-section-title"
          onClick={() => toggleSection("warrantyPolicy")}
        >
          Lý Do Chọn Sunny Website
        </h2>
        <AnimatePresence>
          {activeSection === "warrantyPolicy" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="policy-section-content"
            >
              <h4>1. Chuyên Nghiệp</h4>
              <p>
                - Đội ngũ của chúng tôi có kinh nghiệm lâu năm trong lĩnh vực thiết kế và phát triển web.
              </p>
              <h4>2. Tùy Chỉnh Cao</h4>
              <p>
                - Chúng tôi cung cấp các giải pháp tùy chỉnh theo nhu cầu cụ thể của từng khách hàng.
              </p>
              <h4>3. Hỗ Trợ 24/7</h4>
              <p>
                - Đảm bảo hỗ trợ nhanh chóng và hiệu quả mọi lúc, mọi nơi.
              </p>
              <h4>4. Cam Kết Chất Lượng</h4>
              <p>
                - Sản phẩm được tạo ra từ sự tận tâm và chất lượng là tiêu chí hàng đầu của chúng tôi.
              </p>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cam Kết Của Sunny Website */}
      <div className="policy-section">
        <h2
          className="policy-section-title"
          onClick={() => toggleSection("partnerPolicy")}
        >
          Cam Kết Của Sunny Website
        </h2>
        <AnimatePresence>
          {activeSection === "partnerPolicy" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="policy-section-content"
            >
               <h4>1. Đảm Bảo Sự Hài Lòng</h4>
              <p>
                - Chúng tôi cam kết mang lại sự hài lòng tuyệt đối cho khách hàng với mỗi dự án.
              </p>
              <h4>2. Bảo Mật Thông Tin</h4>
              <p>
                - Mọi thông tin của khách hàng sẽ được bảo mật tuyệt đối, đảm bảo sự riêng tư và an toàn.
              </p>
              <h4>3. Đảm Bảo Tiến Độ</h4>
              <p>
                - Dự án sẽ được hoàn thành đúng thời gian đã cam kết với chất lượng cao nhất.
              </p>
              <h4>4. Hỗ Trợ Sau Dự Án</h4>
              <p>
                - Chúng tôi luôn sẵn sàng hỗ trợ và bảo trì sản phẩm sau khi hoàn thành dự án.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="policy-page-footer">
        <p>Sunny Figure © 2024. Tất cả các quyền được bảo lưu.</p>
      </div>
    </div>
  );
};

export default SunnyWebsitePage;
