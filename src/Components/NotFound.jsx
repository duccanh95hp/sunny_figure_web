import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); // Chuyển hướng sau 5 giây
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>The page you're looking for doesn't exist.</p>
      <p style={styles.message}>Redirecting to home in 5 seconds...</p>
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

export default NotFound;
