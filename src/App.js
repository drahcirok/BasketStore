import React, { useState, useEffect } from 'react';
import './App.css';
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaTrash, FaArrowLeft, FaMinus, FaPlus, FaHeartBroken, FaSearchMinus, FaTruck, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

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
const DesktopNav = ({ onNavigate, cartCount, favCount, searchTerm, onSearch }) => (
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
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          value={searchTerm}
          onChange={onSearch}
        />
        <button><FaSearch /></button>
      </div>
      
      <a onClick={() => onNavigate('favorites')} className="icon-link" title="Mis Favoritos">
        <FaHeart style={{ color: favCount > 0 ? '#e74c3c' : 'white' }} />
      </a>
      
      <a className="icon-link"><FaUser /></a>
      <a onClick={() => onNavigate('cart')} className="cart-link-desktop">
        <FaShoppingCart /> Carrito ({cartCount})
      </a>
    </div>
  </nav>
);

// --- NAVEGACIÓN MÓVIL ---
const MobileNav = ({ onNavigate, cartCount, favCount, searchTerm, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-top">
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
        <h1 className="logo-mobile" onClick={() => onNavigate('home')}>BasketStore</h1>
        
        <div className="mobile-icons-group">
           <a onClick={() => onNavigate('favorites')} className="mobile-icon">
             <FaHeart size={22} style={{ color: favCount > 0 ? '#e74c3c' : 'white' }} />
           </a>
           <a className="mobile-icon"><FaUser size={22} /></a>
           <a onClick={() => onNavigate('cart')} className="mobile-icon" style={{position: 'relative'}}>
            <FaShoppingCart size={22} />
            {cartCount > 0 && <span className="mobile-badge">{cartCount}</span>}
          </a>
        </div>
      </div>

      <div className="mobile-search-container">
        <div className="search-bar-mobile">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            value={searchTerm}
            onChange={onSearch}
          />
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
            <a onClick={() => {onNavigate('favorites'); setIsMenuOpen(false)}} className="mobile-link">Mis Favoritos</a>
            <a onClick={() => {onNavigate('cart'); setIsMenuOpen(false)}} className="mobile-link">Mi Carrito</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- GRID DE PRODUCTOS ---
const ProductGrid = ({ products, onProductClick, onAddToCart, onToggleFav, favorites }) => {
  if (products.length === 0) {
    return (
      <div className="empty-search" style={{textAlign: 'center', padding: '50px', width: '100%', gridColumn: '1 / -1'}}>
        <FaSearchMinus size={50} color="#ccc" />
        <p style={{marginTop: '10px', color: '#666'}}>No encontramos productos con ese nombre.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-adaptive">
      {products.map(product => {
        const isFav = favorites.some(f => f.id === product.id);
        return (
          <div key={product.id} className="product-card">
            <div className="img-container" onClick={() => onProductClick(product)}>
               <img src={product.image} alt={product.name} />
               <button 
                  className={`wishlist-btn ${isFav ? 'active' : ''}`} 
                  onClick={(e) => { e.stopPropagation(); onToggleFav(product); }}
               >
                  <FaHeart />
               </button>
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
        );
      })}
    </div>
  );
};

// --- PDP ---
const ProductDetail = ({ product, onBack, onAddToCart, onToggleFav, favorites }) => {
  if (!product) return null;
  const isFav = favorites.some(f => f.id === product.id);

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
          <div className="pdp-actions" style={{display: 'flex', gap: '10px'}}>
            <button className="pdp-add-btn" onClick={() => onAddToCart(product)}>
              Añadir al Carrito
            </button>
            <button 
              className={`pdp-fav-btn ${isFav ? 'active' : ''}`}
              onClick={() => onToggleFav(product)}
              style={{
                background: 'white', border: '2px solid #eee', borderRadius: '8px', 
                width: '60px', cursor: 'pointer', fontSize: '1.5rem',
                color: isFav ? '#e74c3c' : '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <FaHeart />
            </button>
          </div>
          <div className="pdp-meta">
            <p>✅ Envío disponible a todo Ecuador</p>
            <p>🛡️ Garantía de fábrica</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 🔥 WIZARD PASO 1: ENVÍO ---
const MobileCheckoutStep1 = ({ cart, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: 'Cuenca',
    telefono: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.direccion && formData.telefono) {
      onNext(formData);
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  return (
    <div className="mobile-wizard">
      <div className="wizard-header">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Volver al carrito
        </button>
        <div className="wizard-steps">
          <div className="step active">
            <FaTruck /> <span>Envío</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <FaCreditCard /> <span>Pago</span>
          </div>
        </div>
      </div>

      <div className="wizard-content">
        <h2>Información de Envío</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label>Nombre completo *</label>
            <input 
              type="text" 
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div className="form-group">
            <label>Dirección *</label>
            <input 
              type="text" 
              value={formData.direccion}
              onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              placeholder="Av. Solano y Ordóñez Lasso"
              required
            />
          </div>

          <div className="form-group">
            <label>Ciudad *</label>
            <select 
              value={formData.ciudad}
              onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
            >
              <option>Cuenca</option>
              <option>Quito</option>
              <option>Guayaquil</option>
              <option>Loja</option>
              <option>Ambato</option>
            </select>
          </div>

          <div className="form-group">
            <label>Teléfono *</label>
            <input 
              type="tel" 
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              placeholder="0998765432"
              required
            />
          </div>

          <button type="submit" className="wizard-next-btn">
            Continuar a Pago <FaArrowLeft style={{transform: 'rotate(180deg)'}} />
          </button>
        </form>
      </div>
    </div>
  );
};

// --- 🔥 WIZARD PASO 2: PAGO ---
const MobileCheckoutStep2 = ({ cart, shippingData, onBack, onConfirm }) => {
  const [paymentData, setPaymentData] = useState({
    metodoPago: 'tarjeta',
    numeroTarjeta: '',
    nombreTarjeta: '',
    expiracion: '',
    cvv: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentData.metodoPago === 'efectivo') {
      onConfirm({ ...shippingData, ...paymentData });
    } else if (paymentData.numeroTarjeta && paymentData.nombreTarjeta && paymentData.expiracion && paymentData.cvv) {
      onConfirm({ ...shippingData, ...paymentData });
    } else {
      alert('Por favor completa los datos de pago');
    }
  };

  return (
    <div className="mobile-wizard">
      <div className="wizard-header">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Volver a Envío
        </button>
        <div className="wizard-steps">
          <div className="step completed">
            <FaCheckCircle style={{color: '#27ae60'}} /> <span>Envío</span>
          </div>
          <div className="step-line active"></div>
          <div className="step active">
            <FaCreditCard /> <span>Pago</span>
          </div>
        </div>
      </div>

      <div className="wizard-content">
        <h2>Método de Pago</h2>
        
        <div className="payment-methods">
          <label className={`payment-option ${paymentData.metodoPago === 'tarjeta' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="pago" 
              value="tarjeta"
              checked={paymentData.metodoPago === 'tarjeta'}
              onChange={(e) => setPaymentData({...paymentData, metodoPago: e.target.value})}
            />
            <span>💳 Tarjeta de Crédito/Débito</span>
          </label>

          <label className={`payment-option ${paymentData.metodoPago === 'efectivo' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="pago" 
              value="efectivo"
              checked={paymentData.metodoPago === 'efectivo'}
              onChange={(e) => setPaymentData({...paymentData, metodoPago: e.target.value})}
            />
            <span>💵 Pago con la entrega</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          {paymentData.metodoPago === 'tarjeta' && (
            <>
              <div className="form-group">
                <label>Número de tarjeta *</label>
                <input 
                  type="text" 
                  value={paymentData.numeroTarjeta}
                  onChange={(e) => setPaymentData({...paymentData, numeroTarjeta: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-group">
                <label>Nombre en la tarjeta *</label>
                <input 
                  type="text" 
                  value={paymentData.nombreTarjeta}
                  onChange={(e) => setPaymentData({...paymentData, nombreTarjeta: e.target.value})}
                  placeholder="JUAN PEREZ"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vencimiento *</label>
                  <input 
                    type="text" 
                    value={paymentData.expiracion}
                    onChange={(e) => setPaymentData({...paymentData, expiracion: e.target.value})}
                    placeholder="MM/AA"
                    maxLength="5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>CVV *</label>
                  <input 
                    type="text" 
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {paymentData.metodoPago === 'efectivo' && (
            <div className="payment-info">
              <p>💵 Pagarás <strong>${total.toFixed(2)}</strong> en efectivo al momento de la entrega.</p>
              <p>📦 El pedido llegará a: <strong>{shippingData.direccion}, {shippingData.ciudad}</strong></p>
            </div>
          )}

          <div className="order-summary">
            <h3>Resumen del pedido</h3>
            <div className="summary-row">
              <span>Subtotal ({cart.length} productos)</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>Gratis 🎉</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="wizard-confirm-btn">
            Confirmar Pedido <FaCheckCircle />
          </button>
        </form>
      </div>
    </div>
  );
};

// --- VISTA CARRITO (Desktop/Tablet + Móvil sin wizard) ---
const CartView = ({ cart, onUpdateQty, onRemove, onCheckout, onBack }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return (
    <div className="cart-container-view">
      <h2>Tu Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>El carrito está vacío</p>
          <button className="back-btn" onClick={onBack} style={{justifyContent: 'center'}}>Ir a comprar</button>
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
            <button className="checkout-btn" onClick={onCheckout}>
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- VISTA FAVORITOS ---
const FavoritesView = ({ favorites, onToggleFav, onProductClick, onAddToCart, onBack }) => {
  return (
    <div className="favorites-view">
      <h2>Mis Favoritos ❤️</h2>
      {favorites.length === 0 ? (
        <div className="empty-cart">
          <FaHeartBroken size={50} color="#ccc" style={{marginBottom: '20px'}}/>
          <p>Aún no tienes favoritos guardados.</p>
          <button className="back-btn" onClick={onBack} style={{justifyContent: 'center'}}>Explorar productos</button>
        </div>
      ) : (
        <ProductGrid 
          products={favorites} 
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
          onToggleFav={onToggleFav}
          favorites={favorites}
        />
      )}
    </div>
  );
};

// --- APP PRINCIPAL ---
function App() {
  const [screenSize, setScreenSize] = useState('desktop');
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shippingData, setShippingData] = useState(null);

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
    alert("Producto añadido al carrito 🛒");
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
    if (screenSize === 'mobile') {
      setCheckoutStep(1);
    } else {
      alert("Pedido realizado con éxito 🏀\nGracias por tu compra.");
      setCart([]);
      setCurrentView('home');
    }
  };

  const handleConfirmOrder = (paymentInfo) => {
    alert("¡Pedido confirmado! 🎉\n\nLlegará a: " + paymentInfo.direccion + "\nMétodo: " + paymentInfo.metodoPago);
    setCart([]);
    setCheckoutStep(0);
    setShippingData(null);
    setCurrentView('home');
  };

  const toggleFavorite = (product) => {
    setFavorites(prevFavs => {
      const exists = prevFavs.some(item => item.id === product.id);
      if (exists) return prevFavs.filter(item => item.id !== product.id);
      else return [...prevFavs, product];
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (currentView !== 'home') setCurrentView('home');
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const navigate = (viewName) => {
    setCurrentView(viewName);
    setSearchTerm('');
    setCheckoutStep(0);
    window.scrollTo(0, 0);
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="App">
      {screenSize === 'desktop' && 
        <DesktopNav 
          onNavigate={navigate} 
          cartCount={cartTotalItems} 
          favCount={favorites.length}
          searchTerm={searchTerm}
          onSearch={handleSearch} 
        />}
      {screenSize === 'tablet' && 
        <DesktopNav 
          onNavigate={navigate} 
          cartCount={cartTotalItems} 
          favCount={favorites.length}
          searchTerm={searchTerm}
          onSearch={handleSearch} 
        />}
      {screenSize === 'mobile' && 
        <MobileNav 
          onNavigate={navigate} 
          cartCount={cartTotalItems} 
          favCount={favorites.length}
          searchTerm={searchTerm}
          onSearch={handleSearch} 
        />}

      <main className={`main-container ${screenSize}`}>
        
        {currentView === 'home' && (
          <>
            <section className="hero">
              <h2>Equípate para ganar</h2>
              <p>Los mejores artículos de basketball en Ecuador</p>
            </section>

            <section className="catalog">
              <h3 className="section-title">
                {searchTerm ? `Resultados para: "${searchTerm}"` : "Nuevos Lanzamientos"}
              </h3>
              
              <ProductGrid 
                products={filteredProducts} 
                onProductClick={goToProduct}
                onAddToCart={addToCart}
                onToggleFav={toggleFavorite}
                favorites={favorites}
              />
            </section>

            <section className="benefits">
               <div className="benefit-card">🚚 Envío Gratis</div>
               <div className="benefit-card">🛡️ Garantía</div>
               <div className="benefit-card">💳 Pago Seguro</div>
            </section>
          </>
        )}

        {currentView === 'detail' && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => navigate('home')}
            onAddToCart={addToCart}
            onToggleFav={toggleFavorite}
            favorites={favorites}
          />
        )}

        {currentView === 'cart' && checkoutStep === 0 && (
          <CartView 
            cart={cart}
            onUpdateQty={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
            onBack={() => navigate('home')}
          />
        )}

        {currentView === 'cart' && screenSize === 'mobile' && checkoutStep === 1 && (
          <MobileCheckoutStep1 
            cart={cart}
            onNext={(data) => { setShippingData(data); setCheckoutStep(2); }}
            onBack={() => setCheckoutStep(0)}
          />
        )}

        {currentView === 'cart' && screenSize === 'mobile' && checkoutStep === 2 && (
          <MobileCheckoutStep2 
            cart={cart}
            shippingData={shippingData}
            onBack={() => setCheckoutStep(1)}
            onConfirm={handleConfirmOrder}
          />
        )}

        {currentView === 'favorites' && (
          <FavoritesView 
            favorites={favorites}
            onToggleFav={toggleFavorite}
            onProductClick={goToProduct}
            onAddToCart={addToCart}
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