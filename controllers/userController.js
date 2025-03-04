const User = require('../models/userModel'); // Import Model

// Render trang chủ
const lst_food = [
    {"id":"1","itemname":"Trứng gà luộc","imgsrc":"/img/egg_luoc.png","price":4000,"shortdescription" : "Trứng gà tươi ngon, từ trang trại tự nhiên, giàu dinh dưỡng"},
    {"id":"2","itemname":"Trứng Vịt Lộn","imgsrc":"/img/trung_vit_lon.png","price":7000,"shortdescription" : "Trứng vịt lộn thượng hạng, chọn lọc kỹ càng đảm bảo chất lượng"},
    {"id":"3","itemname":"Bắp Ngô Luộc","imgsrc":"/img/corn_luoc.png","price":12000,"shortdescription" : "Bắp ngô luộc ngọt mát, bắp to trắng và hạt tròn,thơm phức"},
    {"id":"4","itemname":"Khoai Lang Luộc","imgsrc":"/img/khoai_luoc.png","price":12000,"shortdescription" : "Khoai lang bùi bùi, ngọt thơm, đậm đà hương vị tự nhiên"},
    {"id":"5","itemname":"Cafe muối","imgsrc":"/img/ca_phe_muoi.png","price":25000,"shortdescription" : "Cà phê đậm đà kết hợp vị mặn thơm ngon khó cưỡng"},
    {"id":"6","itemname":"Bạc xỉu","imgsrc":"/img/bac_xiu.png","price":25000,"shortdescription" : "Sữa béo ngậy hòa quyện cà phê, thơm ngon đến giọt cuối."},
    {"id":"7","itemname":"Sữa đậu nành fami","imgsrc":"/img/dau_nanh_fami.png","price":25000,"shortdescription" : "Đậu nành thơm béo, bổ dưỡng, tốt cho sức khỏe mỗi ngày."},
    {"id":"8","itemname":"Trà sữa thái","imgsrc":"/img/tra_sua_thai.png","price":25000,"shortdescription" : "Vị trà đậm đà, béo ngậy, ngọt thanh hấp dẫn mọi lúc."},
    {"id":"9","itemname":"Đen đá","imgsrc":"/img/den_da.png","price":25000,"shortdescription" : "Cà phê nguyên chất đậm vị, thơm nồng, sảng khoái từng ngụm."},
    {"id":"10","itemname":"Nâu đá","imgsrc":"/img/nau_da.png","price":25000,"shortdescription" : "Cà phê pha sữa đậm đà, béo thơm, hấp dẫn khó quên."}
]
exports.getHomePage = (req, res) => {
    res.render('Index', {lst_food});
};

// Xử lý form gửi dữ liệu AJAX
exports.handleSubmit = (req, res) => {
};