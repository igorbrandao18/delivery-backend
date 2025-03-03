import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  private addresses: CreateAddressDto[] = [];

  create(createAddressDto: CreateAddressDto) {
    this.addresses.push(createAddressDto);
    return createAddressDto;
  }

  findAll() {
    return this.addresses;
  }
}
