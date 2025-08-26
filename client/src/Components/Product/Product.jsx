import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../../Loader/Loader';
import { productUrl } from '../../API/endpoint';

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${productUrl}/products?limit=30`);
        setProducts(res.data?.products || []);
      } catch (err) {
        console.error('Failed to load products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section
      className={classes.product__contaioner}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        products.map((singleProduct) => (
          <ProductCard product={singleProduct} renderAdd={true} key={singleProduct.id} />
        ))
      )}
    </section>
  );
}

export default Product;
