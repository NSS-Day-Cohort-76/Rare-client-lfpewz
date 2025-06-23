import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../../managers/UserManager"

export const UserProfiles = ({ user }) => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.isStaff) {
      getAllUsers().then((data) => {
        const sorted = data.sort((a, b) =>
          a.display_name.localeCompare(b.display_name)
        )
        setUsers(sorted)
      })
    }
  }, [user])

  if (!user?.isStaff) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="title is-4">Unauthorized</h2>
          <p>You do not have permission to view this page.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-4">User Profiles</h2>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Display Name</th>
              <th>Full Name</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.display_name}</td>
                <td>{u.first_name} {u.last_name}</td>
                <td>{u.is_staff ? "Admin" : "Author"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
