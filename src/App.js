import React, { useState, useEffect } from 'react';
import './App.css';
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaUser, FaHeart } from 'react-icons/fa';

// --- MOCK DATA (Tus productos) ---
const mockProducts = [
  {
    id: 1,
    name: "Zapatillas Jordan Pro",
    price: 129.99,
    category: "Zapatos",
    description: "Zapatillas de alto rendimiento con tecnología Air",
    // Nueva imagen de zapatillas Nike/Jordan
    image: "https://images-cdn.ubuy.com.ph/649a1f2f67f0d47e86389ca1-nike-air-jordan-pro-strong-black.jpg"
  },
  {
    id: 2,
    name: "Camiseta Bulls '23",
    price: 79.99,
    category: "Camisetas",
    description: "Réplica de la camiseta del equipo Chicago Bulls 1997",
    // Nueva imagen: Camiseta Roja
    image: "https://images.stockx.com/images/Mitchell-Ness-Michael-Jordan-Chicago-Bulls-1997-98-Authentic-Jersey-Red-v2.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&q=60&dpr=1&trim=color&updated_at=1711385854"
  },
  {
    id: 3,
    name: "Balón Official NBA",
    price: 59.99,
    category: "Balones",
    description: "Balón oficial de la NBA para competición",
    image: "https://www.wilsonstore.mx/cdn/shop/files/d046033077.webp?v=1765774882"
  },
  {
    id: 4,
    name: "Zapatillas LeBron Witness",
    price: 119.99,
    category: "Zapatos",
    description: "Diseñadas para el juego explosivo de LeBron",
    image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/23185886/2023/5/15/bc5bcf63-d3c7-4728-a1a9-18d9f09630561684128041278LeBronWitness7EPBasketballShoes1.jpg"
  },
  {
    id: 5,
    name: "Camiseta Lakers '24",
    price: 89.99,
    category: "Camisetas",
    description: "Nueva edición de la camiseta de Los Angeles Lakers",
    // Nueva imagen: Camiseta Amarilla
    image: "https://m.media-amazon.com/images/I/610lSEd207L.jpg"
  },
  {
    id: 6,
    name: "Balón Spalding TF-1000",
    price: 69.99,
    category: "Balones",
    description: "Balón profesional para entrenamiento",
    // Nueva imagen: Balón en cancha
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5FA7SdXpnNqLfurSAtoQapRfJOFbSMciXg&s"
  }
];

// --- NAVEGACIÓN PC (Con Buscador) ---
const DesktopNav = () => (
  <nav className="desktop-nav">
    <div className="nav-left">
      <h1 className="logo">BasketStore</h1>
      <div className="desktop-links">
        <a href="#home">Inicio</a>
        <a href="#products">Productos</a>
        <a href="#sale">Ofertas</a>
      </div>
    </div>
    
    <div className="nav-right">
      {/* Buscador con texto unificado */}
      <div className="search-bar-desktop">
        <input type="text" placeholder="Buscar productos..." />
        <button><FaSearch /></button>
      </div>
      
      {/* Iconos blancos limpios */}
      <a href="#profile" className="icon-link"><FaUser /></a>
      <a href="#cart" className="cart-link-desktop">
        <FaShoppingCart /> Carrito
      </a>
    </div>
  </nav>
);

// --- NAVEGACIÓN MÓVIL (Hamburguesa + Buscador Visible) ---
const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mobile-nav">
      {/* Fila Superior */}
      <div className="mobile-nav-top">
        <button 
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
        <h1 className="logo-mobile">BasketStore</h1>
        
        {/* GRUPO DE ICONOS DERECHA (Usuario + Carrito) */}
        <div className="mobile-icons-group">
           <a href="#profile" className="mobile-icon">
            <FaUser size={22} />
          </a>
          <a href="#cart" className="mobile-icon">
            <FaShoppingCart size={22} />
          </a>
        </div>
      </div>

      {/* Buscador Móvil con texto unificado */}
      <div className="mobile-search-container">
        <div className="search-bar-mobile">
          <input type="text" placeholder="Buscar productos..." />
          <button><FaSearch /></button>
        </div>
      </div>
      
      {/* Menú Desplegable Lateral */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
            <div className="menu-header">
              <h3>Menú</h3>
              <button onClick={() => setIsMenuOpen(false)}><FaTimes /></button>
            </div>
            <a href="#home" className="mobile-link">Inicio</a>
            <a href="#products" className="mobile-link">Productos</a>
            <a href="#sale" className="mobile-link">Ofertas</a>
            <a href="#account" className="mobile-link">Mi Cuenta</a>
            <a href="#help" className="mobile-link">Ayuda</a>
          </div>
        </div>
      )}
    </nav>
  );
};
// --- NAVEGACIÓN TABLET ---
const TabletNav = () => (
  <nav className="tablet-nav">
    <div className="tablet-top">
      <h1 className="logo-tablet">BasketStore</h1>
      <a href="#cart" className="cart-tablet"><FaShoppingCart /></a>
    </div>
    {/* Buscador Tablet */}
    <div className="search-bar-tablet">
      <input type="text" placeholder="Buscar..." />
      <button><FaSearch /></button>
    </div>
    <div className="tablet-links">
      <a href="#home">Inicio</a>
      <a href="#products">Productos</a>
      <a href="#sale">Ofertas</a>
    </div>
  </nav>
);

// --- COMPONENTES DE PRODUCTOS (Rejillas fijas) ---
const DesktopProductGrid = ({ products }) => (
  <div className="desktop-product-grid">
    {products.map(product => (
      <div key={product.id} className="desktop-product-card">
        <div className="img-container">
           <img src={product.image} alt={product.name} />
           <button className="wishlist-btn"><FaHeart /></button>
        </div>
        <div className="info">
          <span>{product.category}</span>
          <h3>{product.name}</h3>
          <div className="price-row">
            <span className="price">${product.price}</span>
            <button className="add-btn">Añadir</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MobileProductList = ({ products }) => (
  <div className="mobile-product-list">
    {products.map(product => (
      <div key={product.id} className="mobile-product-card">
        <img src={product.image} alt={product.name} />
        <div className="mobile-info">
          <span>{product.category}</span>
          <h3>{product.name}</h3>
          <p className="price">${product.price}</p>
          <button className="mobile-add-btn">Comprar</button>
        </div>
      </div>
    ))}
  </div>
);

// --- APP PRINCIPAL ---
function App() {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Lógica Adaptativa (AWD) - Puntos de ruptura fijos
      if (width >= 1024) setScreenSize('desktop');
      else if (width >= 768) setScreenSize('tablet');
      else setScreenSize('mobile');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      {screenSize === 'desktop' && <DesktopNav />}
      {screenSize === 'tablet' && <TabletNav />}
      {screenSize === 'mobile' && <MobileNav />}

      <main className={`main-container ${screenSize}`}>
        
        {/* ELIMINADO: <div className="width-badge">...</div> YA NO ESTÁ AQUÍ */}

        <section className="hero">
          <h2>Equípate para ganar</h2>
          <p>Los mejores artículos de basketball en Ecuador</p>
        </section>

        <section className="catalog">
          <h3 className="section-title">Nuevos Lanzamientos</h3>
          
          {screenSize === 'desktop' && <DesktopProductGrid products={mockProducts} />}
          {screenSize === 'tablet' && <DesktopProductGrid products={mockProducts} />} 
          {screenSize === 'mobile' && <MobileProductList products={mockProducts} />}
        </section>

        <section className="benefits">
           <div className="benefit-card">🚚 Envío Gratis</div>
           <div className="benefit-card">🛡️ Garantía</div>
           <div className="benefit-card">💳 Pago Seguro</div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 BasketStore Ecuador - Adaptive Web Design</p>
      </footer>
    </div>
  );
}

export default App;