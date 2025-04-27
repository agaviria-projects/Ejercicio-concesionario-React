import { useState, useEffect } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/Customer");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error trayendo clientes:", error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/Customer/${id}`, {
        method: "DELETE",
      });
      fetchCustomers();
    } catch (error) {
      console.error("Error eliminando cliente:", error);
    }
  };

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "center"
    }}>
      <h1>Concesionario App - Gestión de Clientes</h1>
      <CustomerForm
        fetchCustomers={fetchCustomers}
        selectedCustomer={selectedCustomer}
        clearSelectedCustomer={clearSelectedCustomer}
      />
      <CustomerList
        customers={customers}
        deleteCustomer={deleteCustomer}
        selectCustomer={selectCustomer}
      />
    </div>
  );
}

export default App;
