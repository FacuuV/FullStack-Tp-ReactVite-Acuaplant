import React, { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
	const [formData, setFormData] = useState({
		nombre: '',
		email: '',
		telefono: '',
		genero: '',
		comentario: '',
		archivo: null,
	});
	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleFileChange = e => {
		setFormData(prevState => ({
			...prevState,
			archivo: e.target.files[0], 
		}));
	};
	const handleSubmit = e => {
		e.preventDefault(); 
		console.log('--- Datos del Formulario Recibidos ---');
		console.log('Nombre y Apellido:', formData.nombre);
		console.log('Email:', formData.email);
		console.log('Teléfono:', formData.telefono);
		console.log('Género:', formData.genero);
		console.log('Comentario:', formData.comentario);
		console.log(
			'Archivo:',
			formData.archivo ? formData.archivo.name : 'No se seleccionó archivo'
		);
		console.log('------------------------------------');
		alert(
			`¡Gracias por tu mensaje, ${formData.nombre}! Hemos "recibido" tus datos.`
		);
		setFormData({
			nombre: '',
			email: '',
			telefono: '',
			genero: '',
			comentario: '',
			archivo: null,
		});
		document.getElementById('contactForm').reset();
	};

	return (
		<section className='contact-container' id='contacto'>
			<h1>Formulario de Contacto</h1>
			<form id='contactForm' onSubmit={handleSubmit}>
				<label htmlFor='nombre'>Nombre y Apellido:</label>
				<input
					type='text'
					id='nombre'
					name='nombre'
					placeholder='Ej: Facundo Vazquez'
					value={formData.nombre}
					onChange={handleChange}
					required
				/>

				<label htmlFor='email'>Correo Electrónico:</label>
				<input
					type='email'
					id='email'
					name='email'
					placeholder='Ej: facundo.vazquez@email.com'
					value={formData.email}
					onChange={handleChange}
					required
				/>

				<label htmlFor='telefono'>Número de Teléfono:</label>
				<input
					type='tel'
					id='telefono'
					name='telefono'
					placeholder='Ej: 1122334455'
					value={formData.telefono}
					onChange={handleChange}
				/>

				<label>Género:</label>
				<div className='gender-group'>
					<input type='radio' id='hombre' name='genero' value='hombre' checked={formData.genero === 'hombre'} onChange={handleChange} required />
					<label htmlFor='hombre'>Hombre</label>

					<input type='radio' id='mujer' name='genero' value='mujer' checked={formData.genero === 'mujer'} onChange={handleChange} />
					<label htmlFor='mujer'>Mujer</label>

					<input type='radio' id='otro' name='genero' value='otro' checked={formData.genero === 'otro'} onChange={handleChange} />
					<label htmlFor='otro'>Otro</label>
				</div>

				<label htmlFor='comentario'>Comentario:</label>
				<textarea id='comentario' name='comentario' rows='5' placeholder='Escribe tu mensaje aquí...' value={formData.comentario} onChange={handleChange} required></textarea>

				<label htmlFor='archivo'>Subir Archivo (opcional):</label>
				<input type='file' id='archivo' name='archivo' onChange={handleFileChange} />

				<button type='submit'>Enviar</button>
			</form>
		</section>
	);
};

export default ContactSection;