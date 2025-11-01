import React, { useState, useEffect } from 'react';
import './ProductsSection.css';
import pezGuppyImg from '../../assets/pezguppy.jpg';
import blueParrotImg from '../../assets/blueparrot.jpg';
import pezCorydoraImg from '../../assets/pezcorydora.jpg';
import pezGuramiImg from '../../assets/pez-gurami.jpg';
const products = [
	{
		name: 'Pez Guppy',
		image: pezGuppyImg,
		rating: 5,
		price: 4000,
		description: 'Pez vivíparo, pequeño y muy fácil de cuidar. Ideal para principiantes.',
	},
	{
		name: 'Pez Blue parrot',
		image: blueParrotImg,
		rating: 2,
		price: 6500,
		oldPrice: 8500,
		discount: 10,
		description: 'Pez híbrido y robusto con una personalidad única. Requiere un acuario espacioso.',
	},
	{
		name: 'Pez Corydora',
		image: pezCorydoraImg,
		rating: 5,
		price: 1200,
		description: 'Pez de fondo, pacífico y gregario. Ayuda a mantener limpio el sustrato.',
	},
	{
		name: 'Pez Gurami',
		image: pezGuramiImg,
		rating: 4,
		price: 5000,
		description: 'Especie atractiva y de comportamiento interesante. Ideal para acuarios comunitarios.',
	},
];

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
			<p className='description'>{product.description}</p>
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
const ProductsSection = () => {
	const [allProducts, setAllProducts] = useState([]); // Guarda todos los productos del backend
	const [activeFilter, setActiveFilter] = useState('Destacados');
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [filteredProducts, setFilteredProducts] = useState([]); // Guarda los productos a mostrar

	const filterOptions = ['Destacados', 'Más recientes', 'Mejores Valorados'];

	// --- ¡LA PARTE NUEVA! ---
	// Este efecto se ejecuta una sola vez para obtener los datos del backend
	useEffect(() => {
		let sortedProducts = [...products];
		const fetchProducts = async () => {
			try {
				// Hacemos la llamada a la ruta pública de nuestro backend
				const response = await fetch('http://localhost:5000/api/products');
				if (!response.ok) {
					throw new Error('La respuesta de la red no fue ok');
				}
				const responseData = await response.json();
				setAllProducts(responseData.data); // Guardamos los productos del backend
				setFilteredProducts(responseData.data); // Inicialmente mostramos todos
			} catch (error) {
				console.error("Error al obtener los productos:", error);
			}
		};

		fetchProducts();
	}, []); // El array vacío asegura que se ejecute solo una vez

	// Este efecto se ejecuta cada vez que cambia el filtro
	useEffect(() => {
		let sortedProducts = [...allProducts];

		switch (activeFilter) {
			case 'Más recientes':
				const recentOrder = ['Pez Blue parrot', 'Pez Corydora', 'Pez Gurami', 'Pez Guppy'];
				sortedProducts.sort((a, b) => recentOrder.indexOf(a.name) - recentOrder.indexOf(b.name));
				sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
	}, [activeFilter, allProducts]);

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
					<ProductCard key={product.name} product={product} />
					// Adaptamos los datos del backend a lo que espera ProductCard
					<ProductCard key={product._id} product={{
						name: product.nombre,
						description: product.descripcion,
						price: product.precio,
						// --- Datos que aún no tenemos en el backend ---
						// Por ahora, usamos valores fijos o los omitimos
						image: pezGuppyImg, // Placeholder
						rating: product.categoria.nombre === 'Destacados' ? 5 : 4, // Ejemplo
						oldPrice: null,
						discount: null,
					}} />
				))}
			</div>
		</section>
	);
};

export default ProductsSection;