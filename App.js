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
app.get("/", (req, res) => {res.render("index");});
// Sử dụng route
app.use('/api', orderRoutes);

// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
