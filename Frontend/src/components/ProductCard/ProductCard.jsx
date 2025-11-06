import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => (
	<div className='card-product'>
		<div className='container-img'>
			<img src={product.image} alt={product.name} />
			{product.discount && <span className='discount'>-{product.discount}%</span>}
			<div className='button-group'>
				<span><i className='fa-regular fa-eye'></i></span>
				<span><i className='fa-regular fa-heart'></i></span>
				<span><i className='fa-solid fa-code-compare'></i></span>
			</div>
		</div>
		<div className='content-card-product'>
			<div className='stars'>
				{[...Array(5)].map((_, i) => (
					<i key={i} className={i < product.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
				))}
			</div>
			<h3>{product.name}</h3>
			{product.description && <p className='description'>{product.description}</p>}
			<div className='footer-card'>
				<p className='price'>
					${product.price.toLocaleString('es-AR')}
					{product.oldPrice && <span>${product.oldPrice.toLocaleString('es-AR')}</span>}
				</p>
				<span className='add-cart'><i className='fa-solid fa-basket-shopping'></i></span>
			</div>
		</div>
	</div>
);

export default ProductCard;