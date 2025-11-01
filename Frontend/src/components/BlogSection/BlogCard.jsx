import React, { useState } from 'react';

const BlogCard = ({ image, title, date, description }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleReadMore = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className='card-blog'>
			<div className='container-img'>
				<img src={image} alt={title} />
				<div className='button-group-blog'>
					<span>
						<i className='fa-solid fa-magnifying-glass'></i>
					</span>
					<span>
						<i className='fa-solid fa-link'></i>
					</span>
				</div>
			</div>
			<div className='content-blog'>
				<h3>{title}</h3>
				<span>Fecha de creación: {date}</span>
				<p className={isExpanded ? 'expanded' : ''}>
					<strong>DESCRIPCIÓN:</strong>
					{' '}{description}
				</p>
				<div className='btn-read-more' onClick={toggleReadMore}>
					{isExpanded ? 'Leer menos' : 'Leer más'}
				</div>
			</div>
		</div>
	);
};

export default BlogCard;