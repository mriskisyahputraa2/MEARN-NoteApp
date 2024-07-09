import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {
  // state untuk mengatur modal
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      {/* import component navbar */}
      <Navbar />

      <div className="container mx-auto">
        {/* membuat halaman notes menjadi grid  */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {/* import component note card */}
          <NoteCard
            title="Meeting on 8th July"
            date="8rd July 2024"
            content="Meeting on 8th July Meeting on 8th July"
            tags="#Meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      {/* button tambah (+) */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        // Ketika button diklik, state openAddEditModal akan diperbarui untuk menampilkan modal dengan jenis operasi "add".
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", add: null });
        }}
      >
        {/* icons + */}
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* modal, manampilkan popup */}
      <Modal
        isOpen={openAddEditModal.isShown} //  Modal(Popup) akan tampil jika isShown adalah true
        onRequestClose={() => {}} // Modal untuk close popup
        // mengatur tampilan popup
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contenLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes />
      </Modal>

      {/* import component edit notes */}
      <AddEditNotes />
    </>
  );
};

export default Home;
