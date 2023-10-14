import React, { useEffect } from 'react';
import logo from './logo.svg';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import './App.css';
import { useSelector } from 'react-redux';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PageNoTFound from './pages/404';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: '/order-success/:id',
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: '/orders',
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: '/profile',
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: '*',
    element: <PageNoTFound></PageNoTFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchItemsByUserIdAsync(user));
      dispatch(fetchLoggedInUserAsync(user));
    }
  }, [dispatch, user]);
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
