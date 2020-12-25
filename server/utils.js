const jwt = require('jsonwebtoken');
const { nextTick } = require('process');

const generateToken = email => {
    if (!email) {
        return null;
    }

    const data = { email: email };
    const expiration = { expiresIn: process.env.JWT_EXPIRATION }
    const token = jwt.sign(data, process.env.JWT_SECRET, expiration);
    return token;
};


const verifyToken = async (req, res) => {
    console.log("verifyToken is called")
    const token = req.cookies.token || '';

    if (!token) {
        return res.status(401).send({ message: 'You need to log in.' });
    }

    console.log("0");
    console.log(`token: ${token}`);
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        console.log("1");
        if (error) {
            console.log("2");
            return res.status(401).send({ message: "Invalid token." });
        }
        console.log("3");

        //const user = user.email;
    });
    // to do: return what?

};

module.exports = { generateToken, verifyToken };