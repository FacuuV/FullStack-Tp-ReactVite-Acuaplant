import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ iconClass, title, description }) => {
  return (
    <div className="card-feature">
      <i className={iconClass}></i>
      <div className="feature-content">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;