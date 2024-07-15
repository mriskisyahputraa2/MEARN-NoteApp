import React, { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { LuCheck } from "react-icons/lu";

const Toast = ({ isShown, message, type, onClose }) => {
  // membuat timer dengan 'setTimeout' yang akan memanggil 'onClose' setelah 3 detik.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    // mengembalikan fungsi cleanup untuk menghapus timer jika komponen di-unmount atau 'onClose' berubah.
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    //  Mengatur posisi dan transisi opacity berdasarkan isShown.
    <div
      className={`fixed top-20 right-6 transition-opacity duration-400 ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      {/*  Menampilkan konten toast dengan warna dan ikon yang sesuai berdasarkan type. */}
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md relative ${
          type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
        } after:w-[5px] after:h-full after:absolute after:left-0 after:top-0 after:rounded-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {/* jika type "delete", ikon akan red */}
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              // jika type "success", ikon akan green
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          {/* menampilkan pesan */}
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
