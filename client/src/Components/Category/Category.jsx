import React from 'react';
import { categoryInfo } from './categoryInfo';
import CategoryCard from './CategoryCard';
import classes from './Category.module.css';

function Category() {
  return (
    <section className={classes.category__container}>
      {categoryInfo.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Category;
