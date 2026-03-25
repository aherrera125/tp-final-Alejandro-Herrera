const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    errorMsg.textContent = "Conectando...";

    fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedEmail", email);
        window.location.href = "dashboard.html";
      })
      .catch((err) => {
        console.error("Error en login:", err);
        errorMsg.textContent =
          "Error al iniciar sesión. Verifique sus credenciales.";
      });
  });
}

// Redirect if already logged in
if (
  localStorage.getItem("token") &&
  window.location.pathname.includes("index.html")
) {
  window.location.href = "dashboard.html";
}
