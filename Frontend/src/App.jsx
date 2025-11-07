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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    window.location.reload();
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="main-content">
        <Banner />
        <FeaturesSection />
        <TopCategories />
        <ProductsSection />
        <Gallery />
        <AccessoriesSection />
        <BlogSection />
        {isLoggedIn ? (
          <>
            <AddProductSection />
            <div className="logout-container">
              <button onClick={handleLogout} className="logout-button">
                Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
  
          <>
            
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
