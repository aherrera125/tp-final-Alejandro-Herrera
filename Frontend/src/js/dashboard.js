document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  console.log("Token en dashboard:", token);

  if (!token) {
    console.log("No hay token, redirigiendo al login...");
    window.location.href = "/index.html";
  }

  const dashboardForm = document.getElementById("dashboardForm");
  const addHistorialButton = document.getElementById("addHistorialButton");

  // Fetch initial data
  fetch("http://localhost:3000/api/historialClinico/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        console.error("Token no válido o sin permisos");
        localStorage.removeItem("token");
        window.location.href = "/index.html";
        throw new Error("No autorizado");
      }

      if (!res.ok) {
        throw new Error("Error HTTP " + res.status);
      }

      return res.json();
    })
    .then((data) => {
      console.log("Datos del historial clínico:", data);
      renderHistorias(data);
    })
    .catch((err) => {
      console.error("Error en fetch:", err);
    });

  function renderHistorias(historiales) {
    console.log("Renderizando historiales:", historiales);
    const table = document.getElementById("historialesTable");
    table.innerHTML = "";

    historiales.forEach((h) => {
      table.innerHTML += `
      <tr>
        <td>${h.nom_mascota}</td>
        <td>${h.nom_duenio} ${h.ape_duenio}</td>
        <td>${h.telefono}</td>
        <td>${h.nom_vete} ${h.ape_vete}</td>
        <td>${h.descripcion}</td>
      </tr>`;
    });
  }

  // Handle Logout (from the dashboardForm in nav)
  dashboardForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const button = e.submitter;

    if (button.id === "logoutButton") {
      logout();
    }
  });

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
  }

  // Handle Add History Modal
  addHistorialButton.addEventListener("click", function (e) {
    agregarHistorial();
  });

  function agregarHistorial() {
    const mascota = document.getElementById("mascota").value.trim();
    const especie = document.getElementById("especie").value.trim();

    const fechaRaw = document.getElementById("fechaNacimiento").value;
    let fechaNacimiento = "2020-02-20"; // Valor por defecto en caso de error
    if (fechaRaw) {
      const fechaObj = new Date(fechaRaw);
      if (!isNaN(fechaObj.getTime())) {
        fechaNacimiento = fechaObj.toISOString().split("T")[0];
      }
    }

    const nombreDuenio = document.getElementById("nombreDuenio").value.trim();
    const apellidoDuenio = document
      .getElementById("apellidoDuenio")
      .value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const historial = document.getElementById("historial").value.trim();

    console.log("Datos del formulario:", {
      mascota,
      especie,
      fechaNacimiento,
      nombreDuenio,
      apellidoDuenio,
      telefono,
      direccion,
      historial,
    });

    if (
      !mascota ||
      !especie ||
      !fechaNacimiento ||
      !nombreDuenio ||
      !apellidoDuenio ||
      !telefono ||
      !direccion ||
      !historial
    ) {
      alert("Por favor completá todos los campos");
      return;
    }

    // Preparar los datos para el POST
    const data = {
      nombre_duenio: nombreDuenio,
      apellido_duenio: apellidoDuenio,
      telefono: telefono,
      direccion: direccion,
      mascota: mascota,
      raza: especie,
      fecha_nacimiento: fechaNacimiento, // Ahora se envía como YYYY-MM-DD
      historial: historial,
    };

    // Hacer el fetch POST
    fetch("http://localhost:3000/api/historialClinico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // El token ya contiene el ID del usuario
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error HTTP " + res.status);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Historial clínico creado:", result);
        // Recargar los datos para actualizar la tabla
        fetch("http://localhost:3000/api/historialClinico/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            renderHistorias(data);
          })
          .catch((err) => console.error("Error al recargar historiales:", err));

        limpiarFormulario();

        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalMascota"),
        );
        modal.hide();
      })
      .catch((err) => {
        console.error("Error al crear historial clínico:", err);
        alert("Error al crear el historial clínico. Inténtalo de nuevo.");
      });
  }

  function limpiarFormulario() {
    document.getElementById("mascota").value = "";
    document.getElementById("especie").value = "";
    document.getElementById("nombreDuenio").value = "";
    document.getElementById("apellidoDuenio").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("vet").value = "";
    document.getElementById("historial").value = "";
  }

  // Display vet name (Extra feature to keep the UI nice)
  const email = localStorage.getItem("loggedEmail");
  if (email && document.getElementById("logged-vet-name")) {
    const namePart = email
      .split("@")[0]
      .split(".")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
    document.getElementById("logged-vet-name").textContent = `Dr. ${namePart}`;
  }
});
