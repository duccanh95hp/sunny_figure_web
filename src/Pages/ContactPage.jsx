import React, { useState } from "react";
import "./CSS/ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic gửi form ở đây (API hoặc email service)
    setIsSubmitted(true);
  };

  return (
    <div className="contact-page">
      <h1 className="contact-page-title">Liên hệ</h1>
      <p className="contact-page-subtitle">
        Hãy liên hệ với <span className="highlight">Sunny Figure</span> để được
        hỗ trợ nhanh nhất!
      </p>

      <div className="contact-page-content">
        {/* Thông tin liên hệ */}
        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>
          <p>📍 Địa chỉ: TT16-06, Khu đô thị Văn Phú, Hà Đông , Hà Nội</p>
          <p>📧 Email: duccanhhptl@gmail.com</p>
          <p>📞 Điện thoại: 0795345097</p>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.865281283309!2d105.77453051540157!3d20.96747099477754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134534466b111f3%3A0x857eeb7587e25e80!2zS2h1IMSRxrDhu51uZyBNaW5oIEPhu61jIFbEg24gUGjDuiwgVsSpbiBQaOG7pSwgSMOgIERvbmcgTmV3IENpdHksIEjDoCDEkG9uZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1697977816692!5m2!1svi!2s"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Biểu mẫu liên hệ */}
        <div className="contact-form">
          <h2>Gửi tin nhắn cho chúng tôi</h2>
          {isSubmitted ? (
            <p className="success-message">
              Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Tên của bạn</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Nội dung</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-form-button">
                Gửi
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
