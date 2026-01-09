import React, { useState, useEffect } from 'react';
import './App.css';
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaTrash, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';

// --- MOCK DATA ---
const mockProducts = [
  {
    id: 1,
    name: "Zapatillas Jordan Pro",
    price: 129.99,
    category: "Zapatos",
    description: "Domina la cancha con las Jordan Pro. Cuentan con amortiguación Air Zoom para saltos explosivos y un agarre multidireccional superior.",
    image: "https://images-cdn.ubuy.com.ph/649a1f2f67f0d47e86389ca1-nike-air-jordan-pro-strong-black.jpg"
  },
  {
    id: 2,
    name: "Camiseta Bulls '23",
    price: 79.99,
    category: "Camisetas",
    description: "Revive la gloria del 97. Tela transpirable Dri-Fit, bordados de alta calidad y el icónico número 23 en la espalda.",
    image: "https://images.stockx.com/images/Mitchell-Ness-Michael-Jordan-Chicago-Bulls-1997-98-Authentic-Jersey-Red-v2.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&q=60&dpr=1&trim=color&updated_at=1711385854"
  },
  {
    id: 3,
    name: "Balón Official NBA",
    price: 59.99,
    category: "Balones",
    description: "El balón oficial de la liga. Cuero genuino texturizado para un control perfecto y agarre consistente en duela.",
    image: "https://www.wilsonstore.mx/cdn/shop/files/d046033077.webp?v=1765774882"
  },
  {
    id: 4,
    name: "Zapatillas LeBron Witness",
    price: 119.99,
    category: "Zapatos",
    description: "Ligereza y potencia. Diseñadas para el juego físico, con soporte en el tobillo y una suela reactiva.",
    image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/23185886/2023/5/15/bc5bcf63-d3c7-4728-a1a9-18d9f09630561684128041278LeBronWitness7EPBasketballShoes1.jpg"
  },
  {
    id: 5,
    name: "Camiseta Lakers '24",
    price: 89.99,
    category: "Camisetas",
    description: "Edición City Edition 2024. Colores vibrantes y tecnología sweat-wicking para mantenerte seco.",
    image: "https://m.media-amazon.com/images/I/610lSEd207L.jpg"
  },
  {
    id: 6,
    name: "Balón Spalding TF-1000",
    price: 69.99,
    category: "Balones",
    description: "El clásico de entrenamiento. Microfibra compuesta ZK exclusiva para un manejo suave y duradero.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5FA7SdXpnNqLfurSAtoQapRfJOFbSMciXg&s"
  }
];

// --- NAVEGACIÓN PC ---
const DesktopNav = ({ onNavigate, cartCount }) => (
  <nav className="desktop-nav">
    <div className="nav-left">
      <h1 className="logo" onClick={() => onNavigate('home')}>BasketStore</h1>
      <div className="desktop-links">
        <a onClick={() => onNavigate('home')}>Inicio</a>
        <a onClick={() => onNavigate('home')}>Productos</a>
      </div>
    </div>
    
    <div className="nav-right">
      <div className="search-bar-desktop">
        <input type="text" placeholder="Buscar productos..." />
        <button><FaSearch /></button>
      </div>
      
      <a className="icon-link"><FaUser /></a>
      <a onClick={() => onNavigate('cart')} className="cart-link-desktop">
        <FaShoppingCart /> Carrito ({cartCount})
      </a>
    </div>
  </nav>
);

// --- NAVEGACIÓN MÓVIL ---
const MobileNav = ({ onNavigate, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-top">
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
        <h1 className="logo-mobile" onClick={() => onNavigate('home')}>BasketStore</h1>
        
        <div className="mobile-icons-group">
           <a className="mobile-icon"><FaUser size={22} /></a>
           <a onClick={() => onNavigate('cart')} className="mobile-icon" style={{position: 'relative'}}>
            <FaShoppingCart size={22} />
            {cartCount > 0 && <span className="mobile-badge">{cartCount}</span>}
          </a>
        </div>
      </div>

      <div className="mobile-search-container">
        <div className="search-bar-mobile">
          <input type="text" placeholder="Buscar productos..." />
          <button><FaSearch /></button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
            <div className="menu-header">
              <h3>Menú</h3>
              <button onClick={() => setIsMenuOpen(false)}><FaTimes /></button>
            </div>
            <a onClick={() => {onNavigate('home'); setIsMenuOpen(false)}} className="mobile-link">Inicio</a>
            <a onClick={() => {onNavigate('cart'); setIsMenuOpen(false)}} className="mobile-link">Mi Carrito</a>
            <a className="mobile-link">Ingresar como invitado</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- COMPONENTE: GRID DE PRODUCTOS (Reutilizable) ---
const ProductGrid = ({ products, onProductClick, onAddToCart }) => (
  <div className="product-grid-adaptive">
    {products.map(product => (
      <div key={product.id} className="product-card">
        <div className="img-container" onClick={() => onProductClick(product)}>
           <img src={product.image} alt={product.name} />
           <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}><FaHeart /></button>
        </div>
        <div className="info">
          <span>{product.category}</span>
          <h3 onClick={() => onProductClick(product)}>{product.name}</h3>
          <div className="price-row">
            <span className="price">${product.price}</span>
            <button className="add-btn" onClick={() => onAddToCart(product)}>Añadir</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// --- VISTA 2: DETALLE DE PRODUCTO (PDP) ---
const ProductDetail = ({ product, onBack, onAddToCart }) => {
  if (!product) return null;
  return (
    <div className="pdp-container">
      <button className="back-btn" onClick={onBack}><FaArrowLeft /> Volver</button>
      <div className="pdp-content">
        <div className="pdp-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="pdp-info">
          <span className="pdp-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="pdp-price">${product.price}</p>
          <p className="pdp-desc">{product.description}</p>
          <button className="pdp-add-btn" onClick={() => onAddToCart(product)}>
            Añadir al Carrito
          </button>
          <div className="pdp-meta">
            <p>✅ Envío disponible a todo Ecuador</p>
            <p>🛡️ Garantía de fábrica</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISTA 3: CARRITO DE COMPRAS ---
const CartView = ({ cart, onUpdateQty, onRemove, onCheckout, onBack }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-container-view">
      <h2>Tu Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>El carrito está vacío</p>
          <button className="back-btn" onClick={onBack}>Ir a comprar</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-controls">
                  <button onClick={() => onUpdateQty(item.id, -1)}><FaMinus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)}><FaPlus /></button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.id)}><FaTrash /></button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Resumen</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {/* Login simulado y Pago */}
            <button className="checkout-btn" onClick={onCheckout}>
              Ingresar como invitado y Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- APP PRINCIPAL ---
function App() {
  const [screenSize, setScreenSize] = useState('desktop');
  
  // ESTADOS DE LA APP
  const [currentView, setCurrentView] = useState('home'); // 'home', 'detail', 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // Lógica de Adaptabilidad
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreenSize('desktop');
      else if (width >= 768) setScreenSize('tablet');
      else setScreenSize('mobile');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FUNCIONES DEL CARRITO
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
      }
      return [...prevCart, {...product, quantity: 1}];
    });
    // Opcional: Feedback visual simple
    alert("Producto añadido");
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        return {...item, quantity: Math.max(1, item.quantity + delta)};
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // Alerta sweet (simulada con confirm nativo o alert simple por ahora)
    alert("Pedido realizado con éxito 🏀\nGracias por tu compra como invitado.");
    setCart([]);
    setCurrentView('home');
  };

  // NAVEGACIÓN
  const goToProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const navigate = (viewName) => {
    setCurrentView(viewName);
    window.scrollTo(0, 0);
  };

  // CALCULAR CANTIDAD TOTAL
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="App">
      {screenSize === 'desktop' && <DesktopNav onNavigate={navigate} cartCount={cartTotalItems} />}
      {screenSize === 'tablet' && <DesktopNav onNavigate={navigate} cartCount={cartTotalItems} />}
      {screenSize === 'mobile' && <MobileNav onNavigate={navigate} cartCount={cartTotalItems} />}

      <main className={`main-container ${screenSize}`}>
        
        {/* VISTA HOME */}
        {currentView === 'home' && (
          <>
            <section className="hero">
              <h2>Equípate para ganar</h2>
              <p>Los mejores artículos de basketball en Ecuador</p>
            </section>

            <section className="catalog">
              <h3 className="section-title">Nuevos Lanzamientos</h3>
              <ProductGrid 
                products={mockProducts} 
                onProductClick={goToProduct}
                onAddToCart={addToCart}
              />
            </section>

            <section className="benefits">
               <div className="benefit-card">🚚 Envío Gratis</div>
               <div className="benefit-card">🛡️ Garantía</div>
               <div className="benefit-card">💳 Pago Seguro</div>
            </section>
          </>
        )}

        {/* VISTA DETALLE PRODUCTO */}
        {currentView === 'detail' && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => navigate('home')}
            onAddToCart={addToCart}
          />
        )}

        {/* VISTA CARRITO */}
        {currentView === 'cart' && (
          <CartView 
            cart={cart}
            onUpdateQty={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
            onBack={() => navigate('home')}
          />
        )}

      </main>

      <footer>
        <p>&copy; 2026 BasketStore Ecuador - Adaptive Web Design</p>
      </footer>
    </div>
  );
}

export default App;