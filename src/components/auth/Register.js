import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import"./registerEditorial.css"

export const Register = ({ setUser }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState(""); // 🔥 for backend error messages

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
      };

      registerUser(newUser)
        .then((res) => {
          if ("valid" in res && res.valid) {
            const userObj = {
              id: res.user_id, // match backend response
              isStaff: res.is_staff,
              valid: true,
            };
            setUser(userObj);
            navigate("/");
          }
        })
        .catch((err) => {
          // 👇 Show backend error (like duplicate username/email)
          if (err.error) {
            setRegisterError(err.error);
          } else {
            setRegisterError("Something went wrong. Please try again.");
          }
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleRegister}>
        <h1 className="form-title">Rare Publishing</h1>
        <p className="form-subtitle">Create an account</p>

        {registerError && <p className="form-error">{registerError}</p>}

        <div className="form-group">
          <label className="form-label">First Name</label>
          <input className="form-input" type="text" ref={firstName} />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input className="form-input" type="text" ref={lastName} />
        </div>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input className="form-input" type="text" ref={username} />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" ref={email} />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            ref={password}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Verify Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Verify Password"
            ref={verifyPassword}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea
            className="form-textarea"
            placeholder="Tell us about yourself..."
            ref={bio}
          ></textarea>
        </div>

        <div className="form-actions">
          <button className="button accent" type="submit">
            Submit
          </button>
          <Link to="/login" className="button outline">
            Cancel
          </Link>
        </div>

        <dialog className="dialog" ref={passwordDialog}>
          <div>Password fields do not match</div>
          <button
            className="button"
            onClick={() => passwordDialog.current.close()}
          >
            Close
          </button>
        </dialog>
      </form>
    </section>
  );
};
