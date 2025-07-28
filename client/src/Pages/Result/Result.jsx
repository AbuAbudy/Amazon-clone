import React from 'react'
import LayOut from '../../Components/LayOut/Layout'
import { useParams } from 'react-router-dom'
import ProductCard from '../../Components/Product/ProductCard';
import axios from 'axios'
import classes from './Result.module.css'
import { productUrl } from '../../API/endpoint'
import { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'
function Result() {
  const {categoryName} = useParams()
  const [result, setresult]=useState([])
  const [isLoading, setLoading] = useState(false);


 useEffect(() => {
    setLoading(true);
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setresult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <LayOut>
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 style={{padding: "30px"}}>Results</h1>
          <p style={{padding: "30px"}}>category/{categoryName}</p>
          <hr />
          <div className={classes.product__container}>
            {result?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </>
      )}
      
    </section>
    </LayOut>
  )
}

export default Result



