import { useState, useEffect } from 'react'; // 
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
import AdminDashboard from './components/AdminDashboard/AdminDashboard.jsx';
import LoginSection from './components/LoginSection/LoginSection.jsx';
import ContactSection from './components/ContactSection/ContactSection.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  const handleProductsChange = () => {
    setRefreshTrigger(prev => prev + 1);
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
            {}
            <AddProductSection onProductAdded={handleProductsChange} />
            {}
            <AdminDashboard 
              refreshTrigger={refreshTrigger} 
              onProductsChange={handleProductsChange} 
            />
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
