import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Result from './Pages/Result/Result'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/protectedRoute/protectedRoute';


const stripePromise = loadStripe('pk_test_51RzFbBCiINWSC6r7TSjqVijZcCerhNOBKEGnJKhVPpo2hzl5gGQfbNYLYm9Nyvty5vImTxj3DFOpiBbXsz42wUqs00cXluq8xi');



function Routing() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/Payments" element={
          <ProtectedRoute msg="you need to login to proceed to payment" redirect="/payments">
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
          </ProtectedRoute>} />
          <Route path="/Orders" element={
            <ProtectedRoute msg="you need to login to see your orders" redirect="/orders">
            <Orders />
            </ProtectedRoute>
            }/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/details" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<Result />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
  )
}

export default Routing
