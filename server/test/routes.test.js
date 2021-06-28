process.env.NODE_ENV = "test";

const request = require('supertest')
const app = require('../app');
const dbConfig = require("../DB/db");
const mysql = require('mysql');
const con = mysql.createConnection(dbConfig);

const testUser = {
    email: "test",
    password: "test"
};

let testToken;

beforeAll(async () => {
    await con.query("INSERT INTO households (household_name, household_code) VALUES ('default', '1')");
    await con.query("INSERT INTO users (email, username, password, household_id) VALUES ('test', 'test', 'test', 1)");
    await con.query("INSERT INTO items (name, quantity, purchased_date, expiry_date, category, household_id) VALUES ('tune', 5, '2020-12-01', '2021-01-31', 'seafood',1)");

    // create a token
    await request.post('/api/login').send(testUser).end((err, response) => {
        testToken = response.body.token;
        console.log(testToken);
    });
})

afterAll(async () => {
    await con.query("DELETE FROM users");
    await con.query("DELETE FROM households WHERE household_code!='1'");
});

describe('POST /signUp Success', () => {
    it('with a household code', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                "email": "1",
                "password": "1",
                "username": "1",
                "hasCode": "true",
                "householdName": "",
                "householdCode": "1"
            })
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('message')
    });


    it('with NO code', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                "email": "2",
                "password": "2",
                "username": "2",
                "hasCode": "false",
                "householdName": "new household",
                "householdCode": ""
            })
        expect(res.statusCode).toBe(201);
    });
});


describe('POST /signUp Failure', () => {
    it('the user already exists', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                "email": "2",
                "password": "2",
                "username": "2",
                "hasCode": "true",
                "householdName": "",
                "householdCode": "1"
            })
        expect(res.statusCode).toBe(400)
        //expect(res.body).toHaveProperty()
    });

    it("Invalid household code", async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                "email": "5",
                "password": "5",
                "username": "tetuto",
                "hasCode": "true",
                "householdName": "",
                "householdCode": "999"
            })
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('message', "Provided code is wrong. Please try again.")
    });

    it('neither household code nor household name are given', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                "email": "7",
                "password": "7",
                "username": "tetuto",
                "hasCode": "false",
                "householdName": "",
                "householdCode": ""
            })
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('message', "Please provide a household name.")
    })
});




describe('POST /items Success', () => {

    beforeAll(async () => {
        // create a token
        await request.post('/api/login').send(testUser).end((err, response) => {
            testToken = response.body.token;
            console.log(testToken);
        });
    });


    it('Add a new item', async () => {
        const res = await request(app)
            .post('/api/items')
            .send({
                name: 'mikan',
                quantity: 10,
                purchased_date: '2020-12-01',
                expiry_date: '2021-01-31',
                category: 'fruit',
                household_id: 1
            })
        expect(res.statusCode).toBe(201)
        //expect(res.body).toHaveProperty()
    });

});




describe('POST /items Failure', () => {
    it('Add: Item information is missing', async () => {
        const res = await request(app)
            .post('/api/items')
            .send({
                name: 'mikan',
                quantity: '',
                purchased_date: '2020-12-01',
                expiry_date: '2021-01-31',
                category: 'fruit',
                household_id: 1
            })
        expect(res.statusCode).toBe(400)

    });

});



