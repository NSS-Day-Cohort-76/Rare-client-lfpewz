import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { CreatePost } from "../components/posts/CreatePost.jsx"
import { TagManager } from "../components/tagmanager/tagmanager.jsx"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { EditPost } from "../components/posts/EditPost.jsx"
import { DisplayAllPosts } from "../components/posts/DisplayAllPosts.jsx"
import { CategoryManager } from "../components/categories/CatgeoryDetails.jsx"


export const ApplicationViews = ({ user, setUser }) => {
  return (
    <Routes>

      <Route path="/login" element={<Login user={user} setUser={setUser} />}  />
      <Route path="/register" element={<Register setUser={setUser} />}  />
      <Route element={<Authorized user={user} />}>
        {/* Add Routes here */}
        <Route path="/allposts" element={<DisplayAllPosts user={user} />} />
        <Route path="/createpost" element={<CreatePost user={user} />} />
        <Route path="/categorymanager" element={< CategoryManager user={user} />} />
        <Route path="/categorymanager/editcategory/:id" element={<TagManager user={user} />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/tagmanager" element={<TagManager user={user} />} />
        <Route path="/tagmanager/edittag/:id" element={<TagManager user={user} />} />
        <Route path="/posts/:postId/edit" element={<EditPost />} />
      </Route>
    </Routes>
  )
}
