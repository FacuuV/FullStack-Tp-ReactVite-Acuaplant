import React from 'react';
import './AccessoriesSection.css';
import ProductCard from '../ProductCard/ProductCard';

// imagenes de los accesorios//
import filtroImg from '../../assets/filtro1.jpg';
import peceraImg from '../../assets/pecera1.jpg';
import comidaImg from '../../assets/Comida1.jpg';
import plantasImg from '../../assets/Plantas.jpg';

const accessories = [
	{
		name: 'Filtro Tipo Cascada',
		image: filtroImg,
		rating: 5,
		price: 10000,
		oldPrice: 12000,
		discount: 13,
	},
	{
		name: 'Pecera 100L',
		image: peceraImg,
		rating: 5,
		price: 50000,
		oldPrice: 65000,
		discount: 22,
	},
	{
		name: 'Comida Para Peces',
		image: comidaImg,
		rating: 5,
		price: 1500,
		oldPrice: 2000,
		discount: 5,
	},
	{
		name: 'Plantas Acuaticas',
		image: plantasImg,
		rating: 4,
		price: 2500,
	},
];

const AccessoriesSection = () => {
	return (
		<section id='accesorios' className='container specials'>
			<h1 className='heading-1'>Accesorios Para el Acuario</h1>
			<div className='container-products'>
				{accessories.map(product => (<ProductCard key={product.name} product={product} />))}
			</div>
		</section>
	);
};

export default AccessoriesSection;