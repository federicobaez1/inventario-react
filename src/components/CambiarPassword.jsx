import { useState } from "react";

export function CambiarPassword() {
  const [username, setUsername] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password: nuevaClave
        })
      });

      const texto = await res.text();

      if (!res.ok) {
        throw new Error(texto || "Error al cambiar contraseña");
      }

      setMensaje("✅ Contraseña actualizada correctamente");
    } catch (err) {
      setMensaje("❌ " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cambiar Contraseña</h2>
      {mensaje && <p>{mensaje}</p>}

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Nueva Contraseña"
        value={nuevaClave}
        onChange={(e) => setNuevaClave(e.target.value)}
        required
      />
      <button type="submit">Cambiar</button>
    </form>
  );
}
