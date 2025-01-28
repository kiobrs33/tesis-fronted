import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { getUsersThunk } from "../../redux/clientsThunks";

type Cliente = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
};

export const AdminClients: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<string>("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);
  const itemsPerPage = 5;

  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.clients);

  const fetchClientes = async () => {
    const mockData: Cliente[] = [
      {
        id: 1,
        nombre: "Juan Perez",
        email: "juan@example.com",
        telefono: "123456789",
      },
      {
        id: 2,
        nombre: "Maria Lopez",
        email: "maria@example.com",
        telefono: "987654321",
      },
      {
        id: 3,
        nombre: "Carlos Gomez",
        email: "carlos@example.com",
        telefono: "123123123",
      },
      {
        id: 4,
        nombre: "Ana Torres",
        email: "ana@example.com",
        telefono: "456456456",
      },
      {
        id: 5,
        nombre: "Luis Diaz",
        email: "luis@example.com",
        telefono: "789789789",
      },
      {
        id: 6,
        nombre: "Sara Ruiz",
        email: "sara@example.com",
        telefono: "111222333",
      },
    ];

    dispatch(getUsersThunk());
    // setClientes(mockData);
    setClientes(clients);
    setFilteredClientes(mockData);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setFilteredClientes(
        clientes.filter((cliente) =>
          cliente.nombre.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredClientes(clientes);
    }
  };

  const handleModalShow = (action: string, cliente?: Cliente) => {
    setModalAction(action);
    setSelectedCliente(cliente || null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCliente(null);
  };

  const handleDelete = (id: number) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
    setFilteredClientes(
      filteredClientes.filter((cliente) => cliente.id !== id)
    );
    showNotification("Cliente eliminado correctamente");
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => {
    showNotification("Cliente guardado correctamente");
    handleModalClose();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClientes = filteredClientes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      {notification && (
        <div className="alert alert-success text-center" role="alert">
          {notification}
        </div>
      )}

      <h1 className="fs-3 mb-4">Administrar Clientes</h1>
      <div className="row mb-4 justify-content-center">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => handleModalShow("Crear")}
          >
            Crear cliente
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentClientes.map((cliente) => (
              <tr key={cliente.id} className="text-center">
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>
                  <button
                    className="btn btn-outline-info btn-sm me-2"
                    onClick={() => handleModalShow("Ver", cliente)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleModalShow("Editar", cliente)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-secondary text-white">
                <h5 className="modal-title">{modalAction} Cliente</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                {modalAction === "Ver" ? (
                  <div>
                    <p>
                      <strong>ID:</strong> {selectedCliente?.id}
                    </p>
                    <p>
                      <strong>Nombre:</strong> {selectedCliente?.nombre}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedCliente?.email}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {selectedCliente?.telefono}
                    </p>
                  </div>
                ) : (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={selectedCliente?.nombre || ""}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue={selectedCliente?.email || ""}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={selectedCliente?.telefono || ""}
                      />
                    </div>
                  </form>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleModalClose}
                >
                  Cerrar
                </button>
                {modalAction !== "Ver" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Guardar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
