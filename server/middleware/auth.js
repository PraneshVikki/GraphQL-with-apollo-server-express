const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = (req, res, next) => {
        const token = req.cookies.token;
        console.log("token");
        console.log(token);
        console.log(res.getHeaders()['set-cookie'])
        if (!token) {
            console.log("no token");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userData = decoded;
            next();
        } catch (error) {
            console.log("error");
        }
    
};