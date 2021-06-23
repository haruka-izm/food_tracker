const request = require('supertest')
const app = require('../app');

describe('Create a new user with code', () => {
    it('create a new user', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                "email": "5",
                "password": "5",
                "username": "tetuto",
                "hasCode": "true",
                "householdName": "",
                "householdCode": "1"
            })
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('message')
    })
});


describe('Create a new user with code, but the user already exists', () => {
    it('NOT create a new user', async () => {
        console.log('called')
        const res = await request(app)
            .post('/api/signup')
            .send({
                "email": "5",
                "password": "5",
                "username": "tetuto",
                "hasCode": "true",
                "householdName": "",
                "householdCode": "9999"
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

describe('Create a new user with NO code', () => {
    it('create a new user', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                "email": "6",
                "password": "6",
                "username": "tetuto",
                "hasCode": "false",
                "householdName": "by testing",
                "householdCode": ""
            })
        expect(res.statusCode).toBe(201)
        //expect(res.body).toHaveProperty('post')
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

