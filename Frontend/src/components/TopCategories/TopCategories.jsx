import React from 'react';
import './TopCategories.css';
import pezAngelImg from '../../assets/pez1-category.jpg';
import pezBettaImg from '../../assets/pez2-category.jpeg';
import pezMollyImg from '../../assets/pez3-category.jpg';
const categories = [
	{
		name: 'Pez Ángel',
		image: pezAngelImg,
	},
	{
		name: 'Pez Molly',
		image: pezBettaImg,
	},
	{
		name: 'Pez Betta',
		image: pezMollyImg,
	},
];

const TopCategories = () => {
	return (
		<section className='top-categories container'>
			<h1 className='heading-1'>Mejores Peces</h1>
			<div className='container-categories'>
				{categories.map((category, index) => (
					<div
						key={index}
						className='card-category'
						style={{
							backgroundImage: `linear-gradient(#00000080, #00000080), url(${category.image})`,
						}}>
						<p>{category.name}</p>
						<span>Ver más</span>
					</div>
				))}
			</div>
		</section>
	);
};

export default TopCategories;