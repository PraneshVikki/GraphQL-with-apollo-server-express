const jwt = require('jsonwebtoken');

module.exports = (email, id, {req,res}) => {   
    const JWTToken = jwt.sign(
        { email: email, userId: id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    
    res.cookie('token', JWTToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax',
        maxAge: 3600000, 
        path: '/'
    });
    console.log(res.getHeaders());
    return JWTToken;
};