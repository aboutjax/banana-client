import React from 'react';

function ActivityFoodCard(props) {
  return(
    <div className="c-box c-activity-food-card">
      <h4 className="c-activity-food-card__header">{props.name}</h4>
      <h1 className="c-activity-food-card__number">{props.value}</h1>
      <img className="c-activity-food-card__image c-activity-food-card__image--filter" src={props.imageSrc} alt=""/>
      <img className="c-activity-food-card__image" src={props.imageSrc} alt=""/>
    </div>
  )
}

export default ActivityFoodCard
