import { Navigate, Outlet } from "react-router-dom"

export const Authorized = ({ user }) => {
  if (user) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}
