const { app } = require('../src/app');

describe('App', () => {
  it('GET /api/protected responds with 401 containing "Unauthorized"', () => {
    return supertest(app)
      .get('/api/protected')
      .expect(401, 'Unauthorized');
  });
});
