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

  describe('Test user creation', () => {

  })
  describe('Test the root path', () => {
    test('should return a 200', () => {
      // eval(pry.it)
      console.log("LOOK HERE " + typeof(User));
      User.create({email:"this@example.com", password_digest:"ok", api_key: "abcd"})
      .then(user => {
        console.log(JSON.stringify(user));
        this.findAll().then(games => { console.log(JSON.stringify(games))})
      });

      setTimeout(printNotification(), 1000)

      function printNotification() {
        console.log("str")
      }
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200);
      })
    });
  });
});
