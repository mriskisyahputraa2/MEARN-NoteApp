import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import { validateEmail } from "../../utils/helper.js";

const Login = () => {
  // definsi state, email dan password (string kosong), dan error nilai (null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // tombol form handleLogin
  const handleLogin = async (e) => {
    e.preventDefault();

    // validasi, jika email tidak ada
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // validasi, jika password tidak ada
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    // Login API Call
  };

  return (
    <>
      {/* import component navbar */}
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            {/* inputan */}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* file password di component input password */}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* jika email atau password tidak dimasukkan, munculkan error  */}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            {/* link kehalaman signUp */}
            <p className="text-sm text-center mt-4">
              Not registered yet{" "}
              <Link to="/signUp" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
