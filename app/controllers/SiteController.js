const Blog = require('../models/Blog');

class SiteController{
    // [GET] /
    index(req, res, next) {
        // Lấy danh sách, dùng .lean() để chuyển sang JS Object thuần
        Blog.find({}).lean()
            .then(blogs => {
                // Truyền biến 'blogs' sang file giao diện home.hbs
                res.render('home', { blogs: blogs });
            })
            .catch(error => next(error));
    }

    // [GET] /about
    about(req, res) {
        res.render('about');
    }

    // [GET] /contact
    contact(req, res) {
        res.render('contact');
    }

    // [GET] /search
    search(req, res) {
        console.log("Từ khóa tìm kiếm:", req.query.q);
        res.render('search');
    }
}

module.exports = new SiteController();