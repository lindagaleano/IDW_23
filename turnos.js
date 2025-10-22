const form = document.getElementById("form-turno");
const tabla = document.getElementById("tabla-turnos");


document.addEventListener("DOMContentLoaded", mostrarTurnos);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const turno = {
    especialidad: document.getElementById("especialidad").value,
    medico: document.getElementById("medico").value,
    obra: document.getElementById("obra").value,
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value
  };


  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  turnos.push(turno);
  localStorage.setItem("turnos", JSON.stringify(turnos));

  
  mostrarTurnos();


  form.reset();

  
  alert(` Turno reservado:
Especialidad: ${turno.especialidad}
Médico: ${turno.medico}
Fecha: ${turno.fecha}
Hora: ${turno.hora}`);
});

function mostrarTurnos() {
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  tabla.innerHTML = "";
  turnos.forEach(t => {
    const fila = `<tr>
      <td>${t.especialidad}</td>
      <td>${t.medico}</td>
      <td>${t.obra}</td>
      <td>${t.fecha}</td>
      <td>${t.hora}</td>
    </tr>`;
    tabla.innerHTML += fila;
  });
}
