const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("usuario").value.trim();
  const password = document.getElementById("clave").value.trim();

  try {
    
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Usuario o contraseña incorrectos");

    const data = await res.json();

    
    const usersRes = await fetch("https://dummyjson.com/users");
    const usersData = await usersRes.json();

    
    const userFound = usersData.users.find(u => u.username === data.username);

    
    let rol = "user"; 
    if (userFound && (userFound.role === "admin" || userFound.username.toLowerCase().includes("admin"))) {
      rol = "admin";
    }

    
    sessionStorage.setItem("accessToken", data.token);
    sessionStorage.setItem("usuario", data.username);
    sessionStorage.setItem("rol", rol);

   
    alert(`Bienvenido ${data.username} (rol: ${rol})`);

    if (rol === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }

  } catch (err) {
    alert("Error: " + err.message);
  }
});
