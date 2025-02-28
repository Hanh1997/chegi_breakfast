const axios = require("axios");
const session = require('express-session');
const TELEGRAM_BOT_TOKEN = "6748137268:AAFipIR5uX7T954HfNPuH47Gq2hvv74HP0k"; // Thay bằng Token của bạn
const TELEGRAM_CHAT_ID = "6184705478"; // Thay bằng Chat ID của người nhận

exports.sendOrderToTelegram = async (req, res) => {
    try {
        const dataList = req.body;
        for (let i = 0; i < dataList.length; i++) {
          await sendDataToGoogleSheet(dataList[i]);
          await new Promise(resolve => setTimeout(resolve, 10)); // Delay 100ms
      }

      return res.json({ success: true, message: "Đặt đơn thành công!" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi gửi tin nhắn!", error });
    }
};
async function sendDataToGoogleSheet(orderData) {
    const url = "https://script.google.com/macros/s/AKfycbzWmNBuQZyCc6P0J2w9PEDPbQGHhqaxmHDQJfLTSz92EcjmGLCTLemHwiNo_Hy3V7MJAA/exec"; // Thay bằng URL Web App
    try {
      const response = await axios.post(url, orderData, {
        headers: { "Content-Type": "application/json" } // Bắt buộc dùng JSON
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  }
