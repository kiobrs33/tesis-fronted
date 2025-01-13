import React, { useState } from "react";

interface Order {
  id: number;
  customerName: string;
  product: string;
  quantity: number;
  total: number;
}

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: "Juan Pérez",
      product: "Laptop",
      quantity: 1,
      total: 1500,
    },
    {
      id: 2,
      customerName: "Ana Gómez",
      product: "Teléfono",
      quantity: 2,
      total: 1200,
    },
    {
      id: 3,
      customerName: "Carlos Díaz",
      product: "Teclado",
      quantity: 1,
      total: 100,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [modalType, setModalType] = useState<"create" | "edit" | "view" | null>(
    null
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleShowModal = (type: "create" | "edit" | "view", order?: Order) => {
    setModalType(type);
    setSelectedOrder(order || null);
    const modal = new window.bootstrap.Modal(
      document.getElementById("orderModal")!
    );
    modal.show();
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedOrder(null);
  };

  const handleCreate = (newOrder: Order) => {
    setOrders([...orders, { ...newOrder, id: orders.length + 1 }]);
    handleCloseModal();
  };

  const handleEdit = (updatedOrder: Order) => {
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const order: Order = {
      id: selectedOrder?.id || 0,
      customerName: formData.get("customerName") as string,
      product: formData.get("product") as string,
      quantity: Number(formData.get("quantity")),
      total: Number(formData.get("total")),
    };
    modalType === "create" ? handleCreate(order) : handleEdit(order);
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("orderModal")!
    );
    modal?.hide();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Administración de Pedidos</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar pedido por cliente..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="btn btn-primary"
          onClick={() => handleShowModal("create")}
        >
          Crear Pedido
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>${order.total}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleShowModal("view", order)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal("edit", order)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(order.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No se encontraron pedidos.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

      {/* Modal */}
      <div className="modal fade" id="orderModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {modalType === "create" && "Crear Pedido"}
                {modalType === "edit" && "Editar Pedido"}
                {modalType === "view" && "Ver Pedido"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {modalType === "view" && selectedOrder && (
                <div>
                  <p>
                    <strong>Cliente:</strong> {selectedOrder.customerName}
                  </p>
                  <p>
                    <strong>Producto:</strong> {selectedOrder.product}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {selectedOrder.quantity}
                  </p>
                  <p>
                    <strong>Total:</strong> ${selectedOrder.total}
                  </p>
                </div>
              )}
              {(modalType === "create" || modalType === "edit") && (
                <form onSubmit={handleSubmitForm}>
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <input
                      type="text"
                      className="form-control"
                      name="customerName"
                      defaultValue={selectedOrder?.customerName || ""}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      name="product"
                      defaultValue={selectedOrder?.product || ""}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      defaultValue={selectedOrder?.quantity || ""}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Total</label>
                    <input
                      type="number"
                      className="form-control"
                      name="total"
                      defaultValue={selectedOrder?.total || ""}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {modalType === "create" ? "Crear" : "Guardar"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
