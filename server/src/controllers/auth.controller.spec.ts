import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/services/auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue('mocked_token'),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token', async () => {
      const credentials = { email: 'test@example.com', password: 'password', username: "dani"};
      const token = await authController.login(credentials, "");

      expect(token).toBe('mocked_token');
      expect(authService.generateToken).toHaveBeenCalledWith(credentials);
    });
  });
});
