import type { Request, Response } from 'express';
import { imagesService } from '../services/images.service';

export class ImagesController {
  async getImagesByBreedId(req: Request, res: Response): Promise<void> {
    try {
      const { breed_id } = req.query;
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;

      if (!breed_id) {
        res.status(400).json({
          success: false,
          message: 'Breed ID is required',
        });
        return;
      }

      const images = await imagesService.getImagesByBreedId(
        breed_id as string,
        limit,
        page
      );

      res.status(200).json({
        success: true,
        data: images,
        count: images.length,
      });
    } catch (error) {
      console.error('Error in getImagesByBreedId:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getImageById(req: Request, res: Response): Promise<void> {
    try {
      const { image_id } = req.params;

      if (!image_id) {
        res.status(400).json({
          success: false,
          message: 'Image ID is required',
        });
        return;
      }

      const image = await imagesService.getImageById(image_id);

      res.status(200).json({
        success: true,
        data: image,
      });
    } catch (error) {
      console.error('Error in getImageById:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}

export const imagesController = new ImagesController();
