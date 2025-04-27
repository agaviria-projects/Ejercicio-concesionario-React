import { useState, useEffect } from "react";

function CustomerForm({ fetchCustomers, selectedCustomer, clearSelectedCustomer }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setEmail(selectedCustomer.email);
      setFullname(selectedCustomer.fullname || ""); // Si existe, lo pone, sino vacío
      setPassword(selectedCustomer.password || ""); // Igual
    } else {
      setName("");
      setEmail("");
      setFullname("");
      setPassword("");
    }
  }, [selectedCustomer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = { name, email, fullname, password };

    try {
      if (selectedCustomer) {
        // Actualizar cliente (PUT)
        await fetch(`https://centerbeam.proxy.rlwy.net:24066/api/Customer${selectedCustomer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerData),
        });
        clearSelectedCustomer();
      } else {
        // Crear cliente nuevo (POST)
        await fetch("https://centerbeam.proxy.rlwy.net:24066/api/Customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerData),
        });
      }
    
      setName("");
      setEmail("");
      setFullname("");
      setPassword("");
      fetchCustomers(); // Actualizar la lista
    } catch (error) {
      console.error("Error guardando cliente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>{selectedCustomer ? "Editar Cliente" : "Agregar Cliente"}</h2>

      {/* CONTENEDOR CENTRADO */}
      <div style={{
        width: "250px",
        margin: "0 auto"
      }}>
        <input
          type="text"
          placeholder="Nombre (Corto)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="text"
          placeholder="Nombre Completo"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            {selectedCustomer ? "Actualizar" : "Guardar"}
          </button>

          {selectedCustomer && (
            <button
              type="button"
              onClick={clearSelectedCustomer}
              style={{
                padding: "8px 12px",
                marginLeft: "10px",
                borderRadius: "5px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
      {/* FIN CONTENEDOR */}
    </form>
  );
}

export default CustomerForm;


