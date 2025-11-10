document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorMedicos");

  // Médicos fijos
  const medicosFijos = [
    {
      nombre: "Ana",
      apellido: "Gómez",
      especialidad: "Pediatría",
      matricula: "12345",
      obraSocial: "OSDE",
      telefono: "011-1234-5678",
      email: "ana.gomez@clinica.com",
      valor: 20000,
      foto: "/medica1.jpg"
    },
    {
      nombre: "Juan",
      apellido: "Pérez",
      especialidad: "Cardiología",
      matricula: "67890",
      obraSocial: "Swiss Medical",
      telefono: "011-8765-4321",
      email: "juan.perez@clinica.com",
      valor: 30000,
      foto: "/medico4.jpg"
    },
    {
      nombre: "María",
      apellido: "Rodríguez",
      especialidad: "Dermatología",
      matricula: "54321",
      obraSocial: "Galeno",
      telefono: "011-5555-9999",
      email: "maria.rodriguez@clinica.com",
      valor: 30000,
      foto: "/medica3.jpg"
    }
  ];

  
  const medicosLocal = JSON.parse(localStorage.getItem("medicos")) || [];

  
  const medicos = [...medicosFijos];

  medicosLocal.forEach((mLocal) => {
    if (!medicos.some(mFijo => mFijo.matricula === mLocal.matricula)) {
      medicos.push(mLocal);
    }
  });


  if (medicosLocal.length > 0) {
    localStorage.setItem("medicos", JSON.stringify(medicosLocal));
  }


  if (medicos.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted">No hay médicos registrados.</p>`;
    return;
  }

  medicos.forEach((m) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card card-medico h-100 text-center p-3 shadow-sm" style="cursor:pointer;" 
          data-bs-toggle="modal" data-bs-target="#modalMedico"
          data-nombre="${m.nombre}" data-apellido="${m.apellido}" data-especialidad="${m.especialidad}"
          data-matricula="${m.matricula}" data-obrasocial="${m.obraSocial}"
          data-telefono="${m.telefono || '-'}" data-email="${m.email || '-'}" data-valor="${m.valor || 0}"
          data-foto="${m.foto || 'https://cdn-icons-png.flaticon.com/512/387/387561.png'}">
        <img src="${m.foto || 'https://cdn-icons-png.flaticon.com/512/387/387561.png'}" 
            alt="Foto de ${m.nombre}" class="foto-perfil mb-3">
        <h5 class="card-title">${m.nombre} ${m.apellido}</h5>
        <p class="card-text text-muted">${m.especialidad}</p>
      </div>`;
    contenedor.appendChild(card);
  });
});

// modal 
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card-medico");
  if (!card) return;

  document.getElementById("modalNombre").textContent = card.dataset.nombre + " " + card.dataset.apellido;
  document.getElementById("modalFoto").src = card.dataset.foto;
  document.getElementById("modalEspecialidad").textContent = card.dataset.especialidad;
  document.getElementById("modalMatricula").textContent = card.dataset.matricula;
  document.getElementById("modalObraSocial").textContent = card.dataset.obrasocial;
  document.getElementById("modalTelefono").textContent = card.dataset.telefono;
  document.getElementById("modalEmail").textContent = card.dataset.email;
  document.getElementById("modalValor").textContent = card.dataset.valor;
});

