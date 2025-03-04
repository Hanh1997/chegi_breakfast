const path = require("path"); // 🔥 Thêm dòng này để import path
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import route
const orderRoutes = require('./routes/orderRoutes'); // Import route
const session = require('express-session');

const app = express();
const port = 3000;
const lst_food = [
    {"id":"1","itemname":"Trứng gà luộc","imgsrc":"/img/egg_luoc.png","price":4000,"shortdescription" : "Trứng gà tươi ngon, từ trang trại tự nhiên, giàu dinh dưỡng"},
    {"id":"2","itemname":"Trứng Vịt Lộn","imgsrc":"/img/trung_vit_lon.png","price":7000,"shortdescription" : "Trứng vịt lộn thượng hạng, chọn lọc kỹ càng đảm bảo chất lượng"},
    {"id":"3","itemname":"Bắp Ngô Luộc","imgsrc":"/img/corn_luoc.png","price":12000,"shortdescription" : "Bắp ngô luộc ngọt mát, bắp to trắng và hạt tròn,thơm phức"},
    {"id":"4","itemname":"Khoai Lang Luộc","imgsrc":"/img/khoai_luoc.png","price":12000,"shortdescription" : "Khoai lang bùi bùi, ngọt thơm, đậm đà hương vị tự nhiên"},
    {"id":"5","itemname":"Cafe muối","imgsrc":"/img/ca_phe_muoi.jpg","price":25000,"shortdescription" : "Cà phê đậm đà kết hợp vị mặn thơm ngon khó cưỡng"},
    {"id":"6","itemname":"Bạc xỉu","imgsrc":"/img/bac_xiu.png","price":25000,"shortdescription" : "Sữa béo ngậy hòa quyện cà phê, thơm ngon đến giọt cuối."},
    {"id":"7","itemname":"Sữa đậu nành fami","imgsrc":"/img/dau_nanh_fami.png","price":25000,"shortdescription" : "Đậu nành thơm béo, bổ dưỡng, tốt cho sức khỏe mỗi ngày."},
    {"id":"8","itemname":"Trà sữa thái","imgsrc":"/img/tra_sua_thai.png","price":25000,"shortdescription" : "Vị trà đậm đà, béo ngậy, ngọt thanh hấp dẫn mọi lúc."},
    {"id":"9","itemname":"Đen đá","imgsrc":"/img/den_da.png","price":25000,"shortdescription" : "Cà phê nguyên chất đậm vị, thơm nồng, sảng khoái từng ngụm."},
    {"id":"10","itemname":"Nâu đá","imgsrc":"/img/nau_da.png","price":25000,"shortdescription" : "Cà phê pha sữa đậm đà, béo thơm, hấp dẫn khó quên."}
]

app.use(express.static('public'));
// Cấu hình middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình EJS để render View
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');

// Sử dụng route
app.use('/', userRoutes);
app.use('/api', orderRoutes);

// Cấu hình session
app.use(session({
    secret: 'chegi20222@',   // 🔑 Khóa bí mật
    resave: false,                // Không lưu lại nếu không thay đổi
    saveUninitialized: true,      // Tạo session ngay cả khi chưa có dữ liệu
    cookie: { maxAge: 86400000 }   // 🍪 Session tồn tại 1 ngày (1 ngày = 86400000 ms)
}));

// API kiểm tra session ID của khách hàng
app.get('/session-id', (req, res) => {
    res.json({ sessionID: req.sessionID });
});

// API thêm sản phẩm vào giỏ hàng
app.post('/add-to-cart', (req, res) => {
    const { id, itemname, price,imgsrc } = req.body;
    if (!req.session.cart) {
        req.session.cart = [];
    }

    let cart = req.session.cart;
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, itemname, price,imgsrc, quantity: 1 });
    }
    req.session.cart = cart;
    res.json({ message: '🛒 Đã thêm vào giỏ hàng!', sessionID: req.sessionID, cart });
});

// API lấy giỏ hàng
app.get('/get-cart', (req, res) => {
    res.json({ sessionID: req.sessionID, cart: req.session.cart || [] });
});

// API xóa giỏ hàng
app.get('/clear-all-cart', (req, res) => {
    req.session.cart = [];
    res.json({ message: '🗑 Giỏ hàng đã được làm trống!' });
});

// API xóa giỏ hàng
app.post('/remove-from-cart', (req, res) => {
    const { id, quantity } = req.body; // Nhận ID và số lượng cần xóa

    if (!req.session.cart || req.session.cart.length === 0) {
        return res.json({ message: '🛒 Giỏ hàng trống!' });
    }

    let cart = req.session.cart;
    let itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.json({ message: '❌ Sản phẩm không có trong giỏ hàng!' });
    }

    // Nếu số lượng truyền vào lớn hơn số lượng hiện tại -> xóa hẳn sản phẩm
    if (quantity >= cart[itemIndex].quantity) {
        cart.splice(itemIndex, 1);
    } else {
        cart[itemIndex].quantity -= quantity; // Giảm theo số lượng truyền vào
    }

    req.session.cart = cart;
    //res.redirect('/');
    return res.json({ message: '🗑 Đã cập nhật giỏ hàng!', cart });
});

//View định nghĩa

app.get('/get-list-items', (req, res) => {
    res.json(lst_food);
});

app.get('/my-shop-cart', (req, res) => {
    var lst_cart = req.session.cart;
    let total_price = lst_cart == null ? 0 : lst_cart.reduce((sum, item) => sum + item.quantity*item.price, 0);
    res.render('cart',{lst_cart,total_price}); // about.ejs phải có trong thư mục views
});

app.get('/order', (req, res) => {
    var lst_cart = req.session.cart;
    let total_price = lst_cart == null ? 0 : lst_cart.reduce((sum, item) => sum + item.quantity*item.price, 0);
    res.render('order',{lst_cart,total_price}); // about.ejs phải có trong thư mục views
});

// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
