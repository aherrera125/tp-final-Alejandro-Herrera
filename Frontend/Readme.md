# 🐾 Veterinaria "Patitas Felices" — Frontend

**Interfaz web para gestión de veterinaria**

Frontend desarrollado en HTML/CSS/JavaScript con Bootstrap para la gestión de mascotas, dueños y historial clínico. Se conecta al backend API REST para autenticación y operaciones CRUD.

---

## 🚀 Características

- Interfaz de login/logout con autenticación JWT
- Dashboard de mascotas
- Alta y listado de mascotas
- Asociación dueño-veterinario
- Visualización de historial clínico
- Diseño responsivo con Bootstrap 5

---

## 🧰 Tecnologías

- HTML5 + CSS3 + JavaScript
- Bootstrap 5
- Vite (para desarrollo)

---

## 🔧 Requisitos

- Node.js 18+
- npm
- Backend corriendo en `http://localhost:3000`

---

## ⚙️ Instalación y ejecución

1. Instala dependencias

```bash
npm install
```

2. Ejecutar en desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (puerto por defecto de Vite)

3. Para producción

```bash
npm run build
npm run preview
```

---

## 🔍 Uso del Sistema

1. **Asegúrate de que el backend esté corriendo** en `http://localhost:3000`
2. **Accede al frontend**: Abre `http://localhost:5173` en el navegador
3. **Login**: Usa las siguientes credenciales de ejemplo:
   - Email: luis.luna@patitasfelices.com
   - Contraseña: SecurePass125!

   O registra un nuevo usuario desde la interfaz.

4. **Gestionar**: Usa el dashboard para administrar mascotas y ver historial

---

## 📝 Notas

- El frontend se conecta al backend vía fetch API
- Los tokens JWT se almacenan en localStorage
- Proyecto desarrollado con Vite para un desarrollo rápido

---

**Licencia**: ISC
