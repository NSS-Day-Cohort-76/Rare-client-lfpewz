import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createNewPost } from "../../managers/PostManager.jsx";
  
  export const CreatePost = ({ setToken }) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const bio = useRef()
    const navigate = useNavigate()
  
    const [postError, setPostError] = useState("") // 🔥 for backend error messages
  
    const handleRegister = (e) => {
      e.preventDefault()
  
      if (password.current.value === verifyPassword.current.value) {
        // Example newPost dictionary in Python
          newPost = {
              "user_id": 1,                // Integer: ID of the user creating the post
              "category_id": 2,            // Integer: ID of the category
              "title": "Post Title",       // String: Title of the post
              "publication_date": "2025-06-17",  // String (ISO date): Publication date
              "image_url": "https://example.com/image.jpg",  // String: Image URL
              "content": "Post content",   // String: Content of the post
              "approved": 1                // Integer/bit: 1 for approved, 0 for not
          }
  
        createNewPost(newPost)
          .then(res => {
            if ("valid" in res && res.valid) {
              setToken(res.token)
              navigate("/")
            }
          })
          .catch(err => {
            // 👇 Show backend error (like duplicate username/email)
            if (err.error) {
              setPostError(err.error)
            } else {
              setPostError("Something went wrong. Please try again.")
            }
          })
      } else {
        passwordDialog.current.showModal()
      }
    }
  
    return (
      <section className="columns is-centered">
        <form className="column is-two-thirds" onSubmit={handleRegister}>
          <h1 className="title">Rare Publishing</h1>
          <p className="subtitle">Create an account</p>
  
          {/* 🔥 Display backend error if any */}
          {registerError && (
            <p className="help is-danger">{registerError}</p>
          )}
  
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input className="input" type="text" ref={firstName} />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input className="input" type="text" ref={lastName} />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input className="input" type="text" ref={username} />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" ref={email} />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Password</label>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input className="input" type="password" placeholder="Password" ref={password} />
                </p>
              </div>
  
              <div className="field">
                <p className="control is-expanded">
                  <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
                </p>
              </div>
            </div>
          </div>
  
          <div className="field">
            <label className="label">Bio</label>
            <div className="control">
              <textarea className="textarea" placeholder="Tell us about yourself..." ref={bio}></textarea>
            </div>
          </div>
  
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">Submit</button>
            </div>
            <div className="control">
              <Link to="/login" className="button is-link is-light">Cancel</Link>
            </div>
          </div>
  
          {/* Hidden dialog for password mismatch */}
          <dialog className="dialog dialog--auth" ref={passwordDialog}>
            <div>Password fields do not match</div>
            <button className="button" onClick={() => passwordDialog.current.close()}>Close</button>
          </dialog>
        </form>
      </section>
    )
  }
  
  
//   return (
//     <form>
//       <div class="field">
//         <label class="label">Name</label>
//         <div class="control">
//           <input class="input" type="text" placeholder="Text input" />
//         </div>
//       </div>

//       <div class="field">
//         <label class="label">Title</label>
//         <div class="control has-icons-left has-icons-right">
//           <input
//             class="input is-success"
//             type="text"
//             placeholder="Text input"
//             value="bulma"
//           />
//           <span class="icon is-small is-left">
//             <i class="fas fa-user"></i>
//           </span>
//           <span class="icon is-small is-right">
//             <i class="fas fa-check"></i>
//           </span>
//         </div>
//         <p class="help is-success">This username is available</p>
//       </div>

//       <div class="field">
//         <label class="label">image URL</label>
//         <div class="control has-icons-left has-icons-right">
//           <input
//             class="input is-danger"
//             type="email"
//             placeholder="Email input"
//             value="hello@"
//           />
//           <span class="icon is-small is-left">
//             <i class="fas fa-envelope"></i>
//           </span>
//           <span class="icon is-small is-right">
//             <i class="fas fa-exclamation-triangle"></i>
//           </span>
//         </div>
//         <p class="help is-danger">This URL is invalid</p>
//       </div>

//       <div class="field">
//         <label class="label">Article Content</label>
//         <div class="control">
//           <textarea class="textarea" placeholder="Textarea"></textarea>
//         </div>
//       </div>

//       <div class="field">
//         <label class="label">Category Select</label>
//         <div class="control">
//           <div class="select">
//             <select>
//               <option>Select Category</option>
//               <option>With options</option>
//               <option>With options</option>
//               <option>With options</option>
//               <option>With options</option>
//               <option>With options</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div class="field">
//         <div class="control">
//           <label class="checkbox">
//             <input type="checkbox" />
//             ❤️
//           </label>
//         </div>
//       </div>
//       <div class="field">
//         <div class="control">
//           <label class="checkbox">
//             <input type="checkbox" />
//             😂
//           </label>
//         </div>
//       </div>
//       <div class="field">
//         <div class="control">
//           <label class="checkbox">
//             <input type="checkbox" />
//             🔥
//           </label>
//         </div>
//       </div>
//       <div class="field">
//         <div class="control">
//           <label class="checkbox">
//             <input type="checkbox" />
//             😭
//           </label>
//         </div>
//       </div>

//       <div class="field is-grouped">
//         <div class="control">
//           <button class="button is-link">Submit</button>
//         </div>
//         <div class="control">
//           <button class="button is-link is-light">Cancel</button>
//         </div>
//       </div>
//     </form>
//   );
// };
