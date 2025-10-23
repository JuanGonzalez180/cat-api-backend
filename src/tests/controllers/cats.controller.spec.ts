import { CatsController } from '../../controllers/cats.controller';
import { catsService } from '../../services/cats.service';

jest.mock('../../services/cats.service');

describe('CatsController', () => {
  let catsController: CatsController;
  let mockRes: any;
  let mockReq: any;

  beforeEach(() => {
    catsController = new CatsController();

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockReq = {
      query: {},
      params: {},
    };

    jest.clearAllMocks();
  });

  describe('getBreeds', () => {
    it('should return list of breeds with status 200', async () => {
      const mockBreeds = [{ id: '1', name: 'Bengal' }];
      (catsService.getBreeds as jest.Mock).mockResolvedValue(mockBreeds);

      await catsController.getBreeds(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockBreeds,
        count: 1,
      });
    });

    it('should return error if breed_id is missing in getBreedById', async () => {
      mockReq.params = {};

      await catsController.getBreedById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});
