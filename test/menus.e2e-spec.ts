import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Restaurant } from '@prisma/client';

describe('MenusController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let restaurant: Restaurant;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);

    await app.init();

    // Create a test restaurant and get auth token
    restaurant = await prisma.restaurant.create({
      data: {
        name: 'Test Restaurant',
        email: 'test@restaurant.com',
        password: 'test123',
        address1: 'Test Address',
        city: 'Test City',
        county: 'Test County',
        postcode: '12345',
        country: 'Test Country',
        timezoneOffset: '+00:00',
        locale: 'en',
        timeZone: 'UTC',
        ccy: 'USD',
        ccySymbol: '$',
        currency: 'USD',
      },
    });

    authToken = jwtService.sign({ sub: restaurant.id, email: restaurant.email });
  });

  afterAll(async () => {
    await prisma.restaurant.delete({ where: { id: restaurant.id } });
    await app.close();
  });

  describe('Menu Sections', () => {
    let sectionId: number;

    it('should create a menu section', () => {
      return request(app.getHttpServer())
        .post('/menus/sections')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Section',
          description: 'Test Description',
          position: 1,
          visible: true,
          images: [{ image: 'test.jpg' }],
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test Section');
          expect(res.body.images).toHaveLength(1);
          sectionId = res.body.id;
        });
    });

    it('should get all menu sections', () => {
      return request(app.getHttpServer())
        .get('/menus/sections')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('should get a specific menu section', () => {
      return request(app.getHttpServer())
        .get(`/menus/sections/${sectionId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(sectionId);
        });
    });

    it('should update a menu section', () => {
      return request(app.getHttpServer())
        .patch(`/menus/sections/${sectionId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Section',
          images: [{ image: 'updated.jpg' }],
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('Updated Section');
          expect(res.body.images).toHaveLength(1);
          expect(res.body.images[0].image).toBe('updated.jpg');
        });
    });
  });

  describe('Menu Items', () => {
    let sectionId: number;
    let itemId: number;

    beforeAll(async () => {
      // Create a test section
      const section = await prisma.menuSection.create({
        data: {
          name: 'Test Section',
          restaurantId: restaurant.id,
        },
      });
      sectionId = section.id;
    });

    afterAll(async () => {
      await prisma.menuSection.delete({ where: { id: sectionId } });
    });

    it('should create a menu item', () => {
      return request(app.getHttpServer())
        .post(`/menus/sections/${sectionId}/items`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Item',
          description: 'Test Description',
          price: 10.99,
          position: 1,
          visible: true,
          images: [{ image: 'test.jpg' }],
          modifiers: [
            {
              name: 'Size',
              items: [{ name: 'Small', price: 10.99 }],
            },
          ],
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test Item');
          expect(res.body.images).toHaveLength(1);
          expect(res.body.modifiers).toHaveLength(1);
          itemId = res.body.id;
        });
    });

    it('should get all menu items for a section', () => {
      return request(app.getHttpServer())
        .get(`/menus/sections/${sectionId}/items`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('should get a specific menu item', () => {
      return request(app.getHttpServer())
        .get(`/menus/sections/${sectionId}/items/${itemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(itemId);
        });
    });

    it('should update a menu item', () => {
      return request(app.getHttpServer())
        .patch(`/menus/sections/${sectionId}/items/${itemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Item',
          images: [{ image: 'updated.jpg' }],
          modifiers: [
            {
              name: 'Size',
              items: [{ name: 'Large', price: 15.99 }],
            },
          ],
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('Updated Item');
          expect(res.body.images).toHaveLength(1);
          expect(res.body.images[0].image).toBe('updated.jpg');
          expect(res.body.modifiers).toHaveLength(1);
          expect(res.body.modifiers[0].items[0].name).toBe('Large');
        });
    });

    it('should delete a menu item', () => {
      return request(app.getHttpServer())
        .delete(`/menus/sections/${sectionId}/items/${itemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(itemId);
        });
    });
  });

  describe('Error Cases', () => {
    it('should return 401 for unauthorized access', () => {
      return request(app.getHttpServer())
        .get('/menus/sections')
        .expect(401);
    });

    it('should return 404 for non-existent section', () => {
      return request(app.getHttpServer())
        .get('/menus/sections/999999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should return 404 for non-existent menu item', () => {
      return request(app.getHttpServer())
        .get('/menus/sections/1/items/999999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
}); 