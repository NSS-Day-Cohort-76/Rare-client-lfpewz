import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { CreatePost } from "../components/posts/CreatePost.jsx"
import { PostDetails } from "../components/posts/PostDetails.jsx"

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        <Route path="/createpost" element={<CreatePost token={token} />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Route>
    </Routes>
  )
}
