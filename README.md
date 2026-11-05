# API RESTful - Gestión de Productos (Backend)

Práctica de Laboratorio 10 - Desarrollo de Aplicaciones Web (IS093A). 
Implementación de un servidor backend moderno con Node.js, Express y MySQL.

## 🚀 Tecnologías Utilizadas
- **Node.js** (v20+) & **Express**: Servidor y enrutamiento.
- **MySQL2 (Promise)**: Conexión a base de datos relacional y *Connection Pooling*.
- **dotenv**: Gestión segura de variables de entorno.
- **CORS**: Habilitado para permitir peticiones desde un cliente Frontend.

## 📂 Estructura del Proyecto
```text
backend-lab10/
├── src/
│   ├── config/          # Configuración del pool de MySQL (db.js)
│   ├── controllers/     # Lógica de negocio (productosController.js)
│   ├── routes/          # Definición de endpoints (productosRoutes.js)
│   ├── app.js           # Configuración de Express y middlewares
│   └── server.js        # Punto de entrada y escucha del servidor
├── .env                 # Variables de entorno (NO subir a GitHub)
├── .env.example         # Plantilla de variables de entorno
├── package.json
└── README.md