import React from 'react';
import './Footer.css';
import paymentImg from '../../assets/payment.png';
const infoLinks = [
	'Acerca de Nosotros',
	'Información de Pedidos',
	'Políticas de Privacidad',
	'Términos y Condiciones',
	'Contáctanos',
];

const accountLinks = [
	'Mi Cuenta',
	'Historial de Pedidos',
	'Lista de Deseos',
	'Mis Peces',
	'Reembolsos',
];

const socialIcons = [
	{ name: 'facebook', icon: 'fa-brands fa-facebook-f' },
	{ name: 'twitter', icon: 'fa-brands fa-twitter' },
	{ name: 'youtube', icon: 'fa-brands fa-youtube' },
	{ name: 'pinterest', icon: 'fa-brands fa-pinterest-p' },
	{ name: 'instagram', icon: 'fa-brands fa-instagram' },
];

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container container-footer'>
				<div className='menu-footer'>
					<div className='contact-info'>
						<p className='title-footer'>Información de Contacto</p>
						<ul>
							<li>Dirección: Lanús, Valentín Alsina - Buenos Aires</li>
							<li>Teléfono: 123-456-7890</li>
							<li>Email: aquaplant@support.com</li>
						</ul>
						<div className='social-icons'>
							{socialIcons.map(social => (
								<span key={social.name} className={social.name}>
									<i className={social.icon}></i>
								</span>
							))}
						</div>
					</div>

					<div className='information'>
						<p className='title-footer'>Información</p>
						<ul>
							{infoLinks.map(link => (
								<li key={link}><a href='#'>{link}</a></li>
							))}
						</ul>
					</div>

					<div className='my-account'>
						<p className='title-footer'>Mi Cuenta</p>
						<ul>
							{accountLinks.map(link => (
								<li key={link}><a href='#'>{link}</a></li>
							))}
						</ul>
					</div>

					<div className='newsletter'>
						<p className='title-footer'>Boletín de Novedades</p>
						<div className='content'>
							<p>Suscríbete para recibir nuestras últimas noticias y ofertas exclusivas.</p>
							<input type='email' placeholder='Ingresa tu correo electrónico...' />
							<button>Suscríbete</button>
						</div>
					</div>
				</div>

				<div className='copyright'>
					<p>Desarrollado por Facundo Vazquez &copy; 2025</p>
					<img src={paymentImg} alt='Métodos de pago' />
				</div>
			</div>
		</footer>
	);
};

export default Footer;