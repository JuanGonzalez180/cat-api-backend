# Cat API Backend

Backend Express + TypeScript para la API de gatos. Proporciona autenticación con JWT, gestión de usuarios y acceso a información de razas de gatos.

## 🚀 Tecnologías

- **Node.js 20** - Runtime
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **MongoDB** - Base de datos NoSQL
- **JWT** - Autenticación
- **bcrypt** - Hashing de contraseñas
- **Docker** - Containerización

## 📋 Requisitos

- Node.js 20+
- MongoDB (local o Docker)
- npm o yarn

## ⚙️ Configuración

### 1. Variables de Entorno

Copia el archivo `.env.template` a `.env` y completa los valores:

```bash
cp .env.template .env
```

Variables requeridas:
- `PORT` - Puerto donde corre la API (default: 3000)
- `MONGODB_URI` - URI de conexión a MongoDB
- `NODE_ENV` - Entorno (development, production)
- `CAT_API_KEY` - API key de TheCatAPI
- `CAT_API_URL` - URL de TheCatAPI
- `JWT_SECRET` - Secreto para firmar JWT

### 2. Instalación de Dependencias

```bash
npm install
```

### 3. Compilar TypeScript

```bash
npm run build
```

## 🏃 Ejecutar

### Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Producción

```bash
npm run build
npm start
```

## 🧪 Tests

Ejecutar pruebas unitarias:

```bash
npm test                      # Ejecutar tests
npm test -- --watch         # Modo watch
npm test -- --coverage      # Con reporte de cobertura
```

## 🐳 Docker

### Con Docker Compose

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

El docker-compose incluye:
- **Backend** (puerto 3000)
- **MongoDB** (puerto 27017)

### Con Docker manualmente

```bash
# Construir imagen
docker build -t cat-api-backend .

# Ejecutar contenedor
docker run -p 3000:3000 \
  --env-file .env \
  cat-api-backend
```

## 📡 API Endpoints

### Autenticación

- `POST /api/auth/login` - Login con email/password
- `POST /api/auth/register` - Registrar nuevo usuario

### Usuarios

- `GET /api/users/:userId` - Obtener perfil de usuario (requiere JWT)

### Gatos

- `GET /api/cats/breeds` - Listar razas de gatos (requiere JWT)
- `GET /api/cats/breeds/:id` - Obtener raza por ID (requiere JWT)
- `GET /api/cats/search?query=...` - Buscar razas (requiere JWT)

### Imágenes

- `GET /api/images?breed_id=...` - Obtener imágenes por raza (requiere JWT)

## 🔒 Autenticación

Todos los endpoints excepto login/register requieren un JWT en el header:

```
Authorization: Bearer <token>
```

## 📁 Estructura del Proyecto

```
src/
├── config/          # Configuración de base de datos
├── controllers/     # Controladores
├── middleware/      # Middlewares (auth, CORS, etc)
├── models/          # Modelos de MongoDB
├── routes/          # Rutas
├── services/        # Servicios de lógica
├── utils/           # Utilidades (JWT, bcrypt)
├── tests/           # Pruebas unitarias
└── server.ts        # Punto de entrada
```

## 📊 Variables de Entorno (.env)

```ini
# Puerto de la API
PORT=3000

# MongoDB
MONGODB_URI=mongodb://root:password@localhost:27017/cat-api?authSource=admin

# Entorno
NODE_ENV=development

# TheCat API
CAT_API_KEY=tu_api_key_aqui
CAT_API_URL=https://api.thecatapi.com/v1

# JWT
JWT_SECRET=tu_secreto_muy_seguro_aqui
```

## 🛠️ Desarrollo

### Estructura de código

- Usar TypeScript en todos los archivos
- Interfaces para modelos de datos
- Servicios para lógica compartida
- Middleware para validaciones y autenticación
- Error handling consistente

### Actualizar dependencias

```bash
npm update
```

### Linter

```bash
# ESLint (si está configurado)
npm run lint
npm run lint:fix
```

## 🐛 Solución de Problemas

### MongoDB no conecta

Verificar:
1. MongoDB está corriendo: `mongosh` o `docker ps`
2. `MONGODB_URI` es correcta en `.env`
3. Usuario/contraseña son correctos
4. Red de Docker (si usas Docker): `docker network ls`

### Puerto 3000 en uso

```bash
# Cambiar puerto en .env
PORT=3001

# O liberar el puerto
lsof -i :3000
kill -9 <PID>
```

### JWT inválido

Verificar:
1. Token en header `Authorization: Bearer <token>`
2. `JWT_SECRET` es consistente
3. Token no expirado

## 📝 Licencia

MIT

## 👤 Autor

XpertGroup
