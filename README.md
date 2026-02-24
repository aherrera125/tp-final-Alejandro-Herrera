# 🐾 Veterinaria "Patitas Felices" - TP Final Alejandro Herrera

**Proyecto Final de Diplomatura Fullstack**  
Sistema de gestión para una veterinaria que permite administrar dueños, mascotas, veterinarios e historial clínico.

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Arquitectura](#️-arquitectura)
- [Esquema de Base de Datos](#️-esquema-de-base-de-datos)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos del Sistema](#-requisitos-del-sistema)
- [Instalación y Configuración](#️-instalación-y-configuración)
- [API Endpoints](#-api-endpoints)
- [Funcionalidades](#-funcionalidades)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Uso del Sistema](#-uso-del-sistema)
- [Testing](#-testing)
- [Scripts Disponibles](#-scripts-disponibles)
- [Seguridad](#-seguridad)
- [Contribuciones](#-contribuciones)
- [Contacto](#-contacto)
- [Licencia](#-licencia)
- [Despliegue](#-despliegue)

---

## 📋 Descripción General

Este proyecto consta de dos partes principales:

- **Backend**: API REST desarrollada en Node.js + TypeScript con Express, autenticación JWT y base de datos MySQL.
- **Frontend**: Interfaz web básica en HTML/CSS/JavaScript con Bootstrap para la gestión de mascotas y usuarios.

El sistema permite:

- Autenticación de usuarios (registro y login)
- Gestión completa de dueños, mascotas y veterinarios
- Registro y consulta de historial clínico
- Interfaz web para operaciones básicas

---

## 🏗️ Arquitectura

```
TP-FINAL-ALEJANDRO-HERRERA/
├── Backend/                 # API REST (Node.js + TypeScript)
│   ├── src/
│   │   ├── controllers/     # Lógica de controladores
│   │   ├── models/          # Modelos de datos
│   │   ├── routes/          # Definición de rutas
│   │   ├── services/        # Lógica de negocio
│   │   ├── middlewares/     # Middlewares (auth, etc.)
│   │   ├── validators/      # Validación de datos
│   │   └── types/           # Definiciones TypeScript
│   ├── public/              # Archivos estáticos
│   ├── docker-compose.yml   # Configuración Docker para MySQL
│   ├── veterinaria_patitas_felices.sql  # Script de base de datos
│   └── package.json
└── Frontend/                # Interfaz web
    ├── src/
    │   ├── css/             # Estilos CSS
    │   ├── js/              # JavaScript del frontend
    │   └── html/            # Plantillas HTML
    ├── public/              # Archivos estáticos
    └── package.json
```

---

## 🗄️ Esquema de Base de Datos

La base de datos `veterinaria_patitas_felices` consta de las siguientes tablas principales:

- **users**: Gestión de usuarios del sistema (veterinarios/administradores). El rol de cada usuario se gestiona mediante `roles` y `user_roles`.
- **roles**: Lista de roles disponibles (por ejemplo `admin`, `user`).
- **user_roles**: Asociación entre usuarios y roles; permite asignar roles a los usuarios.
- **duenos**: Información de los dueños de mascotas
- **mascotas**: Datos de las mascotas registradas
- **historial_clinico**: Registros médicos y tratamientos de las mascotas

Relaciones:

- Un dueño puede tener múltiples mascotas
- Una mascota pertenece a un dueño
- Una mascota puede tener múltiples registros en el historial clínico
- Los veterinarios (usuarios) pueden atender múltiples mascotas

---

## �🚀 Tecnologías Utilizadas

### Backend

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **MySQL** - Base de datos relacional
- **JWT** - Autenticación
- **bcrypt** - Hashing de contraseñas
- **express-validator** - Validación de entradas
- **express-rate-limit** - Límite de intentos
- **Docker** - Contenedorización (MySQL + phpMyAdmin)

### Frontend

- **HTML5** + **CSS3** + **JavaScript**
- **Bootstrap 5** - Framework CSS
- **Vite** - Herramienta de desarrollo

---

## 🔧 Requisitos del Sistema

- **Node.js** 18+
- **npm** o **yarn**
- **Docker** & **docker-compose** (opcional, para base de datos)
- **MySQL** (si no usas Docker)

---

## ⚙️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/aherrera125/tp-final-Alejandro-Herrera.git
cd tp-final-Alejandro-Herrera
```

### 2. Configurar el Backend

```bash
cd Backend
npm install
```

Crear archivo `.env` en `Backend/` con:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=root123
DB_NAME=veterinaria_patitas_felices
DB_CONNECTION_LIMIT=10
JWT_SECRET=tu_secreto_jwt_muy_seguro
JWT_EXPIRES_IN=1h
```

### 3. Configurar la Base de Datos

**Opción A: Con Docker (Recomendado)**

```bash
cd Backend
docker-compose up -d
```

- MySQL: `localhost:3307`
- phpMyAdmin: `http://localhost:8080` (usuario: `root`, contraseña: `root123`)

**Opción B: MySQL Local**

Crear base de datos `veterinaria_patitas_felices` y ejecutar el script SQL.

### 4. Importar Datos de Ejemplo

```bash
docker exec -i mysql mysql -uroot -proot123 < veterinaria_patitas_felices.sql
```

### 5. Ejecutar el Backend

```bash
cd Backend
npm run dev  # Desarrollo con recarga automática
# o
npm run build && npm start  # Producción
```

La API estará disponible en `http://localhost:3000`

### 6. Configurar el Frontend

```bash
cd ../Frontend
npm install
npm run dev  # Desarrollo
# o
npm run build && npm run preview  # Producción
```

El frontend estará disponible en `http://localhost:5173` (puerto por defecto de Vite)

---

## 📦 API Endpoints

### Autenticación

- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Login de usuario

### Recursos (Requieren autenticación JWT)

- `GET|POST|PUT|DELETE /api/duenios` - Gestión de dueños
- `GET|POST|PUT|DELETE /api/mascotas` - Gestión de mascotas
- `GET|POST|PUT|DELETE /api/users` - Gestión de usuarios/veterinarios
- `GET|POST|PUT|DELETE /api/historialClinico` - Gestión de historial clínico

**Header requerido para endpoints protegidos:**

```
Authorization: Bearer <token>
```

Nota sobre tokens y roles:

- El token JWT incluye en el payload `id` y `role` (por ejemplo `{"id":5,"role":"user",...}`).
- Los middlewares de autorización esperan `role` presente en el token; si tu token es antiguo y no contiene `role`, deberás volver a iniciar sesión para obtener un token actualizado.

---

## 🎯 Funcionalidades

### Backend

- ✅ Autenticación JWT con registro y login
- ✅ CRUD completo para dueños, mascotas, veterinarios
- ✅ Gestión de historial clínico
- ✅ Validación de datos de entrada
- ✅ Límite de intentos en autenticación
- ✅ Servido de archivos estáticos

### Frontend

- ✅ Interfaz de login/logout
- ✅ Dashboard de mascotas
- ✅ Alta y listado de mascotas
- ✅ Asociación dueño-veterinario
- ✅ Visualización de historial clínico

---

## � Capturas de Pantalla

_Agregar capturas de pantalla del sistema aquí cuando estén disponibles._

---

## �🔍 Uso del Sistema

1. **Iniciar Backend**: Ejecutar `npm run dev` en `Backend/`
2. **Iniciar Frontend**: Ejecutar `npm run dev` en `Frontend/`
3. **Acceder**: Abrir `http://localhost:5173` en el navegador
4. **Login**: Usar credenciales de ejemplo (si se importó el SQL de ejemplo) o registrar nuevo usuario.
   - Nota: las cuentas semilla están en `veterinaria_patitas_felices.sql`. Si no conoces la contraseña de una cuenta de ejemplo, registra un nuevo usuario o restablece la contraseña en la base de datos.
5. **Gestionar**: Usar el dashboard para administrar mascotas y ver historial

---

## 🧪 Testing

### Backend

```bash
cd Backend
npm test  # Si se implementan tests
```

### Frontend

- Abrir `index.html` en navegador para pruebas manuales
- Verificar funcionalidades en el dashboard

---

## 📝 Scripts Disponibles

### Backend

- `npm run dev` - Desarrollo con ts-node-dev
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar versión compilada

### Frontend

- `npm run dev` - Servidor de desarrollo Vite
- `npm run build` - Build de producción
- `npm run preview` - Vista previa del build

---

## 🔒 Seguridad

- **JWT** para autenticación stateless
- **bcrypt** para hashing de contraseñas
- **express-rate-limit** para prevenir ataques de fuerza bruta
- **express-validator** para validación de entradas
- Variables de entorno para configuración sensible

---

## 🤝 Contribuciones

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📞 Contacto

**Alejandro Herrera**  
Proyecto Final - Diplomatura Fullstack

Para dudas o sugerencias, abrir issue en el repositorio.

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

## 🚀 Despliegue

### Producción

1. **Backend**: Configurar variables de entorno en servidor de producción
2. **Base de Datos**: Usar MySQL en la nube (AWS RDS, Google Cloud SQL, etc.)
3. **Frontend**: Desplegar en servicios como Vercel, Netlify o servidor web
4. **Docker**: Usar contenedores para facilitar el despliegue

### Mejoras Futuras

- [ ] Implementar tests automatizados
- [ ] Agregar notificaciones por email
- [ ] Dashboard con estadísticas y gráficos
- [ ] API de pagos para servicios veterinarios
- [ ] Aplicación móvil complementaria
- [ ] Integración con calendarios para citas

---

**🐾 ¡Bienvenido a Veterinaria "Patitas Felices"! 🐾**
