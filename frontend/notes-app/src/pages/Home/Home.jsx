import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import moment from "moment";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

const Home = () => {
  // state untuk mengatur tampilan modal tambah/edit
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNote, setAllNote] = useState([]); // state untuk mengambil semua data note
  const [userInfo, setUserInfo] = useState(null); // state untuk menyimpan informasi pengguna yang didapat dari server.
  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user"); // mendapatkan informasi pengguna dari endpoint "/get-user."

      // validasi, jika response data pengguna ada
      if (response.data && response.data.user) {
        setUserInfo(response.data.user); // maka tampikan
      }
      // jika terjadi error
    } catch (error) {
      // validasi, jika tidak ada data penggunanya, maka response status 401(Unauthorized)
      if (error.response.status === 401) {
        localStorage.clear(); // bersihkan localStoragenya
        navigate("/login"); // arahkan pengguna kembali kehalaman login
      }
    }
  };

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-note");
      console.log(response);
      if (response.data && response.data.notes) {
        setAllNote(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // useEffet, maninpulasi data getUserInfo
  useEffect(() => {
    getAllNotes();
    getUserInfo(); // Memanggil getUserInfo sekali saat komponen pertama kali dirender (karena array dependensi kosong []).
    return () => {};
  }, []);

  return (
    <>
      {/* render, jika userInfo nya agar tidak null */}
      {userInfo && <Navbar userInfo={userInfo} />}

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNote.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags || []} // Pastikan tags adalah array
              isPinned={item.isPinned}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", add: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contenLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
