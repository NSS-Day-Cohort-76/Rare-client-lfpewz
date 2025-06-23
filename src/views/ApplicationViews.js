import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"

import { CreatePost } from "../components/posts/CreatePost.jsx"
import { EditPost } from "../components/posts/EditPost.jsx"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { DisplayAllPosts } from "../components/posts/DisplayAllPosts.jsx"

import { TagManager } from "../components/tagmanager/tagmanager.jsx"
import { CategoryManager } from "../components/categories/CatgeoryDetails.jsx"

import { CommentForm } from "../components/comments/CommentForm.jsx"

import { HomePageDisplay } from "../components/home/home.jsx"

export const ApplicationViews = ({ user, setUser }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />

      <Route element={<Authorized user={user} />}>
        {/* Default homepage route */}
        <Route path="/" element={<HomePageDisplay user={user} />} />
        <Route path="/allposts" element={<DisplayAllPosts user={user} />} />

        {/* Post Routes */}
        <Route path="/createpost" element={<CreatePost user={user} />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/posts/:postId/edit" element={<EditPost />} />

        {/* Comment Form Routes */}
        <Route path="/posts/:postId/comments/new" element={<CommentForm />} />
        <Route path="/comments/:commentId/edit" element={<CommentForm />} />

        {/* Tag + Category Manager */}
        <Route path="/tagmanager" element={<TagManager user={user} />} />
        <Route path="/tagmanager/edittag/:id" element={<TagManager user={user} />} />
        <Route path="/categorymanager" element={<CategoryManager user={user} />} />
        <Route path="/categorymanager/editcategory/:id" element={<TagManager user={user} />} />
      </Route>
    </Routes>
  )
}
