# Frontend SommelIAr - Setup Completo

## Estado Actual

Frontend configurado con:
- React + Vite
- React Router DOM
- Tailwind CSS
- Flowbite React
- Paleta de colores tipo vino (bordo oscuro, crema)

---

## Instalacion

### 1. Instalar dependencias

```bash
cd frontend

# Instalar React Router
npm install react-router-dom

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Inicializar Tailwind
npx tailwindcss init -p

# Instalar Flowbite
npm install flowbite-react flowbite
```

O ejecuta el script automatizado:

```bash
chmod +x setup-frontend.sh
./setup-frontend.sh
```

### 2. Iniciar servidor de desarrollo

```bash
npm run dev
```

El frontend estara disponible en `http://localhost:5173`

---

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx           # Pagina de login
│   │   ├── RegisterPage.jsx        # Pagina de registro
│   │   └── WineListPage.jsx        # Lista de vinos con navbar
│   ├── App.jsx                     # Rutas principales
│   ├── main.jsx                    # Entry point con BrowserRouter
│   └── index.css                   # Estilos globales + Tailwind
├── tailwind.config.js              # Configuracion de Tailwind + paleta
├── postcss.config.js               # Configuracion de PostCSS
├── vite.config.js                  # Configuracion de Vite
└── package.json
```

---

## Rutas Disponibles

| Ruta | Componente | Descripcion |
|------|-----------|-------------|
| `/` | Redirect | Redirige a `/login` |
| `/login` | LoginPage | Formulario de inicio de sesion |
| `/register` | RegisterPage | Formulario de registro |
| `/wines` | WineListPage | Lista de vinos del usuario |

---

## Paleta de Colores

### Wine (Bordo)
```javascript
wine: {
  50: '#fdf2f4',   // Muy claro
  100: '#fce7eb',
  200: '#f9d0d9',
  300: '#f4a7b7',
  400: '#ed7690',
  500: '#e1466b',
  600: '#cd2a56',
  700: '#ad1f47',  // Principal
  800: '#8f1d40',
  900: '#771b3a',  // Oscuro para navbar
  950: '#430a1d',  // Muy oscuro
}
```

### Cream (Crema)
```javascript
cream: {
  50: '#fdfbf7',   // Muy claro - fondos
  100: '#faf6ed',
  200: '#f5edd9',
  300: '#ecdfc0',
  400: '#dfc89d',
  500: '#d4b17e',
  600: '#c89a6c',
  700: '#b37f5c',
  800: '#92674e',
  900: '#765542',
}
```

### Uso
```jsx
// Fondo de pagina de login
className="bg-gradient-to-br from-wine-900 via-wine-800 to-wine-950"

// Formularios
className="bg-cream-50"

// Botones principales
className="bg-wine-700 hover:bg-wine-800"

// Navbar
className="bg-wine-900"

// Texto
className="text-wine-900"
```

---

## Componentes Creados

### LoginPage
- Formulario de login con email y password
- Link a registro
- Estilo elegante con paleta wine/cream
- Fondo degradado bordo oscuro

### RegisterPage
- Formulario de registro con username, email, password
- Confirmacion de password
- Link a login
- Mismo estilo que LoginPage

### WineListPage
- Navbar con logo y navegacion
- Titulo y descripcion
- Estado vacio (placeholder)
- Boton para agregar vino
- Grid preparado para tarjetas de vinos
- Ejemplo de tarjeta de vino (oculto)

---

## Tailwind CSS

### Configuracion (tailwind.config.js)

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
]
```

### Estilos Globales (index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}
```

---

## React Router

### Configuracion (main.jsx)

```jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### Rutas (App.jsx)

```jsx
import { Routes, Route, Navigate } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/wines" element={<WineListPage />} />
</Routes>
```

---

## Flowbite React

Flowbite esta instalado y configurado en Tailwind.

Para usar componentes de Flowbite:

```jsx
import { Button, Card, Navbar } from 'flowbite-react';

<Button color="purple">Click me</Button>
```

Documentacion: https://flowbite-react.com/

---

## Desarrollo

### Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 5173)
npm run build    # Build para produccion
npm run preview  # Preview del build
```

### Hot Module Replacement (HMR)

Vite incluye HMR automatico. Los cambios se reflejan instantaneamente.

---

## Proximos Pasos

1. **Conectar con Backend**
   - Crear servicio de autenticacion
   - Configurar axios
   - Manejo de tokens JWT

2. **Estado Global**
   - Context API para autenticacion
   - Context para vinos

3. **Formularios**
   - Validacion de formularios
   - Manejo de errores
   - Feedback visual

4. **Componentes de Vinos**
   - Tarjeta de vino
   - Formulario de crear/editar vino
   - Vista detalle de vino
   - Integracion con SommelIAr

5. **Routing Protegido**
   - PrivateRoute component
   - Redirect si no esta autenticado

---

## Estilo Visual

El diseño sigue una estetica elegante inspirada en Vivino:

- **Colores**: Bordo oscuro y crema
- **Tipografia**: Limpia y legible
- **Espaciado**: Generoso y comodo
- **Sombras**: Sutiles para profundidad
- **Transiciones**: Suaves en hover
- **Formularios**: Inputs grandes y claros
- **Botones**: Con estados hover bien definidos

---

## Troubleshooting

### Error: Cannot find module 'react-router-dom'
```bash
npm install react-router-dom
```

### Error: Cannot find module 'flowbite-react'
```bash
npm install flowbite-react flowbite
```

### Tailwind no funciona
```bash
# Reinstalar
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Verificar que index.css tenga las directivas @tailwind
```

### Puerto 5173 en uso
```bash
# Cambiar puerto en vite.config.js
export default defineConfig({
  server: {
    port: 5174
  }
});
```

---

## Checklist de Setup

- [x] React Router DOM instalado
- [x] Tailwind CSS configurado
- [x] Flowbite instalado
- [x] BrowserRouter en main.jsx
- [x] Rutas definidas en App.jsx
- [x] LoginPage creado
- [x] RegisterPage creado
- [x] WineListPage creado
- [x] Paleta de colores wine/cream configurada
- [x] Navbar basica en WineListPage
- [x] index.css con directivas Tailwind

---

## Recursos

- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Flowbite React Docs](https://flowbite-react.com/)
- [Vite Docs](https://vitejs.dev/)

