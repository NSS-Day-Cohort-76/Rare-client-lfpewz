import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";

export const Login = ({ user, setUser }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  //const [token, setTokenState] = useState(localStorage.getItem('auth_token')) // pls don't break

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };


      // ...existing code...
      loginUser(user).then((res) => {
          console.log(res); // <-- Add this line
        if ("valid" in res && res.valid) {
          const userObj = {
            userId: res.user_id,    // from backend response
            isStaff: res.isStaff   // from backend response
          }
          setUser(userObj) // This updates state and localStorage
          navigate("/")    // Redirect after login
        } else {
          setIsUnsuccessful(true)
        }
      })}

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleLogin}>
        <h1 className="title">Rare Publishing</h1>
        <p className="subtitle">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">
              Cancel
            </Link>
          </div>
        </div>
        {isUnsuccessful ? (
          <p className="help is-danger">Username or password not valid</p>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};
