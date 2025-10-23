import type { Request, Response } from 'express';
import { imagesService } from '../services/images.service';
import { logger } from '../utils/logger';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants/http.constants';

export class ImagesController {
  async getImagesByBreedId(req: Request, res: Response): Promise<void> {
    try {
      const { breed_id } = req.query;
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;

      if (!breed_id) {
        logger.warn('Missing breed_id parameter');
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.BREED_ID_REQUIRED,
        });
        return;
      }

      logger.info('Fetching images by breed ID', { breed_id, limit, page });
      const images = await imagesService.getImagesByBreedId(
        breed_id as string,
        limit,
        page
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: images,
        count: images.length,
      });
    } catch (error) {
      logger.error('Error in getImagesByBreedId', error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        message: error instanceof Error ? error.message : ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async getImageById(req: Request, res: Response): Promise<void> {
    try {
      const { image_id } = req.params;

      if (!image_id) {
        logger.warn('Missing image_id parameter');
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Image ID is required',
        });
        return;
      }

      logger.info('Fetching image by ID', { image_id });
      const image = await imagesService.getImageById(image_id);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: image,
      });
    } catch (error) {
      logger.error('Error in getImageById', error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        message: error instanceof Error ? error.message : ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }
}

export const imagesController = new ImagesController();
