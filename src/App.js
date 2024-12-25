
import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import UserProfile from './Pages/UserProfile';
import Footer from './Components/Footer/Footer';
import ProtectedRoute from './utils/ProtectedRoute';
import Unauthorized from './Components/Unauthorized';
import ProductPage from './Pages/ProductPage';
import AboutPage from './Pages/AboutPage';
import PolicyPage from './Pages/PolicyPage';
import ContactPage from './Pages/ContactPage';
import SunnyWebsitePage from './Pages/SunnyWebsitePage';

import AdminLayout from './Components/Admin/AdminLayout';
import NotFound from './Components/NotFound';
import Register from './Components/Login/Register';
import Login from './Components/Login/Login'

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  // Kiểm tra nếu route bắt đầu bằng "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />} {/* Ẩn Navbar nếu là admin */}
      {children}
      {!isAdminRoute && <Footer />} {/* Ẩn Footer nếu là admin */}
    </>
  );
};
function App() {
  return (
    <div>
       <ToastContainer autoClose={2000}/>
      <BrowserRouter>
      <LayoutWrapper>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Shop />}></Route>
          <Route path='/san-pham' element={<ProductPage />}></Route>
          <Route path='/gioi-thieu' element={<AboutPage />}></Route>
          <Route path='/chinh-sach' element={<PolicyPage />}></Route>
          <Route path='/lien-he' element={<ContactPage />}></Route>
          <Route path='/sunny-website' element={<SunnyWebsitePage />}></Route>
          <Route path='/register' element={<Register />}></Route>

          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />}/>
          </Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<UserProfile />}></Route>
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        {/* <Footer/> */}
        </LayoutWrapper>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
