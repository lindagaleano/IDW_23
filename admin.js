// login
if (localStorage.getItem("sesionActiva") !== "true") {
  alert("Acceso denegado. Iniciá sesión primero.");
  window.location.href = "login.html";
}

document.getElementById("cerrarSesion").addEventListener("click", () => {
  localStorage.removeItem("sesionActiva");
  window.location.href = "login.html";
});


const form = document.getElementById("formMedico");
const tbody = document.getElementById("tablaMedicos");
let medicos = JSON.parse(localStorage.getItem("medicos")) || [];


function guardarLocal() {
  localStorage.setItem("medicos", JSON.stringify(medicos));
}


function renderTabla() {
  tbody.innerHTML = "";
  medicos.forEach((m, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${m.foto || 'placeholder.png'}" class="foto-perfil"></td>
      <td>${m.nombre}</td>
      <td>${m.apellido}</td>
      <td>${m.especialidad}</td>
      <td>${m.matricula}</td>
      <td>${m.telefono || "-"}</td>
      <td>${m.email || "-"}</td>
      <td>${m.obraSocial || "-"}</td>
      <td>$${m.valor || 0}</td>
      <td>
        <button class="btn btn-sm btn-success" onclick="editar(${i})">Editar</button>
        <button class="btn btn-sm btn-dark" onclick="eliminar(${i})">Eliminar</button>
      </td>`;
    tbody.appendChild(fila);
  });
}

// Agregar - editar médico
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = Object.fromEntries(new FormData(form).entries());
  const file = form.foto.files[0];

  const guardarDatos = (fotoBase64) => {
    datos.valor = parseFloat(datos.valor) || 0;
    datos.foto = fotoBase64 || medicos[form.dataset.editando]?.foto || "";

    if (form.dataset.editando) {
      medicos[form.dataset.editando] = datos;
      delete form.dataset.editando;
      alert("Médico modificado con éxito");
    } else {
      medicos.push(datos);
      alert("Médico registrado con éxito");
    }

    guardarLocal();
    renderTabla();
    form.reset();
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => guardarDatos(reader.result);
    reader.readAsDataURL(file);
  } else {
    guardarDatos("");
  }
});


window.editar = (i) => {
  const m = medicos[i];
  for (const campo in m) {
    if (form[campo] && campo !== "foto") {
      form[campo].value = m[campo];
    }
  }
  form.dataset.editando = i;
  window.scrollTo({ top: 0, behavior: "smooth" });
};


window.eliminar = (i) => {
  if (confirm("¿Eliminar médico?")) {
    medicos.splice(i, 1);
    guardarLocal();
    renderTabla();
  }
};


renderTabla();
