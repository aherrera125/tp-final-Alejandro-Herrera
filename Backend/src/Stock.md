# DUENIOS

# Obtener todos

curl -X GET http://localhost:3000/api/duenios

# Obtener por id

curl -X GET http://localhost:3000/api/duenios/1

# Crear un dueño

curl -X POST http://localhost:3000/api/duenios \
 -H "Content-Type: application/json" \
 -d '{"nombre":"Juan","apellido":"Perez","telefono":123456789,"direccion":"Calle Falsa 123"}'

# Actualizar un dueño

curl -X PUT http://localhost:3000/api/duenios/8 \
 -H "Content-Type: application/json" \
 -d '{"nombre":"Juan","apellido":"Gomez","telefono":987654321,"direccion":"Av. Siempreviva 742"}'

# Eliminar un dueño

curl -X DELETE http://localhost:3000/api/duenios/8

# MASCOTAS

# Obtener todas

curl -sS http://localhost:3000/api/mascotas

# Obtener por id

curl -sS http://localhost:3000/api/mascotas/1

# Crear una mascota

curl -sS -X POST http://localhost:3000/api/mascotas \
 -H "Content-Type: application/json" \
 -d '{"nombre":"Fido","especie":"Perro","fecha_nacimiento":"2020-05-01","id_duenio":"2"}'

# Actualizar una mascota

curl -sS -X PUT http://localhost:3000/api/mascotas/5 \
 -H "Content-Type: application/json" \
 -d '{"nombre":"Fido Actualizado","especie":"Perro","fecha_nacimiento":"2020-05-01","id_duenio":"2"}'

# Eliminar una mascota

curl -sS -X DELETE http://localhost:3000/api/mascotas/5

# VETERINARIOS

# Obtener todos

curl -sS http://localhost:3000/api/veterinarios

# Obtener por id

curl -sS http://localhost:3000/api/veterinarios/1

# Crear un veterinario

curl -sS -X POST http://localhost:3000/api/veterinarios \
 -H "Content-Type: application/json" \
 -d '{"nombre":"María","apellido":"Perez","matricula":"MAT-123","especialidad":"Dermatología"}'

# Actualizar un Veterinario

curl -sS -X PUT http://localhost:3000/api/veterinarios/5 \
 -H "Content-Type: application/json" \
 -d '{"nombre":"María","apellido":"González","matricula":"MAT-123","especialidad":"Cirugía"}'

# Eliminar un veterinario

curl -sS -X DELETE http://localhost:3000/api/veterinarios/5

# HISTORIAL CLINICO

# Obtener todos

curl -sS http://localhost:3000/api/historialClinico

# Obtener por id

curl -sS http://localhost:3000/api/historialClinico/1

# Crear un historial clinico

curl -sS -X POST http://localhost:3000/api/historialClinico \
 -H "Content-Type: application/json" \
 -d '{"id_mascota":"3","id_veterinario":"2","fecha_registro":"2024-02-01","descripcion":"Chequeo anual: todo ok"}'

# Actualizar un historial clinico

curl -sS -X PUT http://localhost:3000/api/historialClinico/5 \
 -H "Content-Type: application/json" \
 -d '{"id_mascota":"3","id_veterinario":"2","fecha_registro":"2024-02-02","descripcion":"Tratamiento completado"}'

# Eliminar un historial clinico

curl -sS -X DELETE http://localhost:3000/api/historialClinico/5

# REGISTRACION Y AUTORIZACION

# Registrar un usuario

curl -X POST http://localhost:3000/auth/register \
 -H "Content-Type: application/json" \
 -d '{
"email": "test@example.com",
"password": "Password123!",
"username": "testuser"
}'

# Iniciar sesión

curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{
"email": "test@example.com",
"password": "Password123!"
}'

# Acceder a ruta protegida (reemplazar <token> con el token recibido)

curl -X GET http://localhost:3000/protected \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njk5OTA5MDksImV4cCI6MTc3MDA3NzMwOSwiaXNzIjoiY3Vyc28tdXRuLWJhY2tlbmQifQ.4AK6GCFRmi5hx9h9kSCfs4XxHegcsPoejbJRqihg5xk"

# Acceder a ruta de admin (reemplazar <token> con el token recibido)

curl -X GET http://localhost:3000/admin \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njk5OTA5MDksImV4cCI6MTc3MDA3NzMwOSwiaXNzIjoiY3Vyc28tdXRuLWJhY2tlbmQifQ.4AK6GCFRmi5hx9h9kSCfs4XxHegcsPoejbJRqihg5xk"

# USUARIOS

# Crear un usuario nuevo

curl -X POST http://localhost:3000/api/user/register \
 -H "Content-Type: application/json" \
 -d '{
"username": "lluna",
"email": "luis.luna@patitasfelices.com",
"password": "SecurePass125!",
"nombre": "Luis",
"apellido": "Luna",
"matricula": "qwe113",
"especialidad": "Clinico"
}'

# LOGIN

# Ingresar con mail y pass

curl -X POST http://localhost:3000/api/user/login \
 -H "Content-Type: application/json" \
 -d '{
"email": "luis.luna@patitasfelices.com",
"password": "SecurePass125!"
}'

# Obtener los datos del usuario logueado en base al token

curl -X GET http://localhost:3000/api/veterinarios/me \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzEyODQ1MTYsImV4cCI6MTc3MTM3MDkxNiwiaXNzIjoiY3Vyc28tdXRuLWJhY2tlbmQifQ.7WrSDyjSjiCcpINS6cd_o7XOTBVrQc1UMWf4wESQOyc"

# Obtener historia clinica en base al token del usuario logueado

curl -X GET "http://localhost:3000/api/historialClinico/me" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzEyODQ1MTYsImV4cCI6MTc3MTM3MDkxNiwiaXNzIjoiY3Vyc28tdXRuLWJhY2tlbmQifQ.7WrSDyjSjiCcpINS6cd_o7XOTBVrQc1UMWf4wESQOyc"

# Crear una historia clinica del usurio logueado en base al token generado en el login

curl -X POST http://localhost:3000/api/historialClinico \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzEzNDQ2MzksImV4cCI6MTc3MTQzMTAzOSwiaXNzIjoiY3Vyc28tdXRuLWJhY2tlbmQifQ.OhUZ2jI_dgpaSdZeqqokXpD-TgCKjrqq91f2p6no_6c" \
 -H "Content-Type: application/json" \
 -d '{
"id_mascota": 1,
"descripcion": "Consulta por vacunación"
}'
