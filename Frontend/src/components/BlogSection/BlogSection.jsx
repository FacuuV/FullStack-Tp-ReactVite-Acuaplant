import React from 'react';
import './BlogSection.css';
import BlogCard from './BlogCard'; 

import acuarioFacuImg from '../../assets/acurio3.jpg';
import acuarioAmigoImg from '../../assets/acuario.jpg';
import acuarioAmigo2Img from '../../assets/Acurio2.jpg';

const acuarios = [
	{
		title: 'Acuario de Facundo',
		date: '04/01/24',
		description: 'Inicié con un acuario de 100L poblado por Escalares, Mollys, Guppys y Tetras. Para proteger a las crías, dividí el tanque. Un año después, la población creció exponencialmente, con múltiples generaciones y los Escalares también comenzaron a reproducirse. Con cerca de 80 peces, el acuario alcanzó su máxima capacidad, demostrando un ciclo de vida vibrante.',
		image: acuarioFacuImg,
	},
	{
		title: 'Acuario de Alonso',
		date: '09/12/23',
		description: 'Mi primer acuario comenzó de forma caótica, pero la investigación y la pasión me llevaron a mejorar la estética y el cuidado. Este proyecto inicial fue el catalizador que me inspiró a expandirme, llegando a tener diez acuarios especializados en casa, pero siempre guardando un cariño especial por el primero.',
		image: acuarioAmigoImg,
	},
	{
		title: 'Acuario de Leandro',
		date: '19/06/24',
		description: 'Incursioné en la acuariofilia por recomendación. Mi enfoque es minimalista, priorizando el comportamiento natural de los peces sobre la decoración. Actualmente, mantengo un cardumen de 15 Tetras Neón, cuyo nado tranquilo y sincronizado es el principal atractivo de mi acuario.',
		image: acuarioAmigo2Img,
	},
];

const BlogSection = () => {
	return (
		<section id='acuarios' className='container blogs'>
			<h1 className='heading-1'>Acuarios Clientes</h1>

			<div className='container-blogs'>
				{acuarios.map((acuario, index) => (
					<BlogCard
						key={index}
						image={acuario.image}
						title={acuario.title}
						date={acuario.date}
						description={acuario.description}
					/>
				))}
			</div>
		</section>
	);
};

export default BlogSection;