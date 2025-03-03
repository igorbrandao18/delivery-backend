import { Injectable } from '@nestjs/common';

export interface Payment {
  id: string;
  amount: number;
  userId: number;
  orderId: string;
}

@Injectable()
export class PaymentsService {
  private readonly payments: Payment[] = [];

  async createPayment(paymentData: any) {
    // Simulação de lógica de pagamento manual
    if (paymentData.amount <= 0) {
      throw new Error('O valor do pagamento deve ser maior que zero.');
    }
    
    const newPayment = { id: Date.now().toString(), ...paymentData };
    this.payments.push(newPayment);
    return { message: 'Pagamento criado com sucesso', data: newPayment };
  }

  findAll() {
    return this.payments;
  }

  findOne(id: string): Payment | null {
    const payment = this.payments.find(payment => payment.id === id);
    return payment || null;
  }

  remove(id: string): Payment | null {
    const paymentIndex = this.payments.findIndex(payment => payment.id === id);
    if (paymentIndex > -1) {
      return this.payments.splice(paymentIndex, 1)[0];
    }
    return null;
  }
} 