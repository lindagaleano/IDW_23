const form = document.getElementById("form-turno");
const tablaTurnos = document.getElementById("tabla-turnos");

// =============================
// GUARDAR TURNO
// =============================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  
  const turno = {
    especialidad: document.getElementById("especialidad").value.trim(),
    medico: document.getElementById("medico").value.trim(),
    obra: document.getElementById("obra").value.trim(),
    fecha: document.getElementById("fecha").value.trim(),
    hora: document.getElementById("hora").value.trim()
  };



  
  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  turnos.push(turno);

 
  turnos = turnos.filter(t => t.especialidad && t.medico && t.obra && t.fecha && t.hora);
  localStorage.setItem("turnos", JSON.stringify(turnos));


  form.reset();

  alert(`✅ Turno reservado:
Especialidad: ${turno.especialidad}
Médico: ${turno.medico}
Obra Social: ${turno.obra}
Fecha: ${turno.fecha}
Hora: ${turno.hora}`);
});

// =============================
// MOSTRAR TURNOS
// =============================
function mostrarTurnos() {
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const tablaTurnos = document.getElementById("tabla-turnos");
  if (!tablaTurnos) return;

  tablaTurnos.innerHTML = "";

  if (turnos.length === 0) {
    tablaTurnos.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">No hay turnos registrados</td>
      </tr>`;
    return;
  }

  turnos.forEach(t => {
    const fila = `
      <tr>
        <td>${t.especialidad}</td>
        <td>${t.medico}</td>
        <td>${t.obra}</td>
        <td>${t.fecha}</td>
        <td>${t.hora}</td>
      </tr>`;
    tablaTurnos.innerHTML += fila;
  });
}

// =============================
// INICIALIZAR AL CARGAR
// =============================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("tabla-turnos")) {
    mostrarTurnos();
  }
});
