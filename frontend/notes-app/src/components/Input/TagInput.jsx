import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  // state untuk inputan yang dimasukkan pengguna
  const [inputValue, setInputValue] = useState("");

  // function untuk inputan yang dimasukkan pengguna nilainya berubah-ubah
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // fungsi add new tags
  const addNewTag = () => {
    // validasi, jika input yang dimasukkan tidak kosong. trim digunakan sebagai validasi spasi sebagai memastikan tidak berisi spasi kosong
    if (inputValue.trim() !== "") {
      // maka, tag baru akan ditambahakan ke array 'tags'
      setTags([...tags, inputValue.trim()]);
      setInputValue(""); // dan input value akan direset ke string kosong
    }
  };

  // function handleKeyDown
  const handleKeyDown = (e) => {
    //  jika tombol "Enter" ditekan
    if (e.key === "Enter") {
      addNewTag(); // maka tambahkan tag
    }
  };

  // function remove tags
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {/* validasi, jika tags memiliki panjang lebih dari 0, maka daftar tag akan ditampilkan */}
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {/* tampilkan hasilnya dengan tag span */}
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag); // button remove tag
                }}
              >
                {/* icons close (x) */}
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* input tags */}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        {/* icons + */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
