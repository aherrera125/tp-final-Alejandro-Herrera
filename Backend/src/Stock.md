# Colección de curls para endpoints del backend

Variable de entorno recomendada para usar en comandos (Linux/macOS/Git Bash/WSL):

```bash
export TOKEN="TU_TOKEN_AQUI"
```

En Windows PowerShell:

```powershell
$env:TOKEN = "TU_TOKEN_AQUI"
```

Todas las solicitudes protegidas usan el header:

```
Authorization: Bearer $TOKEN
```

## DUEÑOS

Obtener todos

```bash
curl -sS -X GET http://localhost:3000/api/duenios \
  -H "Authorization: Bearer $TOKEN"
```

Obtener por id

```bash
curl -sS -X GET http://localhost:3000/api/duenios/1 \
  -H "Authorization: Bearer $TOKEN"
```

Crear dueño (POST)

```bash
curl -sS -X POST http://localhost:3000/api/duenios \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Julio",
    "apellido": "Perez",
    "telefono": "123456789",
    "direccion": "Calle Falsa 123"
  }'
```

Actualizar un dueño (PUT)

```bash
curl -sS -X PUT http://localhost:3000/api/duenios/8 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Gomez",
    "telefono": "987654321",
    "direccion": "Av. Siempreviva 742"
  }'
```

Eliminar un dueño (DELETE)

```bash
curl -sS -X DELETE http://localhost:3000/api/duenios/8 \
  -H "Authorization: Bearer $TOKEN"
```

## MASCOTAS

Obtener todas

```bash
curl -sS -X GET http://localhost:3000/api/mascotas \
  -H "Authorization: Bearer $TOKEN"
```

Obtener por id

```bash
curl -sS -X GET http://localhost:3000/api/mascotas/1 \
  -H "Authorization: Bearer $TOKEN"
```

Crear una mascota

```bash
curl -sS -X POST http://localhost:3000/api/mascotas \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Fido",
    "especie": "Perro",
    "fecha_nacimiento": "2020-05-01",
    "id_duenio": 2
  }'
```

Actualizar una mascota

```bash
curl -sS -X PUT http://localhost:3000/api/mascotas/5 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Fido Actualizado",
    "especie": "Perro",
    "fecha_nacimiento": "2020-05-01",
    "id_duenio": 2
  }'
```

Eliminar una mascota

```bash
curl -sS -X DELETE http://localhost:3000/api/mascotas/5 \
  -H "Authorization: Bearer $TOKEN"
```

## USUARIOS (VETERINARIOS)

Las rutas de usuarios están expuestas en `/api/user`.

Obtener todos (requiere autorización `user`)

```bash
curl -sS -X GET http://localhost:3000/api/user \
  -H "Authorization: Bearer $TOKEN"
```

Obtener datos del usuario autenticado

```bash
curl -sS -X GET http://localhost:3000/api/users/byUserId \
  -H "Authorization: Bearer $TOKEN"
```

Crear usuario (protegido según roles y permiso)

```bash
curl -sS -X POST http://localhost:3000/api/auth/register \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzcyNjUxNTIzLCJleHAiOjE3NzI3Mzc5MjMsImlzcyI6ImN1cnNvLXV0bi1iYWNrZW5kIn0.UNfCHe7bfDg90wYD58doVQGz-0uTsTN_BWZBasENMuE" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jdiaz",
    "email": "juan.diaz@patitasfelices.com",
    "password": "Secre1234!",
    "nombre": "Juan",
    "apellido": "Diaz",
    "especialidad": "Recepcionista",
    "matricula": "secre-134"
  }'
```

## HISTORIAL CLÍNICO

Obtener todos (requiere rol `admin`)

```bash
curl -sS -X GET http://localhost:3000/api/historialClinico \
  -H "Authorization: Bearer $TOKEN"
```

Obtener historial del usuario autenticado

```bash
curl -sS -X GET http://localhost:3000/api/historialClinico/byUserId \
  -H "Authorization: Bearer $TOKEN"
```

Obtener por id

```bash
curl -sS -X GET http://localhost:3000/api/historialClinico/1 \
  -H "Authorization: Bearer $TOKEN"
```

Crear historial clínico (user|admin)

```bash
curl -sS -X POST http://localhost:3000/api/historialClinico \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_duenio": "Juan",
    "apellido_duenio": "Pérez",
    "telefono": "123456789",
    "direccion": "Calle Falsa 123",
    "mascota": "Firulais",
    "raza": "Perro",
    "fecha_nacimiento": "2020-01-01",
    "historial": "Consulta por vacunación"
  }'
```

Actualizar historial clínico (user)

```bash
curl -sS -X PUT http://localhost:3000/api/historialClinico/5 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id_mascota": "3",
    "descripcion": "Tratamiento completado",
    "status": true
  }'
```

Eliminar historial clínico (user|admin)

```bash
curl -sS -X DELETE http://localhost:3000/api/historialClinico/5 \
  -H "Authorization: Bearer $TOKEN"
```

## AUTENTICACIÓN

Registrar un usuario (route: `/auth/register`)

```bash
curl -sS -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jdiaz",
    "email": "juan.diaz@patitasfelices.com",
    "password": "Secre1234!",
    "nombre": "Juan",
    "apellido": "Diaz",
    "especialidad": "Recepcionista",
    "matricula": "secre-134"
  }'
```

Iniciar sesión (route: `/auth/login`). La respuesta contiene el token JWT.

```bash
curl -sS -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "luis.luna@patitasfelices.com",
    "password": "SecurePass125!"
  }'
```

Ejemplo de uso: copiar el token de la respuesta y exportarlo como `TOKEN` antes de las llamadas protegidas.

```bash
export TOKEN="eyJ..."
curl -sS -X GET http://localhost:3000/api/duenios -H "Authorization: Bearer $TOKEN"
```
