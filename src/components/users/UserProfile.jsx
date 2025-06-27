import { useParams } from "react-router-dom"

export const UserProfile = () => {
  const { userId } = useParams()
  return (
    <section className="section">
      <div className="container has-text-centered">
        <h2 className="title">User Profile</h2>
        <p>User ID: {userId}</p>
        {/* You can fetch and display more user info here later */}
      </div>
    </section>
  )
}