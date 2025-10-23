import type { Request, Response } from 'express';
import { usersService } from '../services/users.service';

export class UsersController {
  async login(req: Request, res: Response): Promise<void> {
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

  async register(req: Request, res: Response): Promise<void> {
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

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

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
