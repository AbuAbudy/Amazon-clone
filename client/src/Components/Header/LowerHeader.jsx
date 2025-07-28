import React from 'react';
import { IoMenu } from "react-icons/io5";
import classes from './Header.module.css';

function LowerHeader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <IoMenu />
          <span>All</span>
        </li>
        <li>Today's Deals</li>
        <li>Registry</li>
        <li>Prime Video</li>
        <li>Gift Cards</li>
        <li>Customer Service</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
