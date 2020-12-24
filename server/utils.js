const jtw = require('jsonwebtoken');

const generateToken = email => {
    if (!email) {
        return null;
    }

    const data = { email: email };
    const expiration = { expiresIn: process.env.JWT_EXPIRATION }
    const token = jtw.sign(data, process.env.JWT_SECRET, expiration);
    return token;
};


const verifyToken = async (req, res) => {
    const token = req.cookies.token || '';

    if (!token) {
        return res.status(401).send({ message: 'You need to log in.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(401).send({ message: "Invalid token." });
        }

        const user = user.email;
    });

};

module.exports = { generateToken, verifyToken };