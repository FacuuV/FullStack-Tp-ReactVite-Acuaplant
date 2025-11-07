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
import LoginSection from './components/LoginSection/LoginSection.jsx';
import ContactSection from './components/ContactSection/ContactSection.jsx';


function App() {


  return (
    
    <div className="App">
      <Header />
      <main className="main-content">
        <Banner />
        <FeaturesSection />
        <TopCategories />
        <ProductsSection />
        <Gallery />
        <AccessoriesSection />
        <BlogSection />
        <RegisterSection />
        <LoginSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
