document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  console.log("Token en dashboard:", token);

  if (!token) {
    console.log("No hay token, redirigiendo al login...");
    window.location.href = "/index.html";
  }

  const dashboardForm = document.getElementById("dashboardForm");
  const addHistorialButton = document.getElementById("addHistorialButton");
  const addUsuarioButton = document.getElementById("addUsuarioButton");
  const tableHistorial = document.getElementById("historialesTable");
  const tableUsuarios = document.getElementById("usuariosTable");
  const cancelHistorialButton = document.getElementById(
    "cancelHistorialButton",
  );
  const closeHistorialButton = document.getElementById("closeHistorialButton");
  const selectRol = document.getElementById("rolUsuario");

  fetch("http://localhost:3000/api/user/getById", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        console.error("Token no válido o sin permisos");
        throw new Error("No autorizado");
      }

      if (!res.ok) {
        throw new Error("Error HTTP " + res.status);
      }

      return res.json();
    })
    .then((data) => {
      console.log("Datos del usuario:", data);
      localStorage.setItem("rol", data.usuarioData.rolename);
      if (data.usuarioData.rolename !== "admin") {
        console.log(
          "Usuario no es admin, ocultando sección de usuarios, user role:",
          data.usuarioData.rolename,
        );
        document.getElementById("div-usuarios").style.display = "none";
      } else {
        document.getElementById("div-usuarios").style.display = "block";
        getAllUsers(data);
      }
    })
    .catch((err) => {
      console.error("Error en fetch:", err);
    });

  function getAllUsers() {
    fetch("http://localhost:3000/api/user", {
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
        console.log("Datos de usuarios:", data);
        renderUsuarios(data.usuarioData);
      })
      .catch((err) => {
        console.error("Error en fetch:", err);
      });
  }

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
    tableHistorial.innerHTML = "";
    historiales.forEach((h) => {
      tableHistorial.innerHTML += `
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

  function renderUsuarios(usuarios) {
    tableUsuarios.innerHTML = "";
    usuarios.forEach((u) => {
      tableUsuarios.innerHTML += `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.apellido}</td>
        <td>${u.email}</td>
        <td>${u.especialidad}</td>
        <td>${u.matricula}</td>
        <td>${u.username}</td>
        <td>${u.name}</td>
        <td>${u.status}</td>
      </tr>`;
    });
  }

  tableHistorial.addEventListener("click", (e) => {
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
    limpiarFormularioHistorial();
  });

  closeHistorialButton.addEventListener("click", function (e) {
    addHistorialButton.textContent = "Guardar";
    limpiarFormularioHistorial();
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
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalMascota"),
    );
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

          limpiarFormularioHistorial();

          modal.hide();
        })
        .catch((err) => {
          console.error("Error al crear historial clínico:", err);
          if (err.message.includes("401") || err.message.includes("403")) {
            alert("Necesita habilitacion para poder crear historias clinicas.");
            modal.hide();
          } else {
            alert("Error al crear el historial clínico. Inténtalo de nuevo.");
          }
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
          limpiarFormularioHistorial();
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

  addUsuarioButton.addEventListener("click", function (e) {
    agregarUsuario(e);
  });

  function agregarUsuario(e) {
    const nombre = document.getElementById("nombreUsuario").value.trim();
    const apellido = document.getElementById("apellidoUsuario").value.trim();
    const email = document.getElementById("emailUsuario").value.trim();
    const especialidad = document
      .getElementById("especialidadUsuario")
      .value.trim();
    const matricula = document.getElementById("matriculaUsuario").value.trim();
    const username = document.getElementById("usernameUsuario").value.trim();
    const password = document.getElementById("passwordUsuario").value.trim();
    const rol = document.getElementById("rolUsuario").value.trim();

    if (
      !nombre ||
      !apellido ||
      !email ||
      !especialidad ||
      !matricula ||
      !username ||
      !password ||
      !rol
    ) {
      alert("Por favor completá todos los campos");
      return;
    }

    const data = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      especialidad: especialidad,
      matricula: matricula,
      username: username,
      password: password,
      rol: rol,
    };
    console.log("Datos a enviar para nuevo usuario:", data);

    fetch("http://localhost:3000/auth/register", {
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
      .then(() => {
        alert("Usuario agregado correctamente");
        limpiarFormularioUsuario();
      })

      .catch((err) => {
        console.error("Error al agregar usuario:", err);
        alert("Error al agregar el usuario. Inténtalo de nuevo.");
      });
  }

  function limpiarFormularioHistorial() {
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
        limpiarFormularioHistorial();
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalMascota"),
        );
        modal.hide();
      });
  }

  const modalUsuarios = document.getElementById("modalUsuario");

  modalUsuarios.addEventListener("show.bs.modal", function () {
    //evaluar si es nuevo o modificar, por ahora solo nuevo,
    //si es modificar se deberia cargar el detalle del usuario en el form
    limpiarFormularioUsuario();
    cargarRoles(selectRol);
  });

  modalUsuarios.addEventListener("hidden.bs.modal", function () {
    selectRol.innerHTML = "";
  });

  function limpiarFormularioUsuario() {
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("apellidoUsuario").value = "";
    document.getElementById("emailUsuario").value = "";
    document.getElementById("especialidadUsuario").value = "";
    document.getElementById("matriculaUsuario").value = "";
    document.getElementById("usernameUsuario").value = "";
    document.getElementById("passwordUsuario").value = "";
  }

  function cargarRoles(selectRol) {
    fetch("http://localhost:3000/api/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Roles obtenidos:", data);
        renderRoles(selectRol, data.rolesData);
      })
      .catch((err) => {
        console.error("Error cargando roles:", err);
      });
  }

  function renderRoles(selectRol, roles) {
    roles.forEach((role) => {
      const option = document.createElement("option");
      option.value = role.id;
      option.textContent = role.name;

      selectRol.appendChild(option);
    });
  }

  selectRol.addEventListener("change", () => {
    const selectedOption = selectRol.options[selectRol.selectedIndex];
    return selectedOption.value;
  });

  // Mostrar el nombre del veterinario logueado en el header
  const rol = localStorage.getItem("rol");
  const email = localStorage.getItem("loggedEmail");

  if (email && document.getElementById("logged-vet-name")) {
    const namePart = email
      .split("@")[0]
      .split(".")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

    switch (rol) {
      case "veterinario":
        document.getElementById("logged-vet-name").textContent =
          `Dr. ${namePart}`;
        break;
      case "admin":
        document.getElementById("logged-vet-name").textContent =
          `Admin: ${namePart}`;
        break;
      case "secretario":
        document.getElementById("logged-vet-name").textContent =
          `Secretario: ${namePart}`;
        break;
    }
  }
});
