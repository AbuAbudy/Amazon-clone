import React, { useEffect, useState } from 'react';
import LayOut from '../../Components/LayOut/Layout';
import { useParams } from 'react-router-dom';
import { productUrl } from '../../API/endpoint';
import ProductCard from '../../Components/Product/ProductCard';
import axios from 'axios';
import Loader from '../../Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${productUrl}/products/${productId}`);
        setProduct(res.data || {});
      } catch (err) {
        console.error('Failed to load product detail:', err);
        setProduct({});
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard product={product} flex={true} desc={true} renderAdd={true} price={true} />
      )}
    </LayOut>
  );
}

export default ProductDetail;
