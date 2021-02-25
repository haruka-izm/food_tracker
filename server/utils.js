const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const dbConfig = require('./DB/db');
const { env } = require('process');
const con = mysql.createConnection(dbConfig);


const generateToken = id => {
    if (!id) {
        return null;
    };

    const data = { userID: id };
    const expiration = { expiresIn: process.env.JWT_EXPIRATION };
    const token = jwt.sign(data, process.env.JWT_SECRET, expiration);
    return token;
};


const verifyToken = async (req, res) => {
    const token = req.cookies['token'] || '';
    if (!token) {
        return false;
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return false;
        }
    });

    return true;
};

const clearToken = (res) => {
    try {
        res.clearCookie('token');
        return res.status(204).send();
    } catch {
        return res.status(401).send({ message: 'Failed to log out' });
    }
};

const findByEmail = (email) => {
    const sql = `SELECT * FROM food_tracker.users WHERE email="${email}"`;

    return new Promise((resolve, reject) => {
        con.query(sql, (error, result) => {
            if (error) {
                reject("ERROR");
            }
            if (result.length > 0) {
                resolve(result);
            }
            resolve("NOT FOUND");
        });
    });
};

const createNewUser = async (email, password, username) => {
    const result = await findByEmail(email);

    if (result == "FOUND") {
        return 'FAILED';
    }

    const encryptedPW = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO food_tracker.users (email, username, password) VALUES ("${email}", "${username}", "${encryptedPW}")`;

    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
            if (err) {
                return reject(`ERROR: ${err}`);
            }
            return resolve("CREATED");
        });
    });
};


// todo: delete test emails and
// give instruction to add a user's email

// check all items' epxpiration date every day
// and send a user email notifying what items are expiring
cron.schedule('* 23 * * *', async () => {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    const dateOfExpiration = today.toISOString().split('T')[0];

    const expiringItems = await checkExpirationDateOfAllItems(dateOfExpiration);
    if (expiringItems.length != 0) {
        let content = 'Expiring food is:\n';
        expiringItems.forEach(item => {
            content += `${item.name}\n`;
        });

        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_SENDER,
                pass: process.env.MAIL_SENDER_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MAIL_SENDER,
            to: process.env.MAIL_RECEIVER,
            subject: 'Notification: expiring food lists',
            text: content
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
});

function checkExpirationDateOfAllItems(dateOfExpiration) {
    const sql = `SELECT * FROM food_tracker.items WHERE expiry_date='${dateOfExpiration}'`;

    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(rows);
        });
    });
};



module.exports = { generateToken, verifyToken, clearToken, findByEmail, createNewUser };