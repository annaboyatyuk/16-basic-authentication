'use strict';

const superagent = require('superagent');
const mongoose = require('mongoose');
const app = require('../../../src/app.js');

describe('Authenticate Server', () => {

  const PORT = 3000;
  beforeAll( () => {
    mongoose.connect('mongodb://localhost:27017/');
    app.start(PORT);
  });
  afterAll( () => {
    app.stop();
    mongoose.connection.close();
  });

  it('gets a 401 on a empty login', () => {
    return superagent
      .get('http://localhost:3000/signin')
      .then(response => {
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 401 on a bad login', () => {
    return superagent
      .auth('one', 'two')
      .then(response => {
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 200 on a good login', () => {
    return superagent
      .auth('username', 'password')
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });


});