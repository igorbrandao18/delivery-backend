import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

describe('AddressesService', () => {
  let service: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesService],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an address', () => {
      const createAddressDto: CreateAddressDto = {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      };
      const result = service.create(createAddressDto);
      expect(result).toEqual(createAddressDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of addresses', () => {
      const createAddressDto: CreateAddressDto = {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      };
      service.create(createAddressDto);
      const result = service.findAll();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(createAddressDto);
    });
  });
}); 