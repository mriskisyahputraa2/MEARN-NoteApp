import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placehorder }) => {
  // state untuk show password, default is false
  const [isShowPassword, setisShowPassword] = useState(false);

  // function untuk melihat text pada password
  const toggleShowPassword = () => {
    setisShowPassword(!isShowPassword); // akan menjadi true
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value} // nilai input
        onChange={onChange} // fungsi untuk nilai input berubah
        type={isShowPassword ? "text" : "password"} // Jika true, tipe text (password ditampilkan), jika false, tipe password (password disembunyikan).
        placeholder={placehorder || "Password"} //  Teks placeholder, default ke "Password" jika placehorder tidak diinputkan, jika diinputkan maka text 'password' hilang
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {/* jika inputan password tidak dimasukkan, maka icons mata tertutup */}
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        // jika inputkan password dimasukkan, maka icons mata terbuka
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

export default PasswordInput;
