import React, { useState } from "react";

interface Media {
  id: number;
  title: string;
  type: "image" | "video";
  url: string;
  price: number; // Precio del contenido
}

interface Customer {
  id: number;
  name: string;
  balance: number; // Saldo del cliente
  totalSpent: number; // Total gastado por el cliente
  mediaItems: Media[]; // Contenidos multimedia asociados al cliente
}

export const BalancesPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Juan Pérez",
      balance: 500,
      totalSpent: 0,
      mediaItems: [
        {
          id: 1,
          title: "Imagen 1",
          type: "image",
          url: "https://via.placeholder.com/150",
          price: 50,
        },
        {
          id: 2,
          title: "Video 1",
          type: "video",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          price: 100,
        },
      ],
    },
    {
      id: 2,
      name: "Ana Gómez",
      balance: 300,
      totalSpent: 0,
      mediaItems: [
        {
          id: 3,
          title: "Imagen 2",
          type: "image",
          url: "https://via.placeholder.com/150",
          price: 40,
        },
        {
          id: 4,
          title: "Video 2",
          type: "video",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          price: 90,
        },
      ],
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handlePurchase = (media: Media) => {
    if (selectedCustomer && selectedCustomer.balance >= media.price) {
      // Actualizar el saldo del cliente
      const updatedCustomer = { ...selectedCustomer };
      updatedCustomer.balance -= media.price;
      updatedCustomer.totalSpent += media.price;
      updatedCustomer.mediaItems = [...updatedCustomer.mediaItems, media];

      // Actualizar el estado de los clientes
      setCustomers(
        customers.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
    } else {
      alert("Saldo insuficiente para realizar esta compra.");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Gestión de Clientes y Saldo</h1>

      <div className="mb-4">
        <h3>Clientes</h3>
        <ul className="list-group">
          {customers.map((customer) => (
            <li
              key={customer.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => handleSelectCustomer(customer)}
              style={{ cursor: "pointer" }}
            >
              {customer.name}
              <span className="badge bg-primary rounded-pill">
                Saldo: ${customer.balance}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {selectedCustomer && (
        <>
          <div className="mb-4">
            <h3>Detalles de Cliente: {selectedCustomer.name}</h3>
            <p>
              <strong>Saldo disponible:</strong> ${selectedCustomer.balance}
            </p>
            <p>
              <strong>Total gastado:</strong> ${selectedCustomer.totalSpent}
            </p>
            <h4>Contenido Multimedia</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {selectedCustomer.mediaItems.map((media) => (
                  <tr key={media.id}>
                    <td>{media.title}</td>
                    <td>{media.type === "image" ? "Imagen" : "Video"}</td>
                    <td>${media.price}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handlePurchase(media)}
                      >
                        Comprar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
