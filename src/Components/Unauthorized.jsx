import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Chuyển về trang chủ hoặc trang login
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403 - Unauthorized</h1>
      <p style={styles.message}>Bạn không có quyền truy cập vào trang này.</p>
      <button style={styles.button} onClick={handleBackToHome}>
        Quay lại Trang Chủ
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#ff4d4f',
  },
  message: {
    fontSize: '1.2rem',
    color: '#595959',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Unauthorized;
