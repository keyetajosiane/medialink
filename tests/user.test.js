const request = require('supertest');
const app = require('../app'); // This is the path to your Express app

let user_id = null

describe('POST /user/create', () => {
  it('should create a new user', async () => {
    const userData = {
      user_name: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
      first_name: 'Test',
      last_name: 'User',
      role: 'user'
    };

    const res = await request(app)
      .post('/user/user/create')
      .send(userData)
      .expect(200);

    expect(res.body).toEqual(expect.objectContaining(userData));
    user_id = res.body.user_id
  });
});

describe('GET /user', () => {
  it('should return a list of users', async () => {
    const res = await request(app)
      .get('/user/user')
      .expect(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});

// get user by id
describe('GET /user/:user_id', () => {
  it('should return a user', async () => {
    const res = await request(app)
      .get('/user/user/' + user_id)
      .expect(200);
    expect(res.body).toEqual(expect.any(Object));
  });  
})

// get user by email
describe('GET /user/email/:email', () => {
  it('should return a user', async () => {
    const res = await request(app)
      .get('/user/user/email/testuser@example.com')
      .expect(200);
    expect(res.body).toEqual(expect.any(Object));
  });
})

// count users
describe('GET /user/count', () => {
  it('should return the number of users', async () => {
    const res = await request(app)
      .get('/user/user/count')
      .expect(200);
    expect(res.body).toEqual(expect.any(Object));
  });
})

// update user
describe('PUT /user/:user_id', () => {
  it('should update a user', async () => {
    const res = await request(app)
      .put('/user/user/' + user_id)
      .send({
        password: 'password update',
        first_name: 'Test update',
        last_name: 'User update'
      })
      .expect(200);
    expect(res.body).toEqual(expect.objectContaining({
      user_name: 'testuser',
      email: 'testuser@example.com',
      password: 'password update',
      first_name: 'Test update',
      last_name: 'User update',
      role: 'user'
    }));
  });
})

// delete user
describe('DELETE /user/:user_id', () => {
  it('should delete a user', async () => {
    const res = await request(app)
      .delete('/user/user/' + user_id)
      .expect(200);
    expect(res.body).toEqual(expect.any(Object));
  });
})