import React, {useContext, useState, useEffect} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from './Orders.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { db } from '../../Utility/firebase'
import ProductCard from '../../Components/Product/ProductCard'


function Orders() {
  const [{user}, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    if(user){
      db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot(snapshot=>{
        setOrders(snapshot.docs.map(doc=>({
          id: doc.id,
          data: doc.data()
        })))
      })
    }else{
      setOrders([]);
    }
  }, [user])

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order__container}>
          <h2>Your Orders</h2>
          {
          <div style={{
            padding: "20px",
            color: "red",
          }}>
            {orders?.length === 0 && <h3>You have no orders</h3>}
          </div> }

           <div>
          {
            orders?.map((eachOrder, i)=>{
              return (
                <div key={i}>
                  <hr />
                  <p>Order Id: {eachOrder?.id} </p>
                  { eachOrder?.data?.basket?.map((order)=>(
                      <ProductCard
                      flex={true}
                      product={order}
                      key={order.id}/>
                    ))
                  }
                </div>
              )
            })
            }
        </div>
        </div>
        {/* Ordered Items */}
        
      </section>
    </LayOut>
  )
}

export default Orders
