import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";

const Home = () => {
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
        onClick={() => {}}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* import component edit notes */}
      <AddEditNotes />
    </>
  );
};

export default Home;
