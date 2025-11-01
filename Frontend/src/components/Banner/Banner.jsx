import React, { useState, useEffect } from 'react';
import './Banner.css';

import bannerImage1 from './../../assets/banner.jpg';
import bannerImage2 from './../../assets/banner2.jpg'; 
import bannerImage3 from './../../assets/banner3.jpg'; 

const slides = [
  {
    image: bannerImage1,
    subtitle: 'Todo tipo de Peces',
    title: (
      <>
        Comenza en el<br />Mundo de la<br />Acuariofilia
      </>
    ),
  },
  {
    image: bannerImage2,
    subtitle: 'Los mejores Accesorios',
    title: (
      <>
        Equipa tu<br/>Acuario con<br/>lo Mejor
      </>
    ),
  },
  {
    image: bannerImage3,
    subtitle: 'Acuarios a tu Medida',
    title: (
      <>
        El Hogar<br/>Perfecto para<br/>tus Peces
      </>
    ),
  },
];

const Banner = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 3500); 
    return () => clearInterval(interval); 
  }, []);

 
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = slideIndex => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section className="banner">
      {/* Contenedor de las diapositivas */}
      <div
        className="slides-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            className="slide"
            key={index}
            style={{
              backgroundImage: `linear-gradient(100deg, #000000, #00000020), url(${slide.image})`,
            }}
          >
            <div className="content-banner">
              <p>{slide.subtitle}</p>
              <h2>{slide.title}</h2>
              <a href="#">Ver Peces</a>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas de navegación */}
      <div className="carousel-arrow left-arrow" onClick={goToPrevious}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div className="carousel-arrow right-arrow" onClick={goToNext}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>

      {/* Puntos de navegación */}
      <div className="carousel-dots">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`dot ${currentIndex === slideIndex ? 'active' : ''}`}
            onClick={() => goToSlide(slideIndex)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Banner;