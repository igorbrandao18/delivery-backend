export class CreateOrderDto {
  readonly items: OrderItemDto[];
  readonly restaurantId: number;
  readonly userId: number;
}

export class OrderItemDto {
  readonly id: number;
  readonly quantity: number;
}
