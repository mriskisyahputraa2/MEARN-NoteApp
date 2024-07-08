import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";

const Home = () => {
  return (
    <>
      {/* import component navbar */}
      <Navbar />

      <div className="container mx-auto">
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
    </>
  );
};

export default Home;
