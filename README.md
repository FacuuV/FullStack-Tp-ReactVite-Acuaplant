# Proyecto API RESTful - Acuaplant

Este proyecto es una API RESTful robusta y modular desarrollada como trabajo práctico. Utiliza Node.js, Express y MongoDB para gestionar productos, categorías y usuarios de una tienda online ficticia llamada "Acuaplant".

La API implementa operaciones CRUD completas, autenticación de usuarios mediante JWT y sigue un patrón de arquitectura con separación de responsabilidades (Controladores y Servicios).

---

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js:** Entorno de ejecución para JavaScript.
- **Express:** Framework para la construcción de la API.
- **MongoDB:** Base de datos NoSQL para almacenar la información.
- **Mongoose:** ODM para modelar los datos de la aplicación con MongoDB.
- **JSON Web Token (JWT):** Para la generación de tokens de autenticación.
- **bcryptjs:** Para la encriptación segura de contraseñas.
- **dotenv:** Para la gestión de variables de entorno.
- **CORS:** Para permitir peticiones desde el frontend.

### Frontend
- **React:** Biblioteca para construir la interfaz de usuario.
- **Vite:** Herramienta de desarrollo para el frontend.
- **CSS:** Estilos personalizados para la aplicación.

---

## 📋 Esquema de la Base de Datos

La base de datos en MongoDB consta de tres colecciones principales:

### 1. `users`
Almacena la información de los usuarios registrados.
```json
{
  "name": "String",
  "email": "String (único)",
  "password": "String (encriptado)",
  "timestamps": true
}

 2 products
Almacena los productos de la tienda.

json
{
  "name": "String",
  "description": "String",
  "price": "Number",
  "stock": "Number",
  "category": "ObjectId (referencia a 'categories')",
  "timestamps": true
}

3. categories
Almacena las categorías a las que pertenecen los productos.

json
{
  "name": "String (único)",
  "description": "String",
  "timestamps": true
}

⚙️ Instalación y Ejecución
Para correr este proyecto en tu máquina local, necesitarás tener instalado Node.js y MongoDB.

Sigue estos pasos:

1.Clona el repositorio:

bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
(Reemplaza tu-usuario/tu-repositorio con la URL real de tu repositorio en GitHub)

2.Configura las variables de entorno: En la carpeta Backend, crea un archivo .env y añade tu cadena de conexión a MongoDB y una clave secreta para JWT:

MONGO_URI=mongodb+srv://<user>:<password>@cluster...
JWT_SECRET=miclavesecreta123


3.Instala las dependencias y ejecuta el Backend: Abre una terminal y ejecuta:

bash
cd Backend
npm install
npm start
El servidor del backend correrá en http://localhost:5000.

4.Instala las dependencias y ejecuta el Frontend: Abre una segunda terminal y ejecuta:

bash
cd Frontend
npm install
npm run dev

La aplicación de React estará disponible en http://localhost:5173 (o el puerto que indique Vite).


🌐 Listado de Endpoints (API)
Todas las rutas están prefijadas con /api.

Usuarios (/users)
POST /register: Registra un nuevo usuario.
POST /login: Autentica un usuario y devuelve un token JWT.

Productos (/products)
GET /: Obtiene una lista de todos los productos.
GET /:id: Obtiene un producto específico por su ID.
POST /: Crea un nuevo producto. (Ruta Protegida)
PUT /:id: Actualiza un producto existente. (Ruta Protegida)
DELETE /:id: Elimina un producto. (Ruta Protegida)

Categorías (/categories)
GET /: Obtiene una lista de todas las categorías.
POST /: Crea una nueva categoría. (Ruta Protegida)
DELETE /:id: Elimina una categoría. (Ruta Protegida)

📦 Ejemplos de Datos (JSON)
Crear un Usuario (POST /api/users/register)
json
{
    "name": "Facundo",
    "email": "facu@correo.com",
    "password": "password123"
}

Crear un Producto (POST /api/products)
Recuerda enviar el token en el header Authorization: Bearer <token>.

json
 Show full code block 
{
    "name": "Pez Guppy",
    "description": "Pez vivíparo, pequeño y muy fácil de cuidar.",
    "price": 4000,
    "stock": 50,
    "category": "60d5f2f9a3b3c2a4e8f0b1a2"
}

Crear una Categoría (POST /api/categories)
Recuerda enviar el token en el header Authorization: Bearer <token>.

json
{
    "name": "Peces de Agua Fría",
    "description": "Peces que no requieren calentador en el acuario."
}