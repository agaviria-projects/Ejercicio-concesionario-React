function CustomerList({ customers, deleteCustomer, selectCustomer }) {
    return (
      <div style={{ marginTop: "20px" }}>
        <h2>Lista de Clientes</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {customers.map((customer) => (
            <li key={customer.id} style={{ marginBottom: "10px" }}>
              <strong>{customer.name}</strong> - {customer.email}
              <div style={{ marginTop: "5px" }}>
                <button
                  onClick={() => selectCustomer(customer)}
                  style={{ marginRight: "10px" }}
                >
                  Editar
                </button>
                <button onClick={() => deleteCustomer(customer.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default CustomerList;
  
  