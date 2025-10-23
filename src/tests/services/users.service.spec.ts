import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user.model';

jest.mock('../../models/user.model');

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return success with user data on valid credentials', async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue({
        _id: { toString: () => '123' },
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });

      const result = await usersService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      expect(result.user?.email).toBe('test@example.com');
    });

    it('should return error if user not found', async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue(null);

      const result = await usersService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('User not found');
    });
  });

  describe('register', () => {
    it('should return error if email already exists', async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

      const result = await usersService.register({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email already registered');
    });

    it('should return error if password is too short', async () => {
      const result = await usersService.register({
        email: 'test@example.com',
        password: '123',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Password must be at least 6 characters');
    });
  });
});
