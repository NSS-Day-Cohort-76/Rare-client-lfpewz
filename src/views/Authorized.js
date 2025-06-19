import { Navigate, Outlet } from "react-router-dom"

export const Authorized = ({ user }) => {
  if (user?.userId) {
    return <Outlet context={{ user }} />  // Pass user into Outlet
  }

  return <Navigate to="/login" replace />
}
