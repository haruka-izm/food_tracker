const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const dbConfig = require('./DB/db');
const { env } = require('process');
const con = mysql.createConnection(dbConfig);

const UPDATED_MSG = "Item data was updated.";
const ITEM_NOT_FOUND_MSG = "Item not found.";
const DELETED_MSG = "Item was deleted from the database.";
const USER_NOT_FOUND_MSG = "User not found.";

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

    let data = {};
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            data['msg'] = false;
        };
        data['msg'] = true;
        data['userId'] = decoded.userID;
    });

    return data;
};

const clearToken = (res) => {
    try {
        res.clearCookie('token');
        return res.status(204).send();
    } catch {
        return res.status(401).send({ message: 'Failed to log out' });
    }
};


const setCookie = (res, token) => {
    const GMTcurrentTime = new Date();


    // to EDT and expires in 1 day
    GMTcurrentTime.setDate(GMTcurrentTime.getDate() + 1);

    return res.cookie("token", token, {
        expires: GMTcurrentTime,
        secure: false,
        httpOnly: true
    });

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
                resolve({ found: null, data: error });
            }
            if (rows.length > 0) {
                resolve({ found: true, data: rows });
            }
            resolve({ found: false });
        });
    });
};

const createNewUser = async (email, password, username) => {
    const user = await findUserByEmail(email);

    if (user.found) {
        return { result: 'FAILED' };
    }

    const encryptedPW = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO food_tracker.users (email, username, password) VALUES ("${email}", "${username}", "${encryptedPW}")`;

    return new Promise((resolve, reject) => {
        con.query(sql, function (err, row) {
            if (err) {
                return reject({ created: false, msg: err });
            };
            return resolve({ created: true, id: row.insertId });
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


const findItemById = (itemId) => {
    const sql = `SELECT * FROM food_tracker.items WHERE id=${itemId}`;
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


const addItem = (newItem, userId) => {
    const { name, quantity, purchased_date, expiry_date, category } = newItem;
    const num = parseInt(quantity);
    const sql = `INSERT INTO food_tracker.items (name, quantity, purchased_date, expiry_date, category, user_id) VALUES ('${name}', ${num}, '${purchased_date}', '${expiry_date}', '${category}', ${userId})`;
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
                return reject({ updated: false, data: error });
            }
            return resolve({ updated: true, data: UPDATED_MSG });
        });
    });
};


const deleteItem = (id) => {
    const sql = `DELETE FROM food_tracker.items WHERE id=${id}`;
    return new Promise((resolve, reject) => {
        con.query(sql, (error, row) => {
            if (error) {
                return reject({ deleted: false, data: error });
            }
            return resolve({ deleted: true, data: DELETED_MSG });
        });
    });
}



const getItems = (limit, offset, userId) => {
    const user_id = parseInt(userId);
    const sql = `SELECT * FROM food_tracker.items WHERE user_id=${user_id} LIMIT ${limit} OFFSET ${offset}`;
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

const getNumOfAllItems = (userId) => {

    const sql = `SELECT COUNT(*) as TotalCount from food_tracker.items WHERE user_id=${userId}`;

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
let MAIL_RECEIVER = "";

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
            to: MAIL_RECEIVER,
            subject: 'Notification: expiring food lists',
            text: content
        };

        if (MAIL_RECEIVER != "") {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    };
});


const getMailReceiver = async (userId) => {
    const user = await findUserById(userId);
    if (!user.found) {
        return USER_NOT_FOUND_MSG;
    };

    return user.data.email;
};

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

    setCookie,

    findUserByEmail,
    findUserById,
    findItemById,
    createNewUser,
    getUserId,
    getItems,
    getNumOfAllItems,
    addItem,
    updateItemData,
    deleteItem,

};