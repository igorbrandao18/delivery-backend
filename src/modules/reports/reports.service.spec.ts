import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { GetReportsDto } from './dto/get-reports.dto';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsService],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getReports', () => {
    it('should return reports structure', () => {
      const result: GetReportsDto = service.getReports();
      expect(result).toHaveProperty('daily');
      expect(result).toHaveProperty('weekly');
      expect(result).toHaveProperty('monthly');
    });
  });
}); 