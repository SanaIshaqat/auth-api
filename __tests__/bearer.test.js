'use strict';

process.env.SECRET = 'toes';

const middleware = require('../src/middleware/bearer');
const Users = require('../src/models/users');
const jwt = require('jsonwebtoken');

let users = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await new Users(users.admin).save();
  
});

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    xit('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

      return middleware(req, res, next)
        .then(() => {
          // expect(next).not.toHaveBeenCalled();
          // expect(res.status).toHaveBeenCalledWith(403);
        });

    });

    xit('logs in a user with a proper token', () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });

  });

});