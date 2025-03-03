import { Injectable } from '@nestjs/common';
import { GetReportsDto } from './dto/get-reports.dto';

@Injectable()
export class ReportsService {
  getReports(): GetReportsDto {
    // Lógica para obter relatórios de vendas
    return {
      daily: [],
      weekly: [],
      monthly: []
    };
  }
}
