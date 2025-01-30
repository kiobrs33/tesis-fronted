// src/components/UserProfile.tsx

import { useAppSelector } from "../../../redux/hooks/hooks";

export const Myacount = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h5>Perfil de Usuario</h5>
        </div>
        <div className="card-body">
          <h5>{`${user.firstname} ${user.lastname}`}</h5>
          <p>{`Edad: ${user.age}`}</p>
          <p>{`Tipo de usuario: ${user.type}`}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Email:</strong> {user.email}
          </li>
          {/* <li className="list-group-item">
            <strong>Creado el:</strong>{" "}
            {new Date(user.created_at).toLocaleString()}
          </li>
          <li className="list-group-item">
            <strong>Actualizado el:</strong>{" "}
            {new Date(user.updated_at).toLocaleString()}
          </li> */}
        </ul>
      </div>
    </div>
  );
};
