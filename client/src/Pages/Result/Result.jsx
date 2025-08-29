import React, { useEffect, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/Product/ProductCard';
import axios from 'axios';
import classes from './Result.module.css';
import { productUrl } from '../../API/endpoint';
import Loader from '../../Loader/Loader';

function Result() {
  const { categoryName } = useParams();
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${productUrl}/products/category/${categoryName}`);
        // DummyJSON -> res.data.products is the array
        setResult(res.data.products || []);
      } catch (err) {
        console.error('❌ Error fetching category products:', err);
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 style={{ padding: '30px' }}>Results</h1>
            <p style={{ padding: '30px' }}>category/{categoryName}</p>
            <hr />
            <div className={classes.product__container}>
              {result.length > 0 ? (
                result.map((product) => (
                  <ProductCard product={product} renderAdd={true} key={product.id} />
                ))
              ) : (
                <p style={{ textAlign: 'center' }}>No products found.</p>
              )}
            </div>
          </>
        )}
      </section>
    </LayOut>
  );
}

export default Result;
