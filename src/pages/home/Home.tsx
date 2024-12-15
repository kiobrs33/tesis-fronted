import { logout } from "../../modules/auth/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export const Home = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>WELCOME TO HOME! {auth.user.email}</h1>
      {auth.user.email && (
        <button type="button" onClick={handleLogout}>
          LOGOUT
        </button>
      )}
    </div>
  );
};
