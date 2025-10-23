import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.middleware';
import { usersService } from '../services/users.service';

export class UsersController {
  async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await usersService.login({ email, password });

      const statusCode = result.success ? 200 : 401;
      res.status(statusCode).json(result);
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async register(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName } = req.body;

      const result = await usersService.register({
        email,
        password,
        firstName,
        lastName,
      });

      const statusCode = result.success ? 201 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getUserById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      // Verify user is authenticated and can only access their own profile
      if (req.user?.userId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Forbidden: You can only access your own profile',
        });
        return;
      }

      const user = await usersService.getUserById(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Error in getUserById:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export const usersController = new UsersController();
