import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  // Mendeklarasikan state searchQuery untuk menyimpan query pencarian.
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };
  const handleSeacrh = () => {};

  // function, untuk mengatur searchQuery menjadi string kosong untuk membersihkan pencarian.
  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex item-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar
        value={searchQuery} // Menetapkan nilai input SearchBar ke state searchQuery dari Navbar
        // menerima setiap kali pengguna mengetik di input SearchBar.
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSeacrh={handleSeacrh}
        // untuk menghapus input pencarian dengan mengatur searchQuery menjadi string kosong.
        onClearSearch={onClearSearch}
      />

      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
