const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const mysql = require('mysql');
const dbConfig = require('./DB/db');
const con = mysql.createConnection(dbConfig);

// check all items' epxpiration date every day
// and send a user e-mail notification 
// for test: every 1 min

//cron.schedule('20 * * * * *', () => {
console.log('running a task every 20 sec');
const today = new Date();
today.setDate(today.getDate() + 14);
const dateOfExpiration = today.toISOString().split('T')[0];

// expiringItems: obj
const expiringItems = checkExpirationDateOfAllItems(dateOfExpiration);



//});

function checkExpirationDateOfAllItems(dateOfExpiration) {
    console.log('dateOfexpiration : ', typeof dateOfExpiration);
    // to do: <= or =
    const sql = `SELECT * FROM food_tracker.items WHERE expiry_date='${dateOfExpiration}'`;

    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            console.log("rows: ", rows)
            return resolve(rows);
        });
    });
};

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
    const token = req.cookies.token || '';

    if (!token) {
        return res.status(401).send({ message: 'You need to log in.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(401).send({ message: "Invalid token." });
        }
    });
};

module.exports = { generateToken, verifyToken };