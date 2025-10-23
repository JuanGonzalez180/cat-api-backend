import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.middleware';
import { usersService } from '../services/users.service';
import { logger } from '../utils/logger';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/http.constants';

export class UsersController {
  async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      logger.info('User login attempt', { email });
      const result = await usersService.login({ email, password });

      const statusCode = result.success ? HTTP_STATUS.OK : HTTP_STATUS.UNAUTHORIZED;
      res.status(statusCode).json(result);
    } catch (error) {
      logger.error('Error in login', error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async register(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName } = req.body;

      logger.info('User registration attempt', { email, firstName, lastName });
      const result = await usersService.register({
        email,
        password,
        firstName,
        lastName,
      });

      const statusCode = result.success ? HTTP_STATUS.CREATED : HTTP_STATUS.CONFLICT;
      res.status(statusCode).json(result);
    } catch (error) {
      logger.error('Error in register', error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async getUserById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      logger.info('Fetching user profile', { userId });

      // Verify user is authenticated and can only access their own profile
      if (req.user?.userId !== userId) {
        logger.warn('Unauthorized access attempt', { requestUserId: req.user?.userId, targetUserId: userId });
        res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: ERROR_MESSAGES.FORBIDDEN_ACCESS,
        });
        return;
      }

      const user = await usersService.getUserById(userId);

      if (!user) {
        logger.warn('User not found', { userId });
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.USER_NOT_FOUND,
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.USER_FETCHED,
        data: user,
      });
    } catch (error) {
      logger.error('Error in getUserById', error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }
}

export const usersController = new UsersController();
