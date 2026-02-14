let mascotas = [];

function login() {
  window.location.href = "./dashboard.html";
}

function logout() {
  window.location.href = "./index.html";
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
