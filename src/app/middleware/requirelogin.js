const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.username) {
        // Nếu không có session hoặc session không chứa username, chuyển hướng đến trang đăng nhập
        return res.redirect('/login');
    }
    // Nếu đã đăng nhập, tiếp tục xử lý
    next();
};

module.exports = requireLogin;