
import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import UserProfile from './Pages/UserProfile';
import Footer from './Components/Footer/Footer';
import onepiece_banner from './Components/Assets/banner_onepiece.png';
import naruto_banner from './Components/Assets/naruto_banner.png';
import dragon_banner from './Components/Assets/dragon_ball_banner.png';
import ProtectedRoute from './utils/ProtectedRoute';
import Unauthorized from './Components/Unauthorized';


import AdminLayout from './Components/Admin/AdminLayout';
import NotFound from './Components/NotFound';

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
          <Route path='/one-piece' element={<ShopCategory banner={onepiece_banner} category="1"/>}></Route>
          <Route path='/naruto' element={<ShopCategory banner={naruto_banner} category="3"/>}></Route>
          <Route path='/dragon-ball' element={<ShopCategory banner={dragon_banner} category="2"/>}></Route>
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />}/>
          </Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/login' element={<LoginSignup />}></Route>
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
