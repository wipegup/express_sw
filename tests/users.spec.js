var shell = require('shelljs');
var request = require('supertest');
var app = require ('../app');
var User = require('../models').User;
var pry = require('pryjs');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  // describe('Test user login', () => {
  //   test('with correct password, returns api key', () =>{
  //
  //     let body = {
  //       "email": "test4@example.com",
  //       "password": "password",
  //       "password_confirmation": "password"
  //     }
  //
  //     let login = {
  //       "email": "test4@example.com",
  //       "password": "password"
  //     }
  //
  //     return request(app)
  //       .post("/api/v1/users")
  //       .send(body)
  //       .end(() => {
  //         request(app)
  //         .post("/api/v1/sessions")
  //         .send(login)
  //         .end(err, response =>{
  //           expect(response.statusCode).toBe(200);
  //           expect(response.body).toHaveProperty('api_key');
  //
  //         })
  //       })
  //     })
  //   })


  describe('Test user creation', () => {
    test('with matching passwords, returns api key', () =>{
      let body = {
        "email": "test4@example.com",
        "password": "password",
        "password_confirmation": "password"
      }

      return request(app).post("/api/v1/users").send(body).then(response =>{
        //eval(pry.it)
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('api_key');
        // console.log(response);
      })
    })

    test('withOUT matching passwords, returns error', () =>{
      let body = {
        "email": "test4@example.com",
        "password": "password",
        "password_confirmation": "password2"
      }

      return request(app).post("/api/v1/users").send(body).then(response =>{
        //eval(pry.it)
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error", "passwords do not match");
        // console.log(response);
      })
    })
  })

  // describe('Test the root path', () => {
  //   test('should return a 200', () => {
  //     return request(app).get("/").then(response => {
  //       expect(response.statusCode).toBe(200)
  //     })
  //   });
  // });

  describe('Test the root path', () => {
    test('should return a 200', () => {
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200);
      });
    });
  });
});
