import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import {
  getUsersThunk,
  registerUserThunk,
  updateUserThunk,
} from "../../redux/clientsThunks";
import { useForm } from "react-hook-form";
import { registerThunk } from "../../../auth";

interface IClient {
  user_id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  type: string;
}

export const AdminClients = () => {
  const [clientes, setClientes] = useState<IClient[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<IClient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<string>("");
  const [selectedCliente, setSelectedCliente] = useState<IClient | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);
  const itemsPerPage = 8;

  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.clients);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IClient>();

  const onSubmit = (data: IClient) => {
    if (selectedCliente) {
      data = { user_id: selectedCliente.user_id, ...data };
      dispatch(updateUserThunk(data));
    }

    dispatch(registerUserThunk(data));

    handleModalClose();
  };

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  useEffect(() => {
    setClientes(clients);
    setFilteredClientes(clients);
  }, [clients]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1); // Reseteamos la paginación al buscar

    if (term) {
      setFilteredClientes(
        clientes.filter((cliente) => {
          return cliente.firstname.toLowerCase().includes(term.toLowerCase());
        })
      );
    } else {
      setFilteredClientes(clientes);
    }
  };

  const handleModalShow = (action: string, cliente?: IClient) => {
    setModalAction(action);
    setSelectedCliente(cliente || null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCliente(null);
    reset();
  };

  const handleDelete = (id: number) => {
    setClientes(clientes.filter((cliente) => cliente.user_id !== id));
    setFilteredClientes(
      filteredClientes.filter((cliente) => cliente.user_id !== id)
    );
    showNotification("Cliente eliminado correctamente");
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 1000);
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
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Edad</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentClientes.map((cliente) => (
              <tr key={cliente.user_id} className="text-center">
                <td>{cliente.user_id}</td>
                <td>{cliente.firstname}</td>
                <td>{cliente.lastname}</td>
                <td>{cliente.age}</td>
                <td>{cliente.email}</td>
                <td>{cliente.type}</td>
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
                    onClick={() => handleDelete(cliente.user_id)}
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
              <div className="modal-header">
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
                      <strong>ID:</strong> {selectedCliente?.user_id}
                    </p>
                    <p>
                      <strong>Nombres:</strong> {selectedCliente?.firstname}
                    </p>
                    <p>
                      <strong>Apellidos:</strong> {selectedCliente?.lastname}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedCliente?.email}
                    </p>
                    <p>
                      <strong>Edad:</strong> {selectedCliente?.age}
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="needs-validation"
                  >
                    <div className="mb-3">
                      <label className="form-label">Nombres</label>
                      <input
                        {...register("firstname", {
                          required: "El nombre es requerido.",
                          value: selectedCliente?.firstname || "",
                        })}
                        className={`form-control ${
                          errors.firstname ? "is-invalid" : ""
                        }`}
                      />
                      {errors.firstname && (
                        <div className="invalid-feedback">
                          {errors.firstname.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Apellidos</label>
                      <input
                        {...register("lastname", {
                          required: "Los apellidos son requeridos.",
                          value: selectedCliente?.lastname || "",
                        })}
                        className={`form-control ${
                          errors.lastname ? "is-invalid" : ""
                        }`}
                      />
                      {errors.lastname && (
                        <div className="invalid-feedback">
                          {errors.lastname.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Edad</label>
                      <input
                        type="number"
                        {...register("age", {
                          required: "La edad es requerida",
                          value: selectedCliente?.age || 0,
                          min: {
                            value: 1,
                            message: "La edad debe ser mayor a 0.",
                          },
                          max: {
                            value: 120,
                            message: "La edad debe ser menor o igual a 120.",
                          },
                          valueAsNumber: true,
                        })}
                        className={`form-control ${
                          errors.age ? "is-invalid" : ""
                        }`}
                      />
                      {errors.age && (
                        <div className="invalid-feedback">
                          {errors.age.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Correo Electronico</label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "El correo es requerido",
                          value: selectedCliente?.email || "",
                        })}
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Tipo de usuario</label>
                      <select
                        {...register("type", {
                          required: "User type is required",
                          value: selectedCliente?.type || "CLIENT",
                        })}
                        className="form-select"
                      >
                        <option value="CLIENT">CLIENT</option>
                        <option value="ADMIN">ADMIN</option>

                        {/* <option value="OTHER">Other</option> */}
                      </select>
                      {errors.type && (
                        <div className="invalid-feedback">
                          {errors.type.message}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn btn-success">
                      Guardar
                    </button>
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
                {/* {modalAction !== "Ver" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Guardar
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
