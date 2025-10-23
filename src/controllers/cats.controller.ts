import type { Request, Response } from 'express';
import { catsService } from '../services/cats.service';
import { logger } from '../utils/logger';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/http.constants';

export class CatsController {
  async getBreeds(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;

      logger.info('Fetching breeds', { limit, page });
      const breeds = await catsService.getBreeds(limit, page);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.BREED_FETCHED,
        data: breeds,
        count: breeds.length,
      });
    } catch (error) {
      logger.error('Error in getBreeds', error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        message: error instanceof Error ? error.message : ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async getBreedById(req: Request, res: Response): Promise<void> {
    try {
      const { breed_id } = req.params;

      if (!breed_id) {
        logger.warn('Missing breed_id parameter');
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.BREED_ID_REQUIRED,
        });
        return;
      }

      logger.info('Fetching breed by ID', { breed_id });
      const breed = await catsService.getBreedById(breed_id);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.BREED_FETCHED,
        data: breed,
      });
    } catch (error) {
      logger.error('Error in getBreedById', error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        message: error instanceof Error ? error.message : ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async searchBreeds(req: Request, res: Response): Promise<void> {
    try {
      const { q, limit, page } = req.query;

      if (!q) {
        logger.warn('Missing search query parameter');
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.SEARCH_QUERY_REQUIRED,
        });
        return;
      }

      const searchParams = {
        q: q as string,
        limit: limit ? parseInt(limit as string) : 10,
        page: page ? parseInt(page as string) : 0,
      };

      logger.info('Searching breeds', searchParams);
      const results = await catsService.searchBreeds(searchParams);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.BREED_FETCHED,
        data: results,
        count: results.length,
      });
    } catch (error) {
      logger.error('Error in searchBreeds', error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        message: error instanceof Error ? error.message : ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }
}

export const catsController = new CatsController();
