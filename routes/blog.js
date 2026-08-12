const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogControllers');

// Route tạo bài viết
router.get('/create', blogController.create);
router.post('/store', blogController.store);

// Route sửa bài viết (Lưu ý: tham số ID truyền vào URL)
router.get('/:id/edit', blogController.edit);
router.put('/:id', blogController.update);

// Route xóa bài viết
router.delete('/:id', blogController.destroy);

// Route xem chi tiết động luôn để dưới cùng
router.get('/:slug', blogController.show);

module.exports = router;