import React, { useState, useEffect } from "react";

interface Media {
  id: number;
  title: string;
  type: "image" | "video";
  url: string;
  price: number; // Precio del contenido
}

interface IClient {
  user_id: number;
  firstname: string;
  lastname: string;
  age: number;
  userBalance: number;
  addBalance: number;
  email: string;
  password: string;
  type: string;
  mediaItems: Media[]; // Contenidos multimedia asociados al cliente
  hasBalanceAccepted: boolean; // Flag para verificar si el saldo ya fue aceptado
}

export const BalancesPage: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  // Cargar los datos de los clientes desde el localStorage
  useEffect(() => {
    const storedClients = JSON.parse(
      localStorage.getItem("loggedUsers") || "[]"
    );
    setClients(storedClients);
  }, []);

  const handleSelectClient = (client: IClient) => {
    setSelectedClient(client);
  };

  const handleAcceptBalance = () => {
    if (selectedClient && !selectedClient.hasBalanceAccepted) {
      const updatedClients = clients.map((client) =>
        client.user_id === selectedClient.user_id
          ? {
              ...client,
              userBalance: client.userBalance + client.addBalance,
              hasBalanceAccepted: true, // Marcamos que ya se aceptó el saldo
            }
          : client
      );
      setClients(updatedClients);
      setSelectedClient(
        updatedClients.find(
          (client) => client.user_id === selectedClient.user_id
        ) || null
      );
      localStorage.setItem("loggedUsers", JSON.stringify(updatedClients));
    } else if (selectedClient?.hasBalanceAccepted) {
      alert("El saldo ya ha sido aceptado previamente.");
    }
  };

  const handleRejectBalance = () => {
    if (selectedClient) {
      const updatedClients = clients.map((client) =>
        client.user_id === selectedClient.user_id
          ? { ...client, userBalance: client.userBalance } // No cambiamos el saldo
          : client
      );
      setClients(updatedClients);
      setSelectedClient(
        updatedClients.find(
          (client) => client.user_id === selectedClient.user_id
        ) || null
      );
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Gestión de Clientes y Saldo</h1>

      <div className="mb-4">
        <h3>Clientes</h3>
        <ul className="list-group">
          {clients.map((client) => (
            <li
              key={client.user_id}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => handleSelectClient(client)}
              style={{ cursor: "pointer" }}
            >
              {client.firstname} {client.lastname}
              <span className="badge bg-primary rounded-pill">
                Saldo: ${client.userBalance}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {selectedClient && (
        <>
          <div className="mb-4">
            <h3>
              Detalles de Cliente: {selectedClient.firstname}{" "}
              {selectedClient.lastname}
            </h3>
            <p>
              <strong>Saldo disponible:</strong> ${selectedClient.userBalance}
            </p>
            <form action="">
              <h3>Solicitando saldo</h3>
              <p>
                <strong>Saldo pedido:</strong> ${selectedClient.addBalance}
              </p>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleAcceptBalance}
              >
                Aceptar
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleRejectBalance}
              >
                Rechazar
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
