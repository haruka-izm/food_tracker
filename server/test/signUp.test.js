process.env.NODE_ENV = "test";

const request = require('supertest')
const app = require('../app');
const dbConfig = require("../DB/db");
const mysql = require('mysql');
const con = mysql.createConnection(dbConfig);

beforeAll(async () => {
    await con.query("INSERT INTO users (email, username, password, household_id) VALUES ('999', '999', '999', 1)");
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
                "householdName": "test-2",
                "householdCode": ""
            })
        expect(res.statusCode).toBe(201)
        //expect(res.body).toHaveProperty('post')
    });


});




describe('Create a new user with code, but the user already exists', () => {
    it('NOT create a new user', async () => {
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
    })
});

describe("Create a new user with code, but it's wrong or doesn't exist", () => {
    it('create a new user', async () => {
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
    })
});


describe('Create a new user with NO code, NO name', () => {
    it('NOT create a new user', async () => {
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

