const User = require('../models/userModel'); // Import Model

// Render trang chủ
const lst_food = [
    {"id":"1","itemname":"Trứng gà luộc","imgsrc":"/img/egg_luoc.png","price":4000,"shortdescription" : "Trứng gà ta tươi ngon, từ những trang trại tự nhiên, giàu dinh dưỡng"},
    {"id":"2","itemname":"Trứng Vịt Lộn","imgsrc":"/img/egg_lon.png","price":7000,"shortdescription" : "Trứng vịt lộn thượng hạng, chọn lọc kỹ càng đảm bảo chất lượng"},
    {"id":"3","itemname":"Bắp Ngô Luộc","imgsrc":"/img/corn_luoc.png","price":12000,"shortdescription" : "Bắp ngô luộc ngọt mát, bắp to trắng và hạt tròn,thơm phức"},
    {"id":"4","itemname":"Khoai Lang Luộc","imgsrc":"/img/khoai_luoc.png","price":12000,"shortdescription" : "Khoai lang bùi bùi, ngọt thơm, đậm đà hương vị tự nhiên"}

]
exports.getHomePage = (req, res) => {
    res.render('index', {lst_food});
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
