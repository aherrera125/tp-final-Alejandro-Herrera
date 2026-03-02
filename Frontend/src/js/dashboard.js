document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

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
      renderHistorias(data);
    })
    .catch((err) => {
      console.error("Error en fetch:", err);
    });

  function renderHistorias(historiales) {
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
        <button
          class="btn btn-sm btn-outline-danger btn-eliminar"
          data-id="${h.historialId}"
          title="Eliminar"          
       >
         <i class="fa-solid fa-trash"></i>
        </button>
      </td>
      </tr>`;
    });
  }

  table.addEventListener("click", (e) => {
    // si el usuario pulsó el icono de ver detalle
    const detailBtn = e.target.closest(".btn-detalle");
    if (detailBtn) {
      const historialId = detailBtn.dataset.id;
      detailHistorialClinico(historialId);
      return;
    }

    // si el usuario pulsó el icono de la papelera/eliminar
    const deleteBtn = e.target.closest(".btn-eliminar");
    if (deleteBtn) {
      const historialId = deleteBtn.dataset.id;
      eliminarHistorial(historialId);
      return;
    }
  });

  function renderHistoriaDetalle(historialesDetalle) {
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
      mascotaNombre: mascota,
      mascotaEdad: parseInt(edad),
      mascotaEspecie: especie,
      duenioNombre: nombreDuenio,
      duenioApellido: apellidoDuenio,
      telefono: telefono,
      direccion: direccion,
      descripcion: historial,
    };

    //Aqui evaluar si es historia nueva o modificar
    const btnText = addHistorialButton.textContent.trim();
    if (btnText === "Guardar") {
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
        mascotaNombre: mascota,
        mascotaEdad: parseInt(edad),
        mascotaEspecie: especie,
        duenioNombre: nombreDuenio,
        duenioApellido: apellidoDuenio,
        telefono: telefono,
        direccion: direccion,
        descripcion: historial,
      };
      fetch(`http://localhost:3000/api/historialClinico/${historialId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data_update),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error HTTP " + res.status);
          }
          return res.json();
        })
        .then(() => {
          return fetch("http://localhost:3000/api/historialClinico/byUserId", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .then((res) => res.json())
        .then((data) => {
          renderHistorias(data);
          limpiarFormulario();
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

  function detailHistorialClinico(historialId) {
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
        renderHistoriaDetalle(data);
      })
      .catch((err) => {
        console.error("Error en fetch:", err);
      });
  }

  function eliminarHistorial(historialId) {
    if (!confirm("¿Estás seguro de que quieres eliminar este historial?")) {
      return;
    }

    fetch(`http://localhost:3000/api/historialClinico/${historialId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/index.html";
          throw new Error("No autorizado");
        }
        if (!res.ok) {
          throw new Error("Error al eliminar el historial clínico");
        }
        return res.json();
      })
      .then(() => {
        return fetch("http://localhost:3000/api/historialClinico/byUserId", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        renderHistorias(data);
        limpiarFormulario();
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalMascota"),
        );
        modal.hide();
      });
  }

  // Mostrar el nombre del veterinario logueado en el header
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
