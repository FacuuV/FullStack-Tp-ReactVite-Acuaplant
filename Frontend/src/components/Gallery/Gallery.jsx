import React from 'react';
import './Gallery.css';
import galleryImg1 from '../../assets/Pecera 1.jpg';
import galleryImg2 from '../../assets/pecera2.jpg';
import galleryImg3 from '../../assets/pecera3.png';
import galleryImg4 from '../../assets/pecera4.png';
import galleryImg5 from '../../assets/pecera5.jpg';

const galleryImages = [
	{ src: galleryImg1, alt: 'Gallery Img1', className: 'gallery-img-1' },
	{ src: galleryImg3, alt: 'Gallery Img2', className: 'gallery-img-2' },
	{ src: galleryImg5, alt: 'Gallery Img3', className: 'gallery-img-3' },
	{ src: galleryImg4, alt: 'Gallery Img4', className: 'gallery-img-4' },
	{ src: galleryImg2, alt: 'Gallery Img5', className: 'gallery-img-5' },
];


const Gallery = () => {
	return (
		<section className='gallery container'>
			{galleryImages.map((image, index) => (
				<img
					key={index}
					src={image.src}
					alt={image.alt}
					className={image.className}
				/>
			))}
		</section>
	);
};

export default Gallery;