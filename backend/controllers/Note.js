// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body; // menangkap fullName, email, password dari permintaan request body

  // validasi
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  // memeriksan apakah email yang dikirim sudah terdaftar atau belum
  const isUser = await User.findOne({ email: email });

  // validasi, jika email sudah digunakan, maka tampilkan pesan
  if (isUser) {
    return res.json({
      error: true,
      message: "User already exits",
    });
  }

  // jika belum terdaftar, maka data user baru akan disimpan dalam database
  const user = User({
    fullName,
    email,
    password,
  });
  // menyimpan data user ke database
  await user.save();

  // membuat token JWT untuk "user" dengan kunci access token. token dibuat dengan fungsi jwt.sign
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m", // token akan expire dalam 6 jam
  });

  // jika berhasil tampilkan error, user, accessToken dan message
  return res.json({
    error: false,
    user,
    accessToken,
    message: "Register Successful",
  });
});

// Login Account
app.post("/login", async (req, res) => {
  const { email, password } = req.body; // mendapatkan email dan password dari yang dimasukkan pengguna

  // validasi
  if (!email) return res.status(400).json({ message: "Email is required" });

  if (!password)
    return res.status(400).json({ message: "Password is required" });

  // mencari informasi "user" melalui email
  const userInfo = await User.findOne({ email: email });

  // validasi, jika user tidak ditemukan, maka tampilkan message
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  // validasi, jika informasi email dan password nya sesuai
  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo }; // menyimpan "informasi user" didalam v-user

    // membuat token jwt untuk pengguna ketika berhasil login
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m", // expire token 6jam
    });

    // jika berhasil, tampilkan error, message, email, access token
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
    // jika tidak, tampilkan error dan message
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid Credentials" });
  }
});

// Add Notes, berdasarkan token jwt (authenticateToken)
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body; // mendapatkan data title, content, tags dari yang dimasukkan pengguna
  const { user } = req.user; // berisi data pengguna yang diesktrak dari token JWT

  // validasi, jika tidak lengkap data yang dimasukkan oleh pengguna
  if (!title) {
    return res.status(400).json({ erro: true, message: "Title is required" });
  }

  if (!content) {
    return res.status(400).json({ erro: true, message: "Content is required" });
  }

  // mencoba melakukan penambahan note ke database mongodb
  try {
    // membuat data yang berhasil dan sesuai dengan yang mau ditambahkan
    const note = new Note({
      title,
      content,
      tags: tags || [], // data yang dimasukkan akan array
      userId: user._id, // menampilkan id unik yang sudah login
    });

    // menyimpan data note ke database mongodb
    await note.save();

    // jika berhasil, tampilkan message berhasil
    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
    // jika gagal, tampilkan message gagal
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Edit Notes, berdasarkan id note dan berdasarkan authenticateToken
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId; // mengambil id note yang sudah ditambahkan ke database
  const { title, content, tags, isPinned } = req.body; // mendapatkan title, content, tags, isPinned sesuai yang dimasukkan pengguna
  const { user } = req.user; // mendapatkan token user

  // validasi, jika title, content, dan tags tidak ada, tampilkan error dan message
  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  // validasi
  try {
    // mecoba mencari note yang sudah ditambahka berdasarkan noteId dan userId
    const note = await Note.findOne({
      _id: noteId, // mendapatkan kode unik noteid
      userId: user._id, // mendapatkan id pengguna
    });

    // validasi, jika note nya tidak ada
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // jika note ditemukan, maka perbaharui data note nya berdasarkan yang dimintai dari database
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    // simpan data note yang sudah diupdate kedalam database
    await note.save();

    // jika berhasil, tampilkan error, note dan message
    return res.json({
      error: true,
      note,
      message: "Note updated successfully",
    });
    // jika gagal, maka tampilakn error, dan message
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Get All Notes, berdasarkan authenticateToken
app.get("/get-all-note", authenticateToken, async (req, res) => {
  const { user } = req.user; // mendapatkan informasi pengguna, melalui token

  // mencoba validasi
  try {
    // mencari semua data note sesuai dengan id user dan catatan yang ditemukan diurutkan berdasarkan properti isPinned secara menurun.
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    // response jika berhasil didapatkan semua data note
    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });

    // reponse jika gagal mendapatkan semua data note
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Delete Note, berdasarkan id note dan berdasarkan authenticateToken
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId; // mengambil nilai noteId dari parameter rute.
  const { user } = req.user; // mendapatkan informasi pengguna, melalui token

  // melakukan percobaan
  try {
    // mendapatkan data note berdasarkan id note dan id user
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    // validasi jika tidak ada note
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // jika ada note, maka hapus data note nya berdasarkan id note dan id user
    await note.deleteOne({ _id: noteId, userId: user._id });

    // kembalikan response berhasil
    return res.json({
      error: false,
      message: "Note deleted successfully",
    });

    // jika gagal kembalikan response gagal
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});
