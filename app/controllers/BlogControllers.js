const Blog = require('../models/Blog');

class BlogController {
    // [GET] /blogs/create (Hiển thị form tạo bài viết)
    create(req, res, next) {
        res.render('blogs/create');
    }

    // [POST] /blogs/store (Lưu bài viết mới vào DB)
    store(req, res, next) {
        const blog = new Blog(req.body);
        blog.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    // [GET] /blogs/:slug (Xem chi tiết bài viết)
    show(req, res, next) {
        // req.params.slug sẽ lấy giá trị từ thanh URL
        Blog.findOne({ slug: req.params.slug }).lean()
            .then(blog => {
                // Render file detail.hbs và truyền data vào biến 'blog'
                res.render('detail', { blog: blog });
            })
            .catch(next);
    }

    // [GET] /blogs/:id/edit (Hiển thị form chỉnh sửa)
    edit(req, res, next) {
        // Tìm bài viết theo ID lấy từ URL
        Blog.findById(req.params.id).lean()
            .then(blog => res.render('edit', { blog: blog }))
            .catch(next);
    }

    // [PUT] /blogs/:id (Cập nhật bài viết)
    update(req, res, next) {
        // Tham số 1: Điều kiện tìm kiếm (Tìm theo _id)
        // Tham số 2: Dữ liệu mới (Lấy toàn bộ từ req.body)
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/')) // Sửa xong quay về Trang chủ
            .catch(next);
    }

    // [DELETE] /blogs/:id (Xóa bài viết)
    destroy(req, res, next) {
        Blog.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back')) // Xóa xong tải lại trang hiện tại
            .catch(next);
    }
}

module.exports = new BlogController();