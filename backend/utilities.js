const jwt = require("jsonwebtoken"); // import jsonwebtoken

// Fungsi middleware authenticateToken, untuk memeriksa apakah permintaan HTTP (HTTP request) memiliki token JWT yang valid.
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Mengambil header otorisasi dari objek req.headers
  const token = authHeader && authHeader.split(" ")[1]; // memeriksa apakah authheader ada? jika ada pisahkan string spasi dn ambil tokennya,

  // jika tidak ada maka send status 401(Unauthorized)
  if (!token) return res.sendStatus(401);

  // jika ada, verifikasi token dengan mencocokkan access token secret
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // jika ada error pada verifikasi jwt, maka send status 401(Unauthorized)
    if (err) return res.sendStatus(401);
    req.user = user; //jika berhasil simpan token user
    next(); // lanjut ke halaman eksekusi selanjutnya
  });
}

module.exports = {
  authenticateToken,
};
