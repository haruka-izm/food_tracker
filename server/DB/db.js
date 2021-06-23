const dbName = process.env.NODE_ENV === "test" ? "test" : "food_tracker";
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "root",
    database: `${dbName}`
};

module.exports = dbConfig;