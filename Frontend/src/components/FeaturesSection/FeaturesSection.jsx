import React from 'react';
import FeatureCard from '../FeatureCard/FeatureCard';
import './FeaturesSection.css';

const featuresData = [
  {
    id: 1,
    iconClass: 'fa-solid fa-fish',
    title: 'Envío gratis a todo el pais',
    description: 'En pedidos superior a 20.000$',
  },
  {
    id: 2,
    iconClass: 'fa-solid fa-wallet',
    title: 'reembolso',
    description: '100% garantía',
  },
  {
    id: 3,
    iconClass: 'fa-solid fa-gift',
    title: 'Tarjeta regalo especial',
    description: 'Con tu primera Compra te llevas un regalo',
  },
  {
    id: 4,
    iconClass: 'fa-solid fa-headset',
    title: 'Servicio al cliente 24/7',
    description: 'No dudes en escribirnos ante cualquier duda!!',
  },
];

const FeaturesSection = () => {
  return (
    <section className="container container-features">
      {featuresData.map(feature => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </section>
  );
};

export default FeaturesSection;