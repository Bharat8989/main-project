const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/about'); // Redirect to login if not authenticated
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'default_secret'); // Use env variable in production
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.redirect('/about'); // Redirect if token is invalid
    }
};

module.exports = authenticateUser;
