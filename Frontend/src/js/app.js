let loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email, // luis.luna@patitasfelices.com
        password: password, // SecurePass125!
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Token recibido:", data.token);
        localStorage.setItem("token", data.token);

        window.location.href = "/dashboard.html";
      })
      .catch((err) => console.error("Error en login:", err));
  });
}

let dashboardForm = document.getElementById("dashboardForm");
if (dashboardForm) {
  const token = localStorage.getItem("token");
  //const token = localStorage.getItem("token")?.replace(/"/g, "");
  console.log("Token en dashboard:", token);

  if (!token) {
    console.log("No hay token, redirigiendo al login...");
    window.location.href = "/index.html";
  }

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

  /*fetch("http://localhost:3000/api/historialClinico/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      //if (!res.ok) throw new Error("HTTP " + res.status);
      if (!res.ok || res.status === 403 || res.status === 401) {
        console.error("Token no válido o sin permisos");
        localStorage.removeItem("token");
        window.location.href = "/index.html";
        return res.json();
      }
    })
    .then((data) => {
      //console.log("Nombre:", data.name, "ID:", data.id);
      console.log("Datos del historial clínico:", data);
      renderHistorias(data);
    })
    .catch((err) => console.error("Error en fetch:", err));*/

  function renderHistorias(historiales) {
    console.log("Renderizando historiales:", historiales);
    const table = document.getElementById("historialesTable");
    table.innerHTML = "";

    historiales.forEach((h) => {
      table.innerHTML += `
      <tr>
        <td>${h.mascota}</td>
        <td>${h.duenio}</td>
        <td>${h.vet}</td>
        <td>${h.historial}</td>
      </tr>`;
    });
  }

  dashboardForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const button = e.submitter;

    if (button.id === "logoutButton") {
      logout();
    }

    function logout() {
      localStorage.removeItem("token");
      window.location.href = "/index.html";
    }

    if (button.id === "addHistorialButton") {
      agregarHistorial();
    }

    function agregarHistorial() {
      const mascota = document.getElementById("mascota").value.trim();
      const duenio = document.getElementById("duenio").value.trim();
      const vet = document.getElementById("vet").value.trim();
      const historial = document.getElementById("historial").value.trim();

      if (!mascota || !duenio || !vet || !historial) {
        alert("Por favor completá todos los campos");
        return;
      }

      let historiales = [];
      historiales.push({ mascota, duenio, vet, historial });
      renderHistorias(historiales);
      limpiarFormulario();

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalMascota"),
      );
      modal.hide();
    }

    function limpiarFormulario() {
      document.getElementById("mascota").value = "";
      document.getElementById("duenio").value = "";
      document.getElementById("vet").value = "";
      document.getElementById("historial").value = "";
    }
  });
}
