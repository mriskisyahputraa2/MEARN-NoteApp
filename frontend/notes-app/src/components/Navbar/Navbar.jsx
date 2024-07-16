import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  // Mendeklarasikan state searchQuery untuk menyimpan query pencarian.
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // button logout
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // handle search
  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  // function, untuk mengatur searchQuery menjadi string kosong untuk membersihkan pencarian.
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar
        value={searchQuery} // Menetapkan nilai input SearchBar ke state searchQuery dari Navbar
        onChange={({ target }) => setSearchQuery(target.value)} // menerima setiap kali pengguna mengetik di input SearchBar.
        handleSearch={handleSearch}
        onClearSearch={onClearSearch} // untuk menghapus input pencarian dengan mengatur searchQuery menjadi string kosong.
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
