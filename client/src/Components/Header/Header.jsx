import React, { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/firebase';
import classes from './Header.module.css';
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // FIXED: correct reduce usage
  const totalItem = basket?.reduce((total, item) => total + (item.amount || 0), 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* Logo + Delivery */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="amazon logo" />
            </Link>   
            <div className={classes.delivery}>
              <span><CiLocationOn /></span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className={classes.search}>
            <select>
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search products" />
            <button className={classes.searchButton} aria-label="Search">
              <FaSearch size={20} />
            </button>
          </div>

          {/* Right Section */}
          <div className={classes.order__container}>
            {/* Language */}
            <Link to="" className={classes.language}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="USA flag" />
              <select><option value="">EN</option></select>
            </Link>

            {/* Account */}

            <Link to={!user && "/auth"}>
            <div>
              {user ? ( 
                <>
                <p>Hello, {user?.email?.split("@")[0]}</p>
              <span onClick={()=>auth.signOut()}>Sign Out</span>
                </>
                
                ) : (
                
                  <>
                  <p>Hello, Sign in</p>
                  <span>Account & Lists</span>
                  </>
                )}
              
            </div>
            </Link>
            {/* Orders */}
            <Link to="/Orders">
              <div>
                <p>Returns</p>
                <span>& Orders</span>
              </div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className={classes.cart}>
              <FiShoppingCart size={30} aria-label="Shopping cart" />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
