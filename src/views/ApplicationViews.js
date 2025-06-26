import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"

import { CreatePost } from "../components/posts/CreatePost.jsx"
import { EditPost } from "../components/posts/EditPost.jsx"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { DisplayAllPosts } from "../components/posts/DisplayAllPosts.jsx"
import { CategoryPosts } from "../components/categories/CategoryPosts.jsx"

import { TagManager } from "../components/tagmanager/TagManager.jsx"
import { CategoryManager } from "../components/categories/CategoryDetails.jsx"

import { CommentForm } from "../components/comments/CommentForm.jsx"

import { HomePageDisplay } from "../components/home/home.jsx"
import { DisplayMyPosts } from "../components/posts/DisplayMyPosts.jsx"
import { UserManager } from "../components/users/UserManager.jsx"
import { AdminDashboard } from "../components/admin/AdminDashboard.jsx"
import { UserProfile } from "../components/users/UserProfile.jsx"

export const ApplicationViews = ({ user, setUser }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />

      <Route element={<Authorized user={user} />}>
        {/* Default homepage route */}
        <Route path="/" element={<HomePageDisplay user={user} />} />

        {/* Post Routes */}
        <Route path="/allposts" element={<DisplayAllPosts user={user} />} />
        <Route path="/myposts" element={<DisplayMyPosts user={user} />} />
        <Route path="/createpost" element={<CreatePost user={user} />} />
        <Route path="/posts/:postId" element={<PostDetails user={user}/>} />
        <Route path="/posts/:postId/edit" element={<EditPost user={user}/>} />

        {/* Comment Form Routes */}
        <Route path="/posts/:postId/comments/new" element={<CommentForm />} />
        <Route path="/comments/:commentId/edit" element={<CommentForm />} />

        {/* Tag + Category Manager */}
        <Route path="/tagmanager" element={<TagManager user={user} />} />
        <Route path="/tagmanager/edittag/:id" element={<TagManager user={user} />} />
        <Route path="/categorymanager" element={<CategoryManager user={user} />} />
        <Route path="/categories/:categoryId/posts" element={<CategoryPosts />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/categorymanager/editcategory/:id" element={<TagManager user={user} />} />

        {/* User Profiles and Stuff - I believe route below is now obsolete and should be removved?*/}
        <Route path="/user-profiles" element={<UserManager user={user}/>} />
        {/* user profiles page below! */}
        <Route path="/users/:userId" element={<UserProfile />} />

        {/* Admin View for appoving/denying posts */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  )
}
