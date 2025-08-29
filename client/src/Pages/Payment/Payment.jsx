import React, { useContext, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Payment.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormatter/CurrencyFormat';
import { axiosInstance } from '../../API/axios';
import ClipLoader from "react-spinners/ClipLoader";
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((total, item) => total + (item.amount || 0), 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);

  const [loader, setLoader] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async(e)=>{
    e.preventDefault();

    try {
// 1. backend || function ----> contact to the client secret
      setLoader(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${total * 100}`
      });
      const clientSecret = response.data?.clientSecret;
 // 2. confirm the card payment     
 const { paymentIntent } = await stripe.confirmCardPayment(
     clientSecret,
     {
        payment_method: {
            card: elements.getElement(CardElement)
        }
     }
  );
   // 3. if payment success ---> create order and empty the basket
   await db.collection("users")
   .doc(user?.uid)
   .collection("orders")
   .doc(paymentIntent.id)
   .set({
    basket: basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created
   })
// empty the basket
    dispatch({
      type: "EMPTY_BASKET"
    })

   setLoader(false);
    navigate("/orders", {state: {msg: "you order has been placed successfully"}});

    } catch (error) {
        setLoader(false);
        console.log(error);
      
    }

  }

  return (
    <LayOut>
      {/* Heading */}
      <div className={classes.payment__heading}>
        Checkout ({totalItem}) items
      </div>

      {/* Payment method */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Los Angeles, CA</div>
          </div>
        </div>
        <hr />

        {/* Review Items */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div className={classes.itemList}>
            {basket.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                flex={true}
              />
            ))}
          </div>
        </div>
        <hr />

        {/* Card Form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              {/* error */}
              <form onSubmit={handlePayment}>
              {cardError && <small className={classes.error}>{cardError}</small>}
              {/* card Element */}
              <CardElement onChange={handleChange}/>
              {/* pricing */}
              <div className={classes.payment__price}>
                <div>
                  <span className={classes.totalRow}>
                    <p>Total Order |</p> 
                    <CurrencyFormat amount={total} /> 
                  </span>
                </div>
                <button type='submit' disabled={!stripe || basket?.length === 0}>
                  {
                    loader ? (
                      <div className ={classes.loader}>
                        <ClipLoader size={15}/>
                        <p>please wait...</p>
                      </div>
                    ): ("Pay Now")
                  }
                  
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;