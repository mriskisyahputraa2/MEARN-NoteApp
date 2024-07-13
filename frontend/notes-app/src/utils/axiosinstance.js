import axios from "axios";
import { BASE_URL } from "./constants";

// membuat instance axios, dengan konfigurasi khusus
const axiosInstance = axios.create({
  baseURL: BASE_URL, // url localhost
  timeout: 10000, // menetapkan waktu 10 detik untuk setiap permintaan, jika lebih maka menghasilkan kesalahan timeout
  // menetapkan header default
  headers: {
    "Content-Type": "application/json", // semua pemintaan akan memiliki header yang diatur ke "application/json"
  },
});

// menambahkan interceptor yang akan dipanggil sebelum setiap permintaan(request) dikirim dan dijalankan(use)
axiosInstance.interceptors.request.use(
  // fungsi untuk menerima konfigurasi pemintaan sebagai argument. objek ini berisikan semua informasi temasuk URL,metode,header, dan data yang dikirim, ini dinamakan callbacks
  (config) => {
    const accessToken = localStorage.getItem("token"); //mendapatkan token acces dari localStorage

    // validasi, jika akses token ada
    if (accessToken) {
      // maka menambahkan header Authorization ke konfigurasi permintaan dengan nilai Bearer
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // kembalikan nilai config
    return config;
  },
  // jika tidak, maka menolak permintaan konfigurasi janji(Promise)
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
