import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosinstance";

const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note (dideklarasikan di luar blok try)
  const editNote = async () => {
    // Implementasi edit note sesuai kebutuhan Anda
  };

  // function handleAddNote
  const handleAddNote = () => {
    // validasi
    if (!title) {
      setError("Please enter a title");
      return;
    }
    if (!content) {
      setError("Please enter a content");
      return;
    }
    setError("");

    // validasi jika type === "edit"
    if (type === "edit") {
      editNote(); // maka edit data note
    } else {
      addNewNote(); // jika tidak, maka tambahkan note
    }
    console.log(handleAddNote);
  };
  return (
    <>
      <div className="relative">
        {/* button close */}
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
          onClick={onClose}
        >
          {/* icons (x) */}
          <MdClose className="text-xl text-slate-400" />
        </button>
        {/* title */}
        <div className="flex flex-col gap-2">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="Go To Gym At 5"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        {/* content */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">CONTENT</label>
          <textarea
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            type="text"
            placeholder="Content"
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        {/* tags */}
        <div className="mt-3">
          <label className="input-label">TAGS</label>
          {/* import component tag input, dengan 2 parameter tags dan setTags */}
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {/* pesan error */}
        {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
        {/* buttons add */}
        <button
          className="btn-primary font-medium mt-5 p-3"
          onClick={handleAddNote}
        >
          ADD
        </button>
      </div>
    </>
  );
};

export default AddEditNotes;
