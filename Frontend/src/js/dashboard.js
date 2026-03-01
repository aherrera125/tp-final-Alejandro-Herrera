document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  console.log("Token en dashboard:", token);

  if (!token) {
    console.log("No hay token, redirigiendo al login...");
    window.location.href = "/index.html";
  }

  const dashboardForm = document.getElementById("dashboardForm");
  const addHistorialButton = document.getElementById("addHistorialButton");
  const table = document.getElementById("historialesTable");
  const cancelHistorialButton = document.getElementById(
    "cancelHistorialButton",
  );
  const closeHistorialButton = document.getElementById("closeHistorialButton");

  fetch("http://localhost:3000/api/historialClinico/byUserId", {
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
    table.innerHTML = "";

    historiales.forEach((h) => {
      table.innerHTML += `
      <tr>
        <td>${h.nom_mascota}</td>
        <td>${h.edad_mascota}</td>
        <td>${h.especie}</td>
        <td>${h.nom_duenio} ${h.ape_duenio}</td>
        <td>${h.telefono}</td>
        <td>${h.fecha_registro}</td>
        <td class="text-center">
        <button 
          class="btn btn-sm btn-outline-primary btn-detalle"
          data-id="${h.historialId}"
          title="Ver detalle"
          data-bs-toggle="modal"
          data-bs-target="#modalMascota"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </td>
      </tr>`;
    });
  }

  table.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-detalle");
    if (!btn) return;

    const historialId = btn.dataset.id;
    console.log("Ver detalle de historial:", historialId);

    fetch(`http://localhost:3000/api/historialClinico/${historialId}`, {
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
        renderHistoriaDetalle(data);
      })
      .catch((err) => {
        console.error("Error en fetch:", err);
      });
  });

  function renderHistoriaDetalle(historialesDetalle) {
    console.log("Renderizando detalle de una historia:", historialesDetalle);
    addHistorialButton.textContent = "Modificar";
    addHistorialButton.dataset.historialId =
      historialesDetalle.historialClinicoData.historiaId;

    document.getElementById("mascota").value =
      historialesDetalle.historialClinicoData.mascotaNombre;
    document.getElementById("especie").value =
      historialesDetalle.historialClinicoData.mascotaEspecie;
    document.getElementById("edadMascota").value =
      historialesDetalle.historialClinicoData.mascotaEdad;
    document.getElementById("nombreDuenio").value =
      historialesDetalle.historialClinicoData.duenioNombre;
    document.getElementById("apellidoDuenio").value =
      historialesDetalle.historialClinicoData.duenioApellido;
    document.getElementById("telefono").value =
      historialesDetalle.historialClinicoData.telefono;
    document.getElementById("direccion").value =
      historialesDetalle.historialClinicoData.direccion;
    document.getElementById("historial").value =
      historialesDetalle.historialClinicoData.descripcion;
  }

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

  addHistorialButton.addEventListener("click", function (e) {
    agregarHistorial(e);
  });

  cancelHistorialButton.addEventListener("click", function (e) {
    addHistorialButton.textContent = "Guardar";
    limpiarFormulario();
  });

  closeHistorialButton.addEventListener("click", function (e) {
    addHistorialButton.textContent = "Guardar";
    limpiarFormulario();
  });

  function agregarHistorial(e) {
    const mascota = document.getElementById("mascota").value.trim();
    const especie = document.getElementById("especie").value.trim();
    const edad = document.getElementById("edadMascota").value.trim();
    const nombreDuenio = document.getElementById("nombreDuenio").value.trim();
    const apellidoDuenio = document
      .getElementById("apellidoDuenio")
      .value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const historial = document.getElementById("historial").value.trim();

    console.log("Datos del formulario:", {
      mascota,
      edad,
      especie,
      nombreDuenio,
      apellidoDuenio,
      telefono,
      direccion,
      historial,
    });

    if (
      !mascota ||
      !edad ||
      !especie ||
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
      edad_mascota: parseInt(edad),
      raza: especie,
      historial: historial,
    };

    //Aqui evaluar si es historia nueva o modificar
    console.log("Evaluando si es nuevo historial o modificación...");
    const btnText = addHistorialButton.textContent.trim();
    console.log("Texto del botón:", btnText);
    if (btnText === "Guardar") {
      // Hacer el fetch POST - Crear nuevo historial clínico
      fetch("http://localhost:3000/api/historialClinico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          fetch("http://localhost:3000/api/historialClinico/byUserId", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              renderHistorias(data);
            })
            .catch((err) =>
              console.error("Error al recargar historiales:", err),
            );

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
    } else {
      // Hacer el fetch PUT – Modificar historial clínico existente
      const historialId = addHistorialButton.dataset.historialId;
      const data_update = {
        nombre_duenio: nombreDuenio,
        apellido_duenio: apellidoDuenio,
        telefono: telefono,
        direccion: direccion,
        mascota: mascota,
        edad_mascota: parseInt(edad),
        raza: especie,
        historial: historial,
      };
      fetch(`http://localhost:3000/api/historialClinico/${historialId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data_update),
      })
        .then((res) => res.json())
        .then((data) => {
          renderHistorias(data); // refresca la tabla
          limpiarFormulario(); // limpia el modal
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("modalMascota"),
          );
          modal.hide();
        })
        .catch((err) => {
          console.error("Error al actualizar historial clínico:", err);
          alert(
            "Error al actualizar el historial clínico. Inténtalo de nuevo.",
          );
        });
    }
  }

  function limpiarFormulario() {
    document.getElementById("mascota").value = "";
    document.getElementById("especie").value = "";
    document.getElementById("edadMascota").value = "";
    document.getElementById("nombreDuenio").value = "";
    document.getElementById("apellidoDuenio").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("direccion").value = "";
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
