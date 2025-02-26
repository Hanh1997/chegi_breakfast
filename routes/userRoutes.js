const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const orderController = require("../controllers/orderController");

// Route trang chủ
router.get('/', userController.getHomePage);

// Route xử lý form submit
router.post('/submit', userController.handleSubmit);

router.post("/send-order", orderController.sendOrderToTelegram);


module.exports = router;