import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false); // Menambahkan state untuk pesan sukses
  const navigate = useNavigate();

  // validasi form
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError(""); // jika data sudah berhasil dimasukkan, jangan tampilkan pesan errornya

    // SignUp API

    try {
      // mengirim permintaan post ke endpoint "create-account"
      const response = await axiosInstance.post("create-account", {
        // dengan fullName, email dan password
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      // validasi, jika response data dan response data message ada
      if (response.data && response.data.message) {
        alert(response.data.message); // menampilkan pesan "register berhasil"
        navigate("/login"); // mengarahkan pengguna ke halaman login setelah berhasil register
      }
      // if (response.data && response.data.message === "Register Successful") {
      //   setSuccess(true); // Menampilkan pesan sukses
      //   setTimeout(() => {
      //     navigate("/login"); // Mengarahkan pengguna ke halaman login setelah 2 detik
      //   }, 2000);
      // }

      // if (response.data && response.data.error) {
      //   setError(response.data.message);
      //   return;
      // }

      // // validasi, jika response data dan response data access token ada
      // if (response.data && response.data.accessToken) {
      //   localStorage.setItem("token", response.data.accessToken); // token akan disimpan dalam localStorage dengan key "Token"
      //   navigate("/dashboard"); // setelah berhasil, maka pengguna akan dibawa kehalaman dashboard
      // }

      //  jika terjadi error selama autentikasi
    } catch (error) {
      // validasi, jika semua response error ini ada
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // maka pesan kesalahan dari server ditetapkan ke state error menggunakan fungsi setError.
        setError(error.response.data.message);
      } else {
        // jika tidak, maka tampilkan pesan "coba lagi"
        setError("An unexpected error occurred, Please try again.");
      }
    }
  };

  return (
    <>
      {/* import component navbar */}
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            {/* inputan */}
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* jika email atau password tidak dimasukkan, munculkan error  */}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            {/* link kehalaman signUp */}
            <p className="text-sm text-center mt-4">
              Already have an account{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
