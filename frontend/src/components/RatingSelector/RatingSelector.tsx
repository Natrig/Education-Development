import React, { useState } from 'react';
import Star from './Star';
import classes from './RatingSelector.module.less';

const RatingSelector = () => {

  const [fixedRating, setFixedRating] = useState(1);
  const [rating, setRating] = useState(1);

  const onClick = (position: number): void => {
    setFixedRating(position);
  };

  const onEnter = (position: number): void => {
    setRating(position);
  };

  const onLeave = (): void => {
    setRating(fixedRating);
  };

  return (
    <div className={classes.rating_container}>
      {[...Array(5)].map((star, index) => {
        return <Star
          key={index}
          position={index + 1}
          rating={rating}
          size={25}
          onClick={onClick}
          onEnter={onEnter}
          onLeave={onLeave}
        />;
      })}
    </div>
  );
};

export default RatingSelector;
