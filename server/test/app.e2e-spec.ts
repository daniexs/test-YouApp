import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers a user and logs in', async () => {
    const registerResponse = await request(app.getHttpServer())
      .post('/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'testpassword' })
      .expect(201);
    expect(registerResponse.body).toHaveProperty('userId');
    const loginResponse = await request(app.getHttpServer())
      .post('/login')
      .send({ email: 'test@example.com', password: 'testpassword' })
      .expect(200);
    expect(loginResponse.body).toHaveProperty('token');
  });
});

