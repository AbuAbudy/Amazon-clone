import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import SignIn from './Pages/Auth/Signup'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Result from './Pages/Result/Result'

function Routing() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<SignIn />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<Result />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
  )
}

export default Routing
