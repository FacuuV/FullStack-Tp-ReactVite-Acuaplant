import { useState, useEffect } from 'react'; // 1. Importamos useState y useEffect
import './App.css';
import Header from './components/Header/Header.jsx';
import Banner from './components/Banner/Banner.jsx';
import FeaturesSection from './components/FeaturesSection/FeaturesSection.jsx';
import TopCategories from './components/TopCategories/TopCategories.jsx';
import ProductsSection from './components/ProductsSection/ProductsSection.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import AccessoriesSection from './components/AccessoriesSection/AccessoriesSection.jsx';
import BlogSection from './components/BlogSection/BlogSection.jsx';
import Footer from './components/Footer/Footer.jsx';
import RegisterSection from './components/RegisterSection/RegisterSection.jsx';
import AddProductSection from './components/AddProductSection/AddProductSection.jsx';
import LoginSection from './components/LoginSection/LoginSection.jsx';
import ContactSection from './components/ContactSection/ContactSection.jsx';

function App() {
  // 2. Creamos un estado para saber si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 3. Usamos useEffect para comprobar si hay un token al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // 4. Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Borramos el token
    setIsLoggedIn(false); // Actualizamos el estado
    window.location.reload(); // Recargamos la página para una experiencia limpia
  };

  // Función para manejar el login exitoso (la llamaremos desde LoginSection)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {/* Pasamos la función de logout al Header para usarla allí si queremos */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="main-content">
        <Banner />
        <FeaturesSection />
        <TopCategories />
        <ProductsSection />
        <Gallery />
        <AccessoriesSection />
        <BlogSection />

        {/* --- 5. ¡AQUÍ ESTÁ LA MAGIA DEL RENDERIZADO CONDICIONAL! --- */}
        {isLoggedIn ? (
          // Si el usuario SÍ ha iniciado sesión, muestra esto:
          <>
            <AddProductSection />
            <div className="logout-container">
              <button onClick={handleLogout} className="logout-button">
                Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
          // Si el usuario NO ha iniciado sesión, muestra esto:
          <>
            {/* Pasamos la función handleLoginSuccess a LoginSection */}
            <RegisterSection />
            <LoginSection onLoginSuccess={handleLoginSuccess} />
          </>
        )}

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
