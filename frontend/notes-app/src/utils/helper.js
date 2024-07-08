export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  //  validasi, jika nama tidak ada maka kembalikan string kosong
  if (!name) return "";

  // jika ada, string nama berdasarkan spasi(split), menghasilkan array kata-kata (Muhammad Rizki) == (MR)
  const words = name.split(" ");
  let initials = ""; // variabel untuk menyimpan inisial yang akan dibentuk

  // validasi looping, jika i lebih kecil dari minimal word length 2, maka lakukan looping (mengambil maksimal dua kata pertama)
  for (let i = 0; i < Math.min(words.length, 3); i++) {
    initials += words[i][0]; // mengambil karakter pertama dari kata ke-[i] dalam array 'word' dan menambahkannya ke variabel 'initials'.
  }
  return initials.toUpperCase(); // dan tampilkan dengan huruf yang sudah menjadi kapital
};
