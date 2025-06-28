import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";
import"./loginEditorial.css"

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
    <section className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="form-title">Rare Publishing</h1>
        <p className="form-subtitle">Please sign in</p>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input className="form-input" type="text" ref={username} required />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            ref={password}
            required
          />
        </div>

        <div className="form-actions">
          <button className="button accent" type="submit">
            Submit
          </button>
          <Link to="/register" className="button outline">
            Cancel
          </Link>
        </div>

        {isUnsuccessful && (
          <p className="form-error">Username or password not valid</p>
        )}
      </form>
    </section>
  );
};
