import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";

export const Login = ({ user, setUser }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);

  useEffect(() => {
    if (user?.id) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };

    loginUser(credentials).then((res) => {
      console.log("🔐 Login response:", res);

      if (res?.valid) {
        const userObj = {
          userId: res.user_id,
          id: res.user_id, // ensures compatibility with user.id usage
          isStaff: res.is_staff,
          valid: true,
        };

        // ✅ Save to state and localStorage
        setUser(userObj);
        localStorage.setItem("rare_user", JSON.stringify(userObj));
        console.log("✅ Logged in user:", userObj);

        navigate("/");
      } else {
        setIsUnsuccessful(true);
      }
    });
  };

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleLogin}>
        <h1 className="title">Rare Publishing</h1>
        <p className="subtitle">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} required />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} required />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-light">
              Cancel
            </Link>
          </div>
        </div>

        {isUnsuccessful && (
          <p className="help is-danger">Username or password not valid</p>
        )}
      </form>
    </section>
  );
};
