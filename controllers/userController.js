const User = require('../models/userModel'); // Import Model

// Render trang chủ
exports.getHomePage = (req, res) => {
    res.render('index', { message: null });
};

// Xử lý form gửi dữ liệu AJAX
exports.handleSubmit = (req, res) => {
    const { name, phone } = req.body;
    console.log(`Nhận dữ liệu: Name = ${name}, Age = ${phone}`);

    // Giả lập lưu vào database (ở đây chỉ in ra console)
    User.saveUser(name, age);

    // Trả về phản hồi JSON
    res.json({ message: `Chào ${name}, bạn ${phone} tuổi!` });
};
