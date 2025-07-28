import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormatter/CurrencyFormat'
import classes from './Product.module.css'
import { Link } from 'react-router-dom';
import {Type} from '../../Utility/Action.type'
import { DataContext } from '../DataProvider/DataProvider'

function ProductCard({ product, flex, desc }) {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating,
        description
      },
    });
  };

  return (
    <div className={`${classes.card__contaier} ${flex? classes.product__flexed : ''}`}>
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h2>{title}</h2>
        {desc && <div style={{maxWidth: '750px'}}>{description}</div>}
        <div className={classes.rating}>
  <Rating value={rating?.rate ?? 0} precision={0.1} readOnly />
  <small>{rating?.count ?? 0}</small>
</div>
        <div>
        <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
