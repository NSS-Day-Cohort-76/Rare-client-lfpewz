


// THIS MODULE IS FOR DISPLAYING A SINGLE POST TO EDIT THAT CONTAINS USER AND CATEGORY DATA


// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { getPostById, updatePost } from "../../managers/PostManager.js"

// export const EditPost = () => {
//   const { postId } = useParams()
//   const navigate = useNavigate()

//   const [post, setPost] = useState({})

//   useEffect(() => {
//     getPostById(postId).then(setPost)
//       .catch((err) => console.error("Error loading post:", err))
//   }, [postId])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setPost(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     updatePost({ ...post, id: postId })
//       .then(() => {
//         navigate(`/posts/${postId}`)
//       })
//       .catch((err) => console.error("Error updating post:", err))
//   }

//   const handleCancel = () => {
//     navigate("/allposts")
//   }

//   return (
//     <section className="section">
//       <div className="container box">
//         <h1 className="title is-3 mb-5">Edit Post</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="field">
//             <label className="label">Title</label>
//             <div className="control">
//               <input
//                 className="input"
//                 type="text"
//                 name="title"
//                 value={post.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="field">
//             <label className="label">Content</label>
//             <div className="control">
//               <textarea
//                 className="textarea"
//                 name="content"
//                 value={post.content}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="field">
//             <label className="label">Category ID</label>
//             <div className="control">
//               <input
//                 className="input"
//                 type="number"
//                 name="category_id"
//                 value={post.category_id}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="field">
//             <label className="label">Image URL (optional)</label>
//             <div className="control">
//               <input
//                 className="input"
//                 type="text"
//                 name="image_url"
//                 value={post.image_url}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="buttons mt-5">
//             <button type="submit" className="button is-primary">Save</button>
//             <button type="button" className="button is-light" onClick={handleCancel}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </section>
//   )
// }
