import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { img } from './img/data';
import classes from '../Carousel/CarouselEffect.module.css';
import Category from '../Category/Category';

function CarouselEffect() {
  return (
    <div className={classes.hero__img}>
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
        dynamicHeight={false}
        interval={4000}
      >
        {img.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
        
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
