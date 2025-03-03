import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PaymentsService, Payment } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() paymentData: CreatePaymentDto) {
    return this.paymentsService.createPayment(paymentData);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentsService.remove(id);
  }
} 