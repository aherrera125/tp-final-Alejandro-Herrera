let formData = document.getElementById("loginForm");

formData.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  fetch("/auth/login", {
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
      return res.json(); // normalmente devuelve { token: "..." }
    })
    .then((data) => {
      console.log("Token recibido:", data.token);
      // ejemplo: guardarlo en localStorage para usar en otros endpoints
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard.html"; // redirige a la página principal después del login
    })
    .catch((err) => console.error("Error en login:", err));
});

let mascotas = [];

//function login() {}

function logout() {
  window.location.href = "../../index.html";
}

function agregarMascota() {
  const mascota = document.getElementById("mascota").value.trim();
  const duenio = document.getElementById("duenio").value.trim();
  const vet = document.getElementById("vet").value.trim();
  const historial = document.getElementById("historial").value.trim();

  if (!mascota || !duenio || !vet || !historial) {
    alert("Por favor completá todos los campos");
    return;
  }

  mascotas.push({ mascota, duenio, vet, historial });
  renderMascotas();
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

function renderMascotas() {
  const table = document.getElementById("mascotasTable");
  table.innerHTML = "";

  mascotas.forEach((m) => {
    table.innerHTML += `
      <tr>
        <td>${m.mascota}</td>
        <td>${m.duenio}</td>
        <td>${m.vet}</td>
        <td>${m.historial}</td>
      </tr>`;
  });
}
