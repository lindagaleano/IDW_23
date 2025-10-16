const formLogin = document.getElementById("formLogin");
const usuarioValido = "admin";
const claveValida = "1234";

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("clave").value.trim();

  if (user === usuarioValido && pass === claveValida) {
    localStorage.setItem("sesionActiva", "true");
    alert("Inicio de sesión exitoso");
    window.location.href = "admin.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
