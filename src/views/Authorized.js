import { Navigate, Outlet } from "react-router-dom"

export const Authorized = ({ user }) => {
  if (user?.id) {
    return <Outlet context={{ user }} />  // Pass user into Outlet
  }

  return <Navigate to="/login" replace />
}
