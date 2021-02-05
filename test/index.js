process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { request, expect } from 'chai';

chai.use(chaiHttp);


var server = require('../src/app');

describe('GET Status', () => {
  it('GET /cm/version', async () => {
    chai.request(server).get('/cm/version')
      .end((err, res) => {
        expect(res).to.have.status(200);
      })
  });
  it('GET /cm/health', async () => {
    chai.request(server).get('/cm/health')
      .end((err, res) => {
        expect(res).to.have.status(200);
      })
  });
});