# BasketStore Ecuador | Adaptive Web Design

Aplicación de comercio electrónico especializada en artículos de basketball, desarrollada bajo la metodología de Diseño Web Adaptativo (AWD). Este proyecto demuestra la implementación de interfaces gráficas que se adaptan a dispositivos específicos (Móvil, Tablet, Escritorio) mediante puntos de ruptura fijos y renderizado condicional de componentes.

## 🔗 Demo en Vivo

Puedes visualizar el proyecto desplegado en producción aquí:
**[https://drahcirok.github.io/BasketStore](https://drahcirok.github.io/BasketStore)**

## 📋 Descripción del Proyecto

BasketStore no es simplemente una web responsiva fluida; es una aplicación **adaptativa**. El sistema detecta el ancho del dispositivo del usuario y sirve una experiencia de usuario (UX) y una interfaz (UI) optimizada específicamente para ese entorno.

A diferencia del diseño responsivo tradicional que "estira" los elementos, esta aplicación modifica la estructura del DOM y los estilos para ofrecer:
* **Móvil:** Navegación optimizada para pulgares, menús laterales y búsqueda persistente.
* **Escritorio:** Mega menús, grids expandidos y controles de precisión (mouse).

## 🛠️ Stack Tecnológico

* **Frontend Library:** React 18
* **Styling:** CSS3 (Vanilla, Metodología BEM)
* **Iconography:** React Icons (FontAwesome)
* **Deployment:** GitHub Pages
* **Version Control:** Git

## ✨ Funcionalidades Principales

### 1. Arquitectura Adaptativa (AWD)
Implementación de lógica de detección de viewport (`window.innerWidth`) para renderizar componentes distintos según el dispositivo:
* **Mobile View (< 768px):** Contenedor fijo al 100% (max 360px). Header compacto, menú hamburguesa y barra de búsqueda estilo Glassmorphism.
* **Tablet View (768px - 1023px):** Contenedor fijo de 720px. Grid de productos de 2 columnas.
* **Desktop View (>= 1024px):** Contenedor fijo de 1000px. Grid de 3 columnas y navegación horizontal completa.

### 2. Gestión de Estado (Shopping Cart)
Sistema de carrito de compras funcional desarrollado con React Hooks (`useState`, `useEffect`):
* Persistencia de ítems durante la sesión.
* Cálculo dinámico de subtotales y totales.
* Lógica de incremento/decremento de stock y eliminación de ítems.
* **Diseño Diferenciado:** El carrito en móvil presenta un layout horizontal compacto, mientras que en escritorio utiliza un layout tabular expandido.

### 3. Página de Detalle de Producto (PDP)
Navegación fluida SPA (Single Page Application) sin recargas. Al seleccionar un producto, la interfaz cambia para mostrar especificaciones detalladas, imágenes en alta resolución y opciones de compra, manteniendo la consistencia visual del tema.

### 4. UI/UX Polish
* **Glassmorphism:** Efectos de transparencia y desenfoque en barras de búsqueda para integración con fondos sólidos.
* **Feedback Visual:** Estados de interacción (Hover, Active) en botones y tarjetas de producto.
* **Consistencia de Marca:** Paleta de colores unificada (Primary Blue `#4a69bd`, Accent Orange `#ff6b00`, Success Green `#27ae60`).

## ⚙️ Instalación y Despliegue Local

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1.  **Clonar el repositorio**
    ```bash
    git clone [https://github.com/drahcirok/BasketStore.git](https://github.com/drahcirok/BasketStore.git)
    cd BasketStore
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Ejecutar servidor de desarrollo**
    ```bash
    npm start
    ```
    La aplicación se iniciará en `http://localhost:3000`.

## 🚀 Despliegue

El proyecto está configurado para despliegue automático mediante `gh-pages`.

```bash
npm run deploy
```
Desarrollado por: drahcirok
