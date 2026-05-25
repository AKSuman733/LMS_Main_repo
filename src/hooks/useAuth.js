import { useSelector } from "react-redux";

function useAuth() {
  const { user, token, isLoading } = useSelector(
    (state) => state.auth
  );

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
  };
}

export default useAuth;