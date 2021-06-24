process.env.NODE_ENV = "test";

const request = require('supertest')
const app = require('../app');
const dbConfig = require("../DB/db");
const mysql = require('mysql');
const con = mysql.createConnection(dbConfig);

beforeAll(async () => {
    await con.query("INSERT INTO households (household_name, household_code) VALUES ('default', '1')");
    await con.query("INSERT INTO users (email, username, password, household_id) VALUES ('999', '999', '999', 1)");

});

afterAll(async () => {
    await con.query("DELETE FROM users");
    await con.query("DELETE FROM households WHERE household_code!='1'");
});

describe('Create a new user', () => {
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


describe('NOT create a new user', () => {
    it('because the user already exists', async () => {
        console.log('called')
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

    it("because the household code is wrong or doesn't exist", async () => {
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

    it('because neither household code nor household name are given', async () => {
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



