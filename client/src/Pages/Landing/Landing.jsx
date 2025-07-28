import React from 'react'
import Layout from '../../Components/LayOut/Layout'



import CarouselEffect from '../../Components/Carousel/CarouselEffect'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'

function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  )
}

export default Landing
