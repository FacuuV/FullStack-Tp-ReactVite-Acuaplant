import React, { useState, useEffect } from 'react';
import './ProductsSection.css';
import { useCart } from '../../context/CartContext'; // 1. Importamos el hook del carrito
import pezGuppyImg from '../../assets/pezguppy.jpg';
import blueParrotImg from '../../assets/blueparrot.jpg';
import pezCorydoraImg from '../../assets/pezcorydora.jpg';
import pezGuramiImg from '../../assets/pez-gurami.jpg';

const products = [
	{
		name: 'Pez Guppy',
		_id: 'static-1', // Añadimos un ID único para el carrito
		image: pezGuppyImg,
		rating: 5,
		price: 4000,
		description: 'Pez vivíparo, pequeño y muy fácil de cuidar. Ideal para principiantes.',
	},
	{
		name: 'Pez Blue parrot',
		_id: 'static-2', // Añadimos un ID único para el carrito
		image: blueParrotImg,
		rating: 2,
		price: 6500,
		oldPrice: 8500,
		discount: 10,
		description: 'Pez híbrido y robusto con una personalidad única. Requiere un acuario espacioso.',
	},
	{
		name: 'Pez Corydora',
		_id: 'static-3', // Añadimos un ID único para el carrito
		image: pezCorydoraImg,
		rating: 5,
		price: 1200,
		description: 'Pez de fondo, pacífico y gregario. Ayuda a mantener limpio el sustrato.',
	},
	{
		name: 'Pez Gurami',
		_id: 'static-4', // Añadimos un ID único para el carrito
		image: pezGuramiImg,
		rating: 4,
		price: 5000,
		description: 'Especie atractiva y de comportamiento interesante. Ideal para acuarios comunitarios.',
	},
];

const ProductCard = ({ product }) => {
	// 2. Obtenemos la función para añadir al carrito
	const { addToCart } = useCart();

	return (
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
				<p className='description'>{product.description}</p>
				<div className='footer-card'>
					<p className='price'>
						${product.price.toLocaleString('es-AR')}
						{product.oldPrice && <span>${product.oldPrice.toLocaleString('es-AR')}</span>}
					</p>
					{/* 3. Convertimos el span en un botón que llama a addToCart */}
					<button onClick={() => addToCart(product)} className='add-cart'><i className='fa-solid fa-basket-shopping'></i></button>
				</div>
			</div>
		</div>
	);
};

const ProductsSection = () => {
	const [activeFilter, setActiveFilter] = useState('Destacados');
	const [filteredProducts, setFilteredProducts] = useState(products);

	const filterOptions = ['Destacados', 'Más recientes', 'Mejores Valorados'];

	useEffect(() => {
		let sortedProducts = [...products];

		switch (activeFilter) {
			case 'Más recientes':
				const recentOrder = ['Pez Blue parrot', 'Pez Corydora', 'Pez Gurami', 'Pez Guppy'];
				sortedProducts.sort((a, b) => recentOrder.indexOf(a.name) - recentOrder.indexOf(b.name));
				break;
			case 'Mejores Valorados':
				sortedProducts.sort((a, b) => b.rating - a.rating);
				break;
			case 'Destacados':
			default:
				sortedProducts = [...products];
				break;
		}

		setFilteredProducts(sortedProducts);
	}, [activeFilter]);

	return (
		<section className='container top-products'>
			<h1 className='heading-1'>Peces</h1>
			<div className='container-options'>
				{filterOptions.map(option => (
					<span
						key={option}
						className={activeFilter === option ? 'active' : ''}
						onClick={() => setActiveFilter(option)}
					>
						{option}
					</span>
				))}
			</div>
			<div className='container-products'>
				{filteredProducts.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</section>
	);
};

export default ProductsSection;