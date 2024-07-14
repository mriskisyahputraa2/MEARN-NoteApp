import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "../../components/ToasMtessage/Toast";

const Home = () => {
  // state untuk mengatur tampilan modal tambah/edit
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNote, setAllNote] = useState([]); // state untuk mengambil semua data note
  const [userInfo, setUserInfo] = useState(null); // state untuk menyimpan informasi pengguna yang didapat dari server.
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

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
      // Mengirim permintaan GET ke endpoint "/get-all-note" menggunakan axiosInstance
      const response = await axiosInstance.get("/get-all-note");

      // Validasi, apakah respons memiliki properti 'data' dan 'notes'
      if (response.data && response.data.notes) {
        // Jika ada, simpan data notes ke state allNote
        setAllNote(response.data.notes);
      }
      // jika tidak,
    } catch (error) {
      // Menampilkan pesan error di konsol jika terjadi kesalahan
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // UsEffect, untuk pengambilan data
  useEffect(() => {
    // Memanggil fungsi getAllNotes untuk mendapatkan semua catatan
    getAllNotes();

    // Memanggil fungsi getUserInfo untuk mendapatkan informasi pengguna
    getUserInfo();

    // Fungsi pembersihan (tidak melakukan apa-apa di sini, tetapi disediakan untuk konsistensi)
    return () => {};
  }, []);

  return (
    <>
      {/* render, jika userInfo nya agar tidak null */}
      {userInfo && <Navbar userInfo={userInfo} />}

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {/* melakukan looping data dan ditampilkan di halaman Note Card */}
          {allNote.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags || []} // memastikan bahwa tags selalu berupa array untuk mencegah kesalahan.
              isPinned={item.isPinned}
              onEdit={() => {
                handleEdit(item);
              }}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Modal untuk Add Edit Note */}
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
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      {/* Toas Message */}
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
