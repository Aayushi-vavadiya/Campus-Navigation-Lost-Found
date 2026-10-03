
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Check required fields
    if (!email || !password || (isRegister && !name)) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      // =========================
      // REGISTER
      // =========================
      if (isRegister) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Registration failed.");
          return;
        }

        alert("Registration successful! Please login.");

        // Clear all fields
        setName("");
        setEmail("");
        setPassword("");
        setShowPassword(false);

        // Switch to Login
        setIsRegister(false);

        return;
      }

      // =========================
      // LOGIN
      // =========================
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed.");
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Clear login fields
      setName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);

      alert("Login successful!");

      // Go to Home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Unable to connect to backend. Please make sure the backend is running."
      );
    }
  }

  function switchMode() {
    setIsRegister(!isRegister);

    // Clear fields when switching
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>
          {isRegister
            ? "Create Account"
            : "Welcome Back"}
        </h1>

        <p>
          {isRegister
            ? "Create your CampusConnect account"
            : "Login to your CampusConnect account"}
        </p>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
        >

          {/* NAME - REGISTER ONLY */}
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoComplete="off"
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            autoComplete="off"
          />

          {/* PASSWORD */}
          <div className="password-field">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
            />

            <span
              className="show-password-text"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </span>
          </div>

          {/* SUBMIT */}
          <button type="submit">
            {isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        {/* SWITCH LOGIN / REGISTER */}
        <p className="register-text">
          {isRegister
            ? "Already have an account? "
            : "Don't have an account? "}

          <span
            onClick={switchMode}
            style={{
              cursor: "pointer",
            }}
          >
            {isRegister
              ? "Login"
              : "Register"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
