const contenedor = document.getElementById("contenedorMedicos");
const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

if (medicos.length === 0) {
  contenedor.innerHTML = `<p class="text-center">No hay médicos registrados.</p>`;
} else {
  medicos.forEach((m) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5>${m.nombre} ${m.apellido}</h5>
          <p><strong>Especialidad:</strong> ${m.especialidad}</p>
          <p><strong>Matrícula:</strong> ${m.matricula}</p>
          <p><strong>Teléfono:</strong> ${m.telefono || "-"}</p>
          <p><strong>Email:</strong> ${m.email || "-"}</p>
          <p><strong>Obra Social:</strong> ${m.obraSocial || "-"}</p>
          <p><strong>Valor consulta:</strong> $${m.valor || 0}</p>
          <td><img src="${m.foto || 'placeholder.png'}" class="foto-perfil"></td>
        </div>
      </div>`;
    contenedor.appendChild(card);
  });
}
