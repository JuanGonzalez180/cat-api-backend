# Cat API Backend

Backend Express + TypeScript para la API de gatos. Proporciona autenticación con JWT, gestión de usuarios y acceso a información de razas de gatos.

## Tecnologías

- Node.js 20
- Express.js
- TypeScript
- MongoDB
- JWT
- bcrypt
- Docker

## Requisitos

- Node.js 20+
- MongoDB (local o Docker)
- npm o yarn

## Configuración

### Variables de Entorno

Copia `.env.template` a `.env`:

```bash
cp .env.template .env
```

Variables requeridas:
- PORT (default: 3000)
- MONGODB_URI
- NODE_ENV (development, production)
- CAT_API_KEY
- CAT_API_URL
- JWT_SECRET

### Instalación

```bash
npm install
npm run build
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

Disponible en `http://localhost:3000`

### Producción

```bash
npm run build
npm start
```

## Tests

```bash
npm test
npm test -- --watch
npm test -- --coverage
```

## Docker

### Docker Compose

```bash
docker-compose up -d      # Iniciar
docker-compose down       # Detener
docker-compose logs -f    # Ver logs
```

Incluye:
- Backend (puerto 3000)
- MongoDB (puerto 27017)

### Docker Manual

```bash
docker build -t cat-api-backend .
docker run -p 3000:3000 --env-file .env cat-api-backend
```

## API Endpoints

Autenticación:
- POST /api/auth/login
- POST /api/auth/register

Usuarios:
- GET /api/users/:userId (requiere JWT)

Gatos:
- GET /api/cats/breeds (requiere JWT)
- GET /api/cats/breeds/:id (requiere JWT)
- GET /api/cats/search?query=... (requiere JWT)

Imágenes:
- GET /api/images?breed_id=... (requiere JWT)

JWT requerido en header:
```
Authorization: Bearer <token>
```

## Estructura del Proyecto

```
src/
├── config/          # Configuración de base de datos
├── controllers/     # Controladores
├── middleware/      # Middlewares (auth, CORS)
├── models/          # Modelos de MongoDB
├── routes/          # Rutas
├── services/        # Servicios de lógica
├── utils/           # Utilidades (JWT, bcrypt)
├── tests/           # Pruebas unitarias
└── server.ts        # Punto de entrada
```

## Variables de Entorno

```ini
PORT=3000
MONGODB_URI=mongodb://root:password@localhost:27017/cat-api?authSource=admin
NODE_ENV=development
CAT_API_KEY=tu_api_key_aqui
CAT_API_URL=https://api.thecatapi.com/v1
JWT_SECRET=tu_secreto_muy_seguro_aqui
```

## Desarrollo

Estructura:
- TypeScript en todos los archivos
- Interfaces para modelos de datos
- Servicios para lógica compartida
- Middleware para validaciones
- Error handling consistente

```bash
npm update          # Actualizar dependencias
npm run lint        # ESLint
npm run lint:fix    # Linter fix
```

## Solución de Problemas

MongoDB no conecta: Verificar que MongoDB corre, MONGODB_URI es correcta en .env

Puerto 3000 en uso: Cambiar PORT en .env o liberar puerto

JWT inválido: Verificar token en header, JWT_SECRET consistente, token no expirado

## Licencia

MIT

## Autor

Juan Guillermo Gonzalez
