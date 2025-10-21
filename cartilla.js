const cuerpo = document.getElementById("cuerpoTabla");
const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

if (medicos.length === 0) {
  cuerpo.innerHTML = `<tr><td colspan="8" class="text-center">No hay médicos registrados.</td></tr>`;
} else {
  medicos.forEach((m) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${m.foto || 'placeholder.png'}" class="foto-perfil" alt="Foto de ${m.nombre}"></td>
      <td>${m.nombre} ${m.apellido}</td>
      <td>${m.especialidad}</td>
      <td>${m.matricula}</td>
      <td>${m.telefono || '-'}</td>
      <td>${m.email || '-'}</td>
      <td>${m.obraSocial || '-'}</td>
      <td>$${m.valor || 0}</td>
    `;
    cuerpo.appendChild(fila);
  });
}
