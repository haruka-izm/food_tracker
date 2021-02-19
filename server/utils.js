const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const dbConfig = require('./DB/db');
const { env } = require('process');
const con = mysql.createConnection(dbConfig);

// to do: delete test emails and
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
    // to do: <= or =
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
        return false;
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return false;
        }
    });

    return true;
};

module.exports = { generateToken, verifyToken };