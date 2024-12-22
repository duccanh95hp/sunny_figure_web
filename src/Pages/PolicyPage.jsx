import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CSS/PolicyPage.css";

const PolicyPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="policy-page">
      {/* Header */}
      <h1 className="policy-page-title">Chính sách</h1>
      <p className="policy-page-subtitle">
        Tại <span className="highlight">Sunny Figure</span>, chúng tôi cam kết cung cấp các chính sách rõ ràng và minh bạch
        để mang lại trải nghiệm tốt nhất cho khách hàng và cộng tác viên.
      </p>

      {/* Chính sách bán hàng */}
      <div className="policy-section">
        <h2
          className="policy-section-title"
          onClick={() => toggleSection("salePolicy")}
        >
          Chính sách bán hàng
        </h2>
        <AnimatePresence>
          {activeSection === "salePolicy" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="policy-section-content"
            >
              <h4>1. Thời gian xử lý đơn hàng</h4>
              <p>
                - Thời gian xử lý đơn hàng là từ 1-2 ngày làm việc kể từ khi nhận được đơn hàng.
              </p>
              <h4>2. Thời gian giao hàng</h4>
              <p>
                - Thời gian giao hàng sẽ phụ thuộc vào địa chỉ nhận hàng của bạn và thời gian vận chuyển của đối tác vận chuyển. Thông thường, thời gian giao hàng sẽ từ 2-5 ngày làm việc.
              </p>
              <p>
                - Các đơn hàng gặp rủi ro sự cố khi vận chuyển sẽ được Sunny Figure xử lý sau khi có kết luận kiểm tra chính thức từ đơn vị vận chuyển bằng các hình thức như Hoàn tiền, Gởi lại hàng mới.
              </p>
              <h4>3. Phí vận chuyển</h4>
              <p>
                - Phí vận chuyển sẽ được tính toán dựa trên khoảng cách và trọng lượng của sản phẩm. Chi tiết phí vận chuyển sẽ được hiển thị trong quá trình thanh toán hoặc chúng tôi sẽ thông báo cụ thể đến khách hàng ngay khi lên đơn hàng.
              </p>
              <p>
                - Khách hàng có nhu cầu thay đổi hình thức/đơn vị vận chuyển khách với đơn vị vận chuyển mặc định của chúng tôi sẽ tự thanh toán toàn bộ chi phí vận chuyển.
              </p>
              <h4>4. Hàng hoàn do giao hàng thất bại</h4>
              <p>
                - Nếu giao hàng thất bại do nguyên nhân từ phía khách hàng (cung cấp sai sdt/địa chỉ, số điện thoại không thể liên lạc, khách từ chối nhận hàng), hàng sẽ hoàn lại kho chúng tôi. Các chi phí vận chuyển phát sinh thêm yêu cầu khách hàng thanh toán (x2 phí ship + phí gói hàng) và hàng hóa sẽ bị mất quyền lợi đổi trả bảo hành sản phẩm.
              </p>
              <p>
                - Sau 7 ngày kể từ ngày đơn hàng bị hoàn trả, nếu khách không liên lạc nhận hàng thì đơn hàng bị hủy và không hoàn cọc nếu có.
              </p>
              <h4>5. Trường hợp hủy giao hàng</h4>
              <p>Hủy giao hàng, hủy đơn hàng và không hoàn cọc cho các trường hợp sau:</p>
              <p>- Khách không phản hồi tin nhắn xác nhận giao hàng trong 30 ngày kể từ ngày đầu tiên shop thông báo (qua inbox/email) hoặc gọi điện 02 lần.</p>
              <p>- Khách chặn nhận tin nhắn từ page SUNNY FIGURE.</p>
              <p>- Khách gian lận thanh toán</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Chính sách đổi trả bảo hành */}
      <div className="policy-section">
        <h2
          className="policy-section-title"
          onClick={() => toggleSection("warrantyPolicy")}
        >
          Chính sách đổi trả bảo hành
        </h2>
        <AnimatePresence>
          {activeSection === "warrantyPolicy" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="policy-section-content"
            >
              <h4>1. Điều kiện đổi trả và phạm vi bảo hành hàng mua tại Sunny Figure</h4>
              <p>
                - Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:
              </p>
              <p>
                <li> Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.</li>
                <li> Không đủ số lượng, không đủ bộ như trong đơn hàng.</li>
                <li> Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ… mà không được chúng tôi thông báo trước.</li>
                <li> Hàng bị lỗi từ nhà sản xuất </li>
              </p>
              <h4>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</h4>
              <p>
                - Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm căn cứ trên giờ hệ thống shipper giao hàng đến khách. Sau 48h mọi vấn đề phát sinh sẽ không được giải quyết.
              </p>
              <p>
                - Thời gian gửi chuyển trả sản phẩm: trong vòng 3 ngày kể từ khi nhận sản phẩm.
              </p>
              <p>
                - Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc gởi vận chuyển có tracking đến địa chỉ sau:
                <li>Người nhận : Sunny Figure</li>
                <li>Sđt : 0795345097</li>
                <li>Địa chỉ : TT16 - 06 khu đô thị Văn phú , Hà Đông , Hà Nội</li>
              </p>
              <h4>3. Chi phí vận chuyển trả hàng</h4>
              <p>
                - Quý Khách vui lòng liên hệ Sunny Figure để thống nhất hình thức & trách nhiệm thanh toán cho đơn hàng được hoàn trả. Trong trường hợp thiếu hàng, nhầm hàng Sunny Figure hỗ trợ toàn bộ chi phí vận chuyển.
              </p>
              <h4>4. Quy định đóng gói hàng chuyển trả</h4>
              <p>
                - Quý khách vui lòng liên hệ và làm theo hướng dẫn của Sunny Figure, đảm bảo đóng gói kĩ theo như khi nhận hàng.
              </p>
              <p>
                - Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.
              </p>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chính sách cộng tác viên */}
      <div className="policy-section">
        <h2
          className="policy-section-title"
          onClick={() => toggleSection("partnerPolicy")}
        >
          Chính sách cộng tác viên
        </h2>
        <AnimatePresence>
          {activeSection === "partnerPolicy" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="policy-section-content"
            >
              <h4>1, Cách trở thành CTV(Cộng tác viên) ?</h4>
              <p>
                - Khi khách hàng đăng ký thành công vào hệ thống, khi đó sẽ nhận được mã giới thiệu. Khách hàng dùng mã giới thiệu đó để giới thiệu cho người khác khi họ thanh toán đơn hàng
              </p>
              <h4>2, Tiền Hoa hồng</h4>
              <p>
                - Với mỗi đơn hàng hoàn thành có sử dụng mã giới thiệu thì CTV sẽ nhận được 5% trên tổng tiền (không bao gồm Phí ship) của đơn hàng
              </p>
              <p>
                - Khi tiền hoa hồng lớn hơn 100,000 VNĐ CTV được rút tiền bằng cách liên hệ với Admin qua Sđt/zalo : 0795345097
              </p>
              <h4>3, Nghĩa vụ của CTV</h4>
              <p> 
                - Chủ động quảng bá thương hiệu, tiếp thị sản phẩm, tìm kiếm và khai thác nguồn khách hàng tiềm năng;
              </p>
              <p>
                - Nghiêm cấm CTV lợi dụng danh nghĩa của Shop để thực hiện những hành vi vi phạm pháp luật hoặc những hành vi có thể làm ảnh hưởng xấu đến uy tín và thương hiệu của Shop.
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

export default PolicyPage;
