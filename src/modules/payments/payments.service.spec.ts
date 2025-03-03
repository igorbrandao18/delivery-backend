import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPayment', () => {
    it('should create a payment successfully', async () => {
      const paymentData: CreatePaymentDto = {
        amount: 100,
        userId: 'user123',
        orderId: 'order123',
      };
      const result = await service.createPayment(paymentData);
      expect(result.message).toBe('Pagamento criado com sucesso');
      expect(result.data).toHaveProperty('id');
      expect(result.data.amount).toBe(paymentData.amount);
    });

    it('should throw an error if amount is less than or equal to zero', async () => {
      const paymentData: CreatePaymentDto = {
        amount: 0,
        userId: 'user123',
        orderId: 'order123',
      };
      await expect(service.createPayment(paymentData)).rejects.toThrow('O valor do pagamento deve ser maior que zero.');
    });
  });
}); 