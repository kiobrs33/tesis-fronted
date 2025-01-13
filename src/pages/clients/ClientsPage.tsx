import React, { useState } from "react";

interface Client {
  id: number;
  name: string;
  email: string;
  age: number;
}

export const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", age: 30 },
    { id: 2, name: "Ana Gómez", email: "ana@example.com", age: 25 },
    { id: 3, name: "Carlos Díaz", email: "carlos@example.com", age: 35 },
    { id: 4, name: "María López", email: "maria@example.com", age: 28 },
    { id: 5, name: "Luis Castillo", email: "luis@example.com", age: 40 },
    { id: 6, name: "Sandra Rojas", email: "sandra@example.com", age: 32 },
    { id: 7, name: "Pedro Sánchez", email: "pedro@example.com", age: 29 },
    { id: 8, name: "Marta Ortega", email: "marta@example.com", age: 27 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reinicia la página actual al buscar
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los índices para la paginación
  const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Administración de Clientes</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar cliente por nombre..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="btn btn-primary"
          onClick={() => alert("Crear cliente")}
        >
          Crear Cliente
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.length > 0 ? (
            paginatedClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.age}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => alert(`Ver cliente: ${client.name}`)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => alert(`Editar cliente: ${client.name}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(client.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No se encontraron clientes.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
