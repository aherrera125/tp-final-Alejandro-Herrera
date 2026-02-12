# 🐾 Veterinaria "Patitas Felices" — Backend

**Descripción**

Pequeño backend en **Node + TypeScript** para una veterinaria. Provee autenticación (JWT), gestión de dueños, mascotas, veterinarios e historial clínico. Está pensado para correr localmente o con Docker (MySQL + phpMyAdmin).

---

## 🚀 Características

- Autenticación con JWT (registro y login)
- Endpoints REST para: dueños, mascotas, veterinarios, historial clínico
- Validación de entradas con `express-validator`
- Límite de intentos para endpoints de auth (`express-rate-limit`)
- Base de datos MySQL (incluye script SQL de ejemplo)
- Archivos estáticos servidos desde `public/`

---

## 🧰 Tecnologías

- Node.js + TypeScript
- Express
- MySQL (mysql2)
- bcrypt, jsonwebtoken
- Docker (opcional: servicio `mysql` y `phpmyadmin` en `docker-compose.yml`)

---

## 🔧 Requisitos

- Node 18+ (recomendado)
- npm
- Docker & docker-compose (si quieres levantar MySQL con contenedor)

---

## ⚙️ Instalación y ejecución

1. Clona el repositorio

```bash
git clone https://github.com/aherrera125/tp-intermedio-ALEJANDRO-HERRERA.git
cd tp-intermedio-ALEJANDRO-HERRERA
```

2. Instala dependencias

```bash
npm install
```

3. Variables de entorno

Crea un archivo `.env` en la raíz con al menos las siguientes variables (ejemplo):

```
PORT=3000
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=root123
DB_NAME=veterinaria_patitas_felices
DB_CONNECTION_LIMIT=10
JWT_SECRET=un_secreto_muy_seguro
JWT_EXPIRES_IN=1h
```

> Ajusta `DB_PORT`/credenciales si usas otra configuración.

4. Levantar la base de datos con Docker (opcional)

```bash
docker-compose up -d
```

- MySQL escucha en el puerto `3307` en host
- phpMyAdmin disponible en `http://localhost:8080` (host: `mysql`, user: `root`, password: `root123`)

5. Importar esquema/datos de ejemplo

```bash
# Desde la raíz del proyecto (host), importa el archivo SQL al contenedor MySQL
docker exec -i mysql mysql -uroot -proot123 < veterinaria_patitas_felices.sql
```

6. Ejecutar la aplicación

- En desarrollo (con recarga automática):

```bash
npm run dev
```

- Para producción (compilar y ejecutar):

```bash
npm run build
npm start
```

La API estará disponible en `http://localhost:${PORT || 3000}` (por defecto `3000`).

---

## 📦 Rutas principales

- Auth
  - POST `/auth/register` — Registro (body: `username, email, password`)
  - POST `/auth/login` — Login (body: `email, password`) → devuelve `{ token }`

- Rutas protegidas de ejemplo
  - GET `/protected` — Requiere header `Authorization: Bearer <token>`
  - GET `/admin` — Requiere rol `admin`

- Recursos REST (CRUD)
  - `/api/duenios` — GET, POST, PUT, DELETE
  - `/api/mascotas` — GET, POST, PUT, DELETE
  - `/api/veterinarios` — GET, POST, PUT, DELETE
  - `/api/historialClinico` — GET, POST, PUT, DELETE

> Para las rutas protegidas utiliza el header:
>
> `Authorization: Bearer <token>`

---

## 🔍 Ejemplos rápidos (curl)

- Registro

```
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"pepito","email":"p@mail.com","password":"123456"}'
```

- Login

```
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"p@mail.com","password":"123456"}'
```

- Acceder a endpoint protegido

```
curl http://localhost:3000/protected -H "Authorization: Bearer <token>"
```

---

## ✅ Buenas prácticas

- Mantén `JWT_SECRET` fuera del control de versiones
- Limita los permisos de la DB en producción
- Añade tests y manejo de errores más detallado para entornos reales

---

## 📝 Contribuciones

Pull requests bienvenidos. Abre un issue si encuentras bugs o quieres proponer mejoras.

---

## 📞 Contacto

Para dudas o mejoras abre un issue en el repositorio.

---

**Licencia**: ISC
