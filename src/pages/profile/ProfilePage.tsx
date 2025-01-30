import React from "react";
import { useAppSelector } from "../../redux/hooks/hooks";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

export const ProfilePage: React.FC = () => {
  // Simulación de un usuario logueado
  // const loggedInUser: User = {
  //   id: 1,
  //   name: "Juan Pérez",
  //   email: "juan.perez@example.com",
  //   phone: "+1 234 567 890",
  //   address: "Calle Ficticia 123, Ciudad, País",
  //   profilePicture:
  //     "https://img.freepik.com/foto-gratis/par-entrenadores_144627-3810.jpg",
  // };

  const { user } = useAppSelector((state) => state.auth);

  const loggedInUser = user

  return (
    <div className="container py-4">
      <h1 className="mb-4">Mi Perfil</h1>

      <div className="row">
        {/* Foto de Perfil */}
        <div className="col-md-4">
          <div className="text-center">
            <img
              src={loggedInUser.profilePicture}
              alt="Foto de perfil"
              className="img-fluid rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
            <h4>{loggedInUser.name}</h4>
            <p>{loggedInUser.email}</p>
          </div>
        </div>

        {/* Información de la cuenta */}
        <div className="col-md-8">
          <h4>Información de la cuenta</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>ID de Usuario:</strong> {loggedInUser.id}
            </li>
            <li className="list-group-item">
              <strong>Nombre:</strong> {loggedInUser.name}
            </li>
            <li className="list-group-item">
              <strong>Correo Electrónico:</strong> {loggedInUser.email}
            </li>
            <li className="list-group-item">
              <strong>Teléfono:</strong> {loggedInUser.phone}
            </li>
            <li className="list-group-item">
              <strong>Dirección:</strong> {loggedInUser.address}
            </li>
          </ul>
          <div className="mt-3">
            <button
              className="btn btn-warning"
              onClick={() => alert("Editar perfil!")}
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
