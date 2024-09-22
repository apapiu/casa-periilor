import React, { useCallback, useState, useEffect } from 'react';
import { FlagIcon } from 'react-flag-kit';
import { productData, translations } from './data';


const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return scrollToElement;
};

const useHandleScroll = () => {
  const scrollToElement = useSmoothScroll();

  const handleClick = (e, elementId) => {
    e.preventDefault();
    scrollToElement(elementId);
  };

  return handleClick;
};

const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ro' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useTranslation = () => {
  const { language } = React.useContext(LanguageContext);
  return translations[language];
};


// COMPONENTS:
const Header = () => {
  const handleClick = useHandleScroll();
  const { language, toggleLanguage } = React.useContext(LanguageContext);
  const t = useTranslation();

  return (
    <header className="bg-white bg-opacity-95 backdrop-blur-sm shadow-md fixed max-w-5xl w-full top-0 z-50 rounded">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800 mr-3">Casa Periilor</div>
        <nav className="flex items-center">
          <ul className="flex space-x-6 mr-4">
            {['home', 'products', 'about', 'contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={(e) => handleClick(e, item)}
                  className="text-gray-600 hover:text-amber-600 uppercase text-sm tracking-wide"
                >
                  {t[item]}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleLanguage}
            className="focus:outline-none"
            aria-label={language === 'en' ? 'Switch to Romanian' : 'Switch to English'}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-amber-600 transition duration-300 flex items-center justify-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <FlagIcon code={language === 'en' ? 'RO' : 'GB'} size={40} />
              </div>
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
  const handleClick = useHandleScroll();
  const t = useTranslation();

  return (
    <section id="home" className="bg-blue-100 text-center py-32 px-4 mt-16">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">{t.heroTitle}</h1>
        <p className="text-xl text-gray-600 mb-8">{t.heroSubtitle}</p>
        <a
          onClick={(e) => handleClick(e, "products")}
          href="#products"
          className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition duration-300"
        >
          {t.exploreCollection}
        </a>
      </div>
    </section>
  );
};


const Modal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className={`bg-white p-8 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="float-right text-2xl">&times;</button>
        {children}
      </div>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Product ${index + 1}`} 
            className="w-full h-auto object-cover flex-shrink-0"
          />
        ))}
      </div>
      <button 
        onClick={prevImage} 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
      >
        &#10094;
      </button>
      <button 
        onClick={nextImage} 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
      >
        &#10095;
      </button>
    </div>
  );
};

const ProductCard = ({ title, description, images, prices, sizes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = () => {
    const subject = encodeURIComponent(`Inquiry about ${title}`);
    const body = encodeURIComponent(`Hi,\n\nI am interested in the ${title} product. Could you please provide me with more information?\n\nThank you.`);
    window.location.href = `mailto:info@artisanbrush.ro?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-6 flex flex-col h-full">
        <ImageCarousel images={images} />
        <h3 className="text-xl font-semibold text-amber-600 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-amber-600 text-white px-4 py-2 rounded-xl hover:bg-amber-700 transition duration-300 mt-auto"
        >
          Details
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <ImageCarousel images={images} />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-amber-600 mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Prices:</h4>
              <ul className="list-disc list-inside">
                {prices.map((price, index) => (
                  <li key={index}>{price}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Sizes:</h4>
              <ul className="list-disc list-inside">
                {sizes.map((size, index) => (
                  <li key={index}>{size}</li>
                ))}
              </ul>
            </div>
            <button 
              onClick={handleContactClick}
              className="bg-green-800 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition duration-300"
            >
              Contact Us About This Product
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const Products = () => {
  const t = useTranslation();
  return (
    <section id="products" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">{t.premiumCollections}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productData.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const t = useTranslation();
  return (
    <section id="about" className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">{t.heritage}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Alexandru_Papiu-Ilarian.jpg/220px-Alexandru_Papiu-Ilarian.jpg" alt="Heritage" className="w-full md:w-1/3 rounded-lg shadow-md" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Alexandru_Papiu-Ilarian.jpg/220px-Alexandru_Papiu-Ilarian.jpg" alt="Founder" className="w-full md:w-1/4 rounded-lg shadow-md" />
        </div>
        <p className="text-gray-600 mt-8 text-center max-w-2xl mx-auto">
          {t.heritageText}
        </p>
      </div>
    </section>
  );
};

const Contact = () => {
  const t = useTranslation();
  return (
    <section id="contact" className="py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-8">{t.connectWithUs}</h2>
        <p className="text-gray-600 mb-2">Email: info@artisanbrush.ro</p>
        <p className="text-gray-600 mb-2">Phone: +40 123 456 789</p>
        <p className="text-gray-600">Studio: 123 Atelier Street, Bucharest, Romania</p>
      </div>
    </section>
  );
};

const Footer = () => {
  const t = useTranslation();
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; 2024 Artisan Brush Co. {t.footer}</p>
        <div className="space-x-4">
          {['Facebook', 'WhatsApp', 'LinkedIn'].map((social) => (
            <a key={social} href="#" className="text-gray-300 hover:text-white transition duration-300">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

const App = () => (
  <LanguageProvider>
    <div className="font-sans bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-md">
        <Header />
        <main>
          <Hero />
          <Products />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  </LanguageProvider>
);

export default App;