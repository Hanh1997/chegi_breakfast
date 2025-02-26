const axios = require("axios");

const TELEGRAM_BOT_TOKEN = "6748137268:AAFipIR5uX7T954HfNPuH47Gq2hvv74HP0k"; // Thay bằng Token của bạn
const TELEGRAM_CHAT_ID = "6184705478"; // Thay bằng Chat ID của người nhận

exports.sendOrderToTelegram = async (req, res) => {
    try {
        const { company,name, phone, address, menu, quantity, note,order_date } = req.body;
        const data = req.body;
        // Format tin nhắn
        const message = `
        📢 *ĐƠN HÀNG MỚI* 🚀  
        🏢 *Công ty:* ${company}  
        👤 *Khách hàng:* ${name}  
        📞 *SĐT:* ${phone}  
        📍 *Địa chỉ:* ${address}  
        🍽️ *Món ăn:* ${menu}  
        🔢 *Số lượng:* ${quantity}  
        📅 *Ngày đặt:* ${order_date}  
        📝 *Ghi chú:* ${note || "Không có"}  
        ✅ *Trạng thái:* Chờ xác nhận ⏳`;
        const res_google = await sendDataToGoogleSheet(data);
        if(res_google == "success")
        {
          res.json({ success: true, message: "Đặt đơn thành công!" });
          //Ngầm định gui sang tele
          await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        });
        }else
        {
          res.status(500).json({ success: false, message: `Lỗi khi gửi tin nhắn! ${res_google}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi gửi tin nhắn!", error });
    }
};
async function sendDataToGoogleSheet(orderData) {
    const url = "https://script.google.com/macros/s/AKfycbySMFMKRzFSjwW6VAYxHWNe4G6EMQWqiu1Fj7WEnskF9jb-CTtYymTwxjAaUEIQmzWpPg/exec"; // Thay bằng URL Web App
    try {
      const response = await axios.post(url, orderData, {
        headers: { "Content-Type": "application/json" } // Bắt buộc dùng JSON
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  }
