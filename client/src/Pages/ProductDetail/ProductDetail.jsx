import React from 'react'
import { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/Layout'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../API/endpoint'
import ProductCard from '../../Components/Product/ProductCard'
import axios from 'axios'
import Loader from '../../Loader/Loader'

function ProductDetail() {
  const {productId}= useParams()
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`${productUrl}/products/${productId}`)
      .then((res)=>{
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <LayOut>
      {isLoading? (<Loader />) :(<ProductCard 
      product={product}
      flex={true}
      desc={true}
      price={true}
       />)}
    </LayOut>
  )
}

export default ProductDetail
