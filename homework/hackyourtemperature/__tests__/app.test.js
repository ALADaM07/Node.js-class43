import supertest from 'supertest';
import app from '../app.js';
const request = supertest(app);

describe('GET /', () => {
  it('Should return a string', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

describe('POST /', () => {
  it('should return a city name and temp ', async () => {
    const response = await request.post('/weather').send({
      cityName: 'Amsterdam',
    });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain(`City: Amsterdam, Temp: `);
  });
});
describe('POST /', () => {
  it('should return a city name and temp ', async () => {
    const response = await request.post('/weather').send({
      cityName: 'gasdhvj',
    });
    expect(response.status).toBe(404);
  });
});
