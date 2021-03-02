const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const dbConfig = require('./DB/db');
const { env } = require('process');
const con = mysql.createConnection(dbConfig);


const ITEM_NOT_FOUND_MSG = "Item not found.";
const UPDATED_MSG = "Item data was updated.";
const DELETED_MSG = "Item was deleted from the database.";


const generateToken = (id) => {
    if (!id) {
        return null;
    };

    const data = { userID: id };
    const expiration = { expiresIn: process.env.JWT_EXPIRATION };
    const token = jwt.sign(data, process.env.JWT_SECRET, expiration);
    return token;
};


const verifyToken = async (req) => {
    const token = req.cookies['token'] || '';
    if (!token) {
        return false;
    };

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return false;
        };
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

const getUserId = (req) => {
    const token = req.cookies['token'];
    const decoded = jwt.decode(token);
    return decoded.userID;
};

const findUserByEmail = (email) => {
    const sql = `SELECT * FROM food_tracker.users WHERE email="${email}"`;

    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                reject({ found: null, data: error });
            }
            if (rows.length > 0) {
                resolve({ found: true, data: rows });
            }
            resolve({ found: false });
        });
    });
};

const createNewUser = async (email, password, username) => {
    const result = await findUserByEmail(email);

    if (result == "FOUND") {
        return { result: 'FAILED' };
    }

    const encryptedPW = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO food_tracker.users (email, username, password) VALUES ("${email}", "${username}", "${encryptedPW}")`;

    return new Promise((resolve, reject) => {
        con.query(sql, function (err, row) {
            if (err) {
                return reject({ result: 'ERROR', msg: err });
            };
            return resolve({ result: "CREATED", id: row.insertId });
        });
    });
};

const findUserById = (id) => {
    const sql = `SELECT * FROM food_tracker.users WHERE id=${id}`;

    return new Promise((resolve, reject) => {
        con.query(sql, (err, row) => {
            if (err) {
                return reject({ found: false, msg: err });
            };
            return resolve({ found: true, data: row[0] });
        })
    })
};


const findItemById = (id) => {
    const sql = `SELECT * FROM food_tracker.items WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            if (rows[0] == undefined) {
                return resolve({ found: false, data: ITEM_NOT_FOUND_MSG });
            }
            return resolve({ found: true, data: rows[0] });
        });
    });
};


const addItem = (newItem) => {
    const { name, quantity, purchased_date, expiry_date, category } = newItem;
    const num = parseInt(quantity);
    const sql = `INSERT INTO food_tracker.items (name, quantity, purchased_date, expiry_date, category) VALUES ('${name}', ${num}, '${purchased_date}', '${expiry_date}', '${category}')`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve({ 'added': true, 'id': row.insertId });
        });
    });
};


const updateItemData = (id, itemInfo) => {
    const { name, quantity, purchased_date, expiry_date, category } = itemInfo;
    const num = parseInt(quantity);
    const sql = `UPDATE food_tracker.items SET name="${name}", quantity=${num}, purchased_date="${purchased_date}", expiry_date="${expiry_date}", category="${category}" WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve(UPDATED_MSG);
        });
    });
};


const deleteItem = (id) => {
    const sql = `DELETE FROM food_tracker.items WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject(error);
            }
            return resolve(DELETED_MSG);
        });
    });
}



const getItems = (limit, offset) => {
    const sql = `SELECT * FROM food_tracker.items LIMIT ${limit} OFFSET ${offset}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            if (rows[0] == undefined) {
                return resolve(ITEM_NOT_FOUND_MSG);
            }

            rows.forEach(row => {
                row.id = `http://localhost:8080/api/items/${row.id}`;
            });

            return resolve(rows);
        });
    });
};

const getNumOfAllItems = () => {
    const sql = "SELECT COUNT(*) as TotalCount from food_tracker.items";

    return new Promise((resolve, reject) => {
        con.query(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            if (rows[0] == undefined) {
                return resolve(ITEM_NOT_FOUND_MSG);
            }

            const numberOfRows = rows[0].TotalCount;
            return resolve(numberOfRows);
        });
    });
};




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

const checkExpirationDateOfAllItems = (dateOfExpiration) => {
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



module.exports = {
    generateToken,
    verifyToken,
    clearToken,

    findUserByEmail,
    findUserById,
    findItemById,
    createNewUser,
    getUserId,
    getItems,
    getNumOfAllItems,
    addItem,
    updateItemData,
    deleteItem
};