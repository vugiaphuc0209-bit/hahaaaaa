require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('../routes'); // Dùng ../ để trỏ ra thư mục routes ở ngoài gốc

const app = express();
// Nạp module db (Node.js tự động tìm file index.js trong thư mục db)
const db = require('../config/db');

// Thực thi hàm kết nối
db.connect();
const port = 3000;

// 1. CẤU HÌNH HỆ THỐNG
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');

// Ghi đè phương thức HTTP thông qua tham số _method trên URL
app.use(methodOverride('_method'));
app.use(express.json());

// Template Engine (Handlebars)
app.engine('hbs', engine({ 
    extname: '.hbs',
    helpers: {
        dateFormat: (date, format) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        },
        eq: (a, b) => a === b
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 2. KHỞI TẠO ROUTES
route(app);

// 3. KHỞI CHẠY MÁY CHỦ
app.listen(port, () => {
    console.log(`\n🚀 Server đang chạy thành công tại: http://localhost:${port}`);
});