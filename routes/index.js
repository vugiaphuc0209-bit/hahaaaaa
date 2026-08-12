const siteRouter = require('./site');
const blogsRouter = require('./blog');

function route(app) {
    // Định tuyến cho bài viết (/blogs/create, /blogs/store, ...)
    app.use('/blogs', blogsRouter);

    // Mọi luồng truy cập cơ bản khác (/, /about, /search, /contact)
    app.use('/', siteRouter);
}

module.exports = route;