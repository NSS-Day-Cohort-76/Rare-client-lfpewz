import { useEffect, useState } from "react"

export const UserManager = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8088/users")
      .then(res => res.json())
      .then(setUsers)
  }, [])

  const updateUser = (updatedUser) => {
    fetch(`http://localhost:8088/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
      .then(() => {
        // Refresh user list after update
        return fetch("http://localhost:8088/users")
      })
      .then(res => res.json())
      .then(setUsers)
  }

  const toggleActive = (user) => {
    const updatedUser = { ...user, active: !user.active }
    updateUser(updatedUser)
  }

  const updateRole = (user, isStaff) => {
    const updatedUser = { ...user, is_staff: isStaff }
    updateUser(updatedUser)
  }

return (
  <section className="section">
    <div className="container">
      <h1 className="title is-4">User Manager</h1>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Display Name</th>
            <th>Full Name</th>
            <th>Active</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.display_name}</td>
              <td>{user.first_name} {user.last_name}</td>
              <td>
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={user.active}
                        onChange={() => toggleActive(user)}
                      />
                    </label>
                  </div>
                </div>
              </td>
              <td>
                <div className="field is-grouped">
                  <div className="control">
                    <label className="radio">
                      <input
                        type="radio"
                        name={`role-${user.id}`}
                        value="author"
                        checked={!user.is_staff}
                        onChange={() => updateRole(user, false)}
                      />
                      Author
                    </label>
                  </div>
                  <div className="control" style={{ marginLeft: "1rem" }}>
                    <label className="radio">
                      <input
                        type="radio"
                        name={`role-${user.id}`}
                        value="admin"
                        checked={user.is_staff}
                        onChange={() => updateRole(user, true)}
                      />
                      Admin
                    </label>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)

}
