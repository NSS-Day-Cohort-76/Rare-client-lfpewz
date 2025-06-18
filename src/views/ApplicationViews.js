import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { CreatePost } from "../components/posts/CreatePost.jsx"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { EditPost } from "../components/posts/EditPost.jsx"
import { DisplayAllPosts } from "../components/posts/DisplayAllPosts.jsx"
import { TagManager } from "../components/tagmanager/tagmanager.jsx"

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route path="/createpost" element={<CreatePost token={token} />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/posts/:postId/edit" element={<EditPost />} />
        <Route path="/allposts" element={<DisplayAllPosts token={token} />} />
        <Route path="/tagmanager" element={<TagManager token={token} />} />
      </Route>
    </Routes>
  )
}
