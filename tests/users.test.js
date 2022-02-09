import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import User from '../src/models/user';
import { comparePassword, hashPassword } from "../src/helpers/passwordSecurity"


use(chaiHttp)

describe("USER END-POINT-TEST", () => {

  before('BEFORE ALL TEST', async () => {
    const user = {
      name: 'testUser',
      username: 'testusername',
      email: 'test@testing.com',
      password: hashPassword('@Test12345')
    }

    await new User(user).save()

  });

  after('AFTER ALL TEST',  (done)=> {
    User.deleteMany({}, (err) => {
      done()
    });
  });


  it("should create user", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        name: 'testUser1',
        username: 'testusername1',
        email: 'test@testing1.com',
        password: '@Test12345'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it("should not create user (field validation)", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        username: 'testusername1',
        email: 'test@testing1.com',
        password: '@Test12345'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });

  it("should not create user", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        name: 'testUser1',
        username: 'testusername2',
        email: 'test@testing.com',
        password: '@Test12345'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });

  it("should accept user to login", (done) => {
    request(app)
      .post("/api/v1/users/login")
      .send({
        email: "test@testing.com",
        password: "@Test12345",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("Should not login", (done) => {
    request(app)
      .post("/api/v1/users/login")
      .send({
        email: "test",
        password: "test",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });

});