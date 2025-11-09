// =============================
// Validación de acceso
// =============================
const token = sessionStorage.getItem("accessToken");
const rol = sessionStorage.getItem("rol");

if (!token) {
  alert("Acceso denegado. Iniciá sesión primero.");
  window.location.href = "login.html";
} else if (rol !== "admin") {
  alert("Acceso restringido. Solo administradores pueden ingresar.");
  window.location.href = "index.html";
}

document.getElementById("cerrarSesion").addEventListener("click", () => {
  sessionStorage.clear();
  alert("Sesión cerrada correctamente");
  window.location.href = "index.html";
});

// =============================
// MÉDICOS
// =============================
const form = document.getElementById("formMedico");
const tbody = document.getElementById("tablaMedicos");
const selectEspecialidad = document.getElementById("selectEspecialidad");

let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

// Si no hay especialidades guardadas, cargar por defecto
if (especialidades.length === 0) {
  especialidades = [
    { nombre: "Cardiología" },
    { nombre: "Cirugía" },
    { nombre: "Odontología" },
    { nombre: "Estudios Diagnósticos" },
    { nombre: "Kinesiología y Fisioterapia" },
    { nombre: "Clínica Médica" },
    { nombre: "Bienestar Mental" },
    { nombre: "Nutrición" },
    { nombre: "Oftalmología" },
    { nombre: "Ortopedia y Traumatología" },
    { nombre: "Banco de Sangre" }
  ];
  localStorage.setItem("especialidades", JSON.stringify(especialidades));
}

function guardarMedicos() {
  localStorage.setItem("medicos", JSON.stringify(medicos));
}

function guardarEspecialidades() {
  localStorage.setItem("especialidades", JSON.stringify(especialidades));
}

function cargarEspecialidadesEnSelect() {
  if (!selectEspecialidad) return;
  selectEspecialidad.innerHTML = `<option value="">Seleccionar especialidad...</option>`;
  especialidades.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e.nombre;
    opt.textContent = e.nombre;
    selectEspecialidad.appendChild(opt);
  });
}

function renderTabla() {
  tbody.innerHTML = "";
  medicos.forEach((m, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${m.foto || 'placeholder.png'}" class="foto-perfil" alt="foto"></td>
      <td>${m.nombre}</td>
      <td>${m.apellido}</td>
      <td>${m.especialidad || '-'}</td>
      <td>${m.matricula || '-'}</td>
      <td>${m.telefono || '-'}</td>
      <td>${m.email || '-'}</td>
      <td>${m.obraSocial || '-'}</td>
      <td>$${m.valor || 0}</td>
      <td>
        <button class="btn btn-sm btn-success" onclick="editar(${i})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminar(${i})">Eliminar</button>
      </td>`;
    tbody.appendChild(fila);
  });
}

// --- Guardar o editar médico ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(form).entries());
  datos.valor = parseFloat(datos.valor) || 0;

  const file = form.foto.files[0];

  const guardarConFoto = (fotoBase64) => {
    datos.foto = fotoBase64 || medicos[form.dataset.editando]?.foto || "";

    if (form.dataset.editando) {
      medicos[form.dataset.editando] = datos;
      delete form.dataset.editando;
      alert("✅ Médico modificado con éxito");
    } else {
      medicos.push(datos);
      alert("✅ Médico registrado con éxito");
    }

    guardarMedicos();
    renderTabla();
    form.reset();
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => guardarConFoto(reader.result);
    reader.readAsDataURL(file);
  } else {
    guardarConFoto("");
  }
});

window.editar = (i) => {
  const m = medicos[i];
  for (const campo in m) {
    if (campo === "foto") continue;
    if (form[campo]) form[campo].value = m[campo];
  }
  if (selectEspecialidad && m.especialidad)
    selectEspecialidad.value = m.especialidad;
  form.dataset.editando = i;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.eliminar = (i) => {
  if (confirm("¿Eliminar médico?")) {
    medicos.splice(i, 1);
    guardarMedicos();
    renderTabla();
  }
};

// =============================
// TURNOS
// =============================
function renderTurnos() {
  const tablaTurnos = document.getElementById("tabla-turnos");
  if (!tablaTurnos) {
    console.warn(" No se encontró la tabla de turnos en DOmM.");
    return;
  }

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  console.log("Turnos cargados desde localStorage:", turnos);

  tablaTurnos.innerHTML = "";

  if (turnos.length === 0) {
    tablaTurnos.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">No hay turnos registrados</td>
      </tr>`;
    return;
  }

  turnos.forEach((t, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${t.especialidad || "-"}</td>
      <td>${t.medico || "-"}</td>
      <td>${t.obra || "-"}</td>
      <td>${t.fecha ? new Date(t.fecha).toLocaleDateString("es-AR") : "-"}</td>

      <td>${t.hora || "-"}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarTurno(${i})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarTurno(${i})">Eliminar</button>
      </td>`;
    tablaTurnos.appendChild(fila);
  });
}

window.eliminarTurno = (i) => {
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  if (!confirm("¿Eliminar este turno?")) return;

  turnos.splice(i, 1);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  renderTurnos();
  alert(" Turno eliminado correctamente.");
};

window.editarTurno = (i) => {
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const turno = turnos[i];

  const nuevaEspecialidad = prompt("Nueva especialidad:", turno.especialidad);
  const nuevoMedico = prompt("Nuevo médico:", turno.medico);
  const nuevaObra = prompt("Nueva obra social:", turno.obra);
  const nuevaFecha = prompt("Nueva fecha (DD-MM-YYYY):", turno.fecha);
  const nuevaHora = prompt("Nueva hora (HH:MM):", turno.hora);

  if (!nuevaEspecialidad || !nuevoMedico || !nuevaFecha || !nuevaHora) {
    alert("⚠️ Datos inválidos o cancelado.");
    return;
  }

  turnos[i] = {
    especialidad: nuevaEspecialidad,
    medico: nuevoMedico,
    obra: nuevaObra,
    fecha: nuevaFecha,
    hora: nuevaHora
  };

  localStorage.setItem("turnos", JSON.stringify(turnos));
  renderTurnos();
  alert(" Turno editado correctamente.");
};

// =============================
// 
// =============================
document.addEventListener("DOMContentLoaded", () => {
  cargarEspecialidadesEnSelect();
  renderTabla();
  renderTurnos(); 
});
