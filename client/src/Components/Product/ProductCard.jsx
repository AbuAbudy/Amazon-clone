import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormatter/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/Action.type';
import { DataContext } from '../DataProvider/DataProvider';

function ProductCard({ product, flex, desc, renderAdd }) {
  if (!product) return null;

  const id = product.id ?? product._id ?? '';
  const title = product.title ?? 'Untitled Product';
  const price = product.price ?? 0;

  const imageSrc =
    product.image ||
    product.thumbnail ||
    (Array.isArray(product.images) && product.images[0]) ||
    null;

  const ratingValue =
    typeof product.rating === 'number'
      ? product.rating
      : product.rating?.rate ?? 0;

  const ratingCount =
    typeof product.rating === 'number'
      ? product.stock ?? 0
      : product.rating?.count ?? 0;

  const description = product.description ?? '';

  const [, dispatch] = useContext(DataContext);

  const addToCart = () => {
    const normalizedRating =
      typeof product.rating === 'number'
        ? { rate: product.rating, count: ratingCount }
        : product.rating;

    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image: imageSrc,
        price,
        rating: normalizedRating,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card__contaier} ${
        flex ? classes.product__flexed : ''
      }`}
    >
      <Link to={id ? `/product/${id}` : '#'}>
        {imageSrc ? (
          <img src={imageSrc} alt={title} />
        ) : (
          <div className={classes.noImage}>No Image</div>
        )}
      </Link>
      <div>
        <h2>{title}</h2>
        {desc && <div style={{ maxWidth: '750px' }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={Number(ratingValue) || 0} precision={0.1} readOnly />
          {ratingCount ? <small>{ratingCount}</small> : null}
        </div>
        <div>
         <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;