const path = require("path"); // 🔥 Thêm dòng này để import path
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import route
const orderRoutes = require('./routes/orderRoutes'); // Import route

const app = express();
const port = 3000;

// Cấu hình middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình EJS để render View
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {res.render("Index");});
// Sử dụng route
app.use('/api', orderRoutes);

const SERVER_URL = "https://chegi-breakfast.onrender.com/"; // Thay bằng URL thực tế của bạn

// Ping server mỗi 10 phút để giữ nó không bị sleep
setInterval(async () => {
  try {
    const response = await axios.get(SERVER_URL);
    console.log(`Ping thành công: ${response.status} - Server vẫn chạy!`);
  } catch (error) {
    console.error("Ping thất bại:", error.message);
  }
}, 600000); // 600,000ms = 10 phút
// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
