import { TestBed } from '@angular/core/testing';

import { OrderService } from '@app-features/order-service/order.service';

import { CatalogueItem } from '@app-shared/models';


describe('OrderService', () => {
  let service: OrderService;
  const catalogueItem = CatalogueItem.parse({
    name: 'snickers',
    id: 2,
    price: 4,
    imageUrl: 'https://cdn1.ozone.ru/multimedia/c650/1021033876.jpg',
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Etiam ac nibh id mi tincidunt convallis quis ut diam. Aliquam eu mattis ex, eget laoreet urna. In id velit sed felis.`,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateOrderedItems()', () => {
    it('should update amount and cost of item if amount is not 0', () => {
      const amount = 1;

      service.updateOrderedItems(catalogueItem, amount);

      expect(catalogueItem.amount).toBe(amount);
      expect(catalogueItem.cost).toBe(catalogueItem.price * amount);
    });

    it('should update totalItemsNumber', () => {
      const amount = 1;

      service.updateOrderedItems(catalogueItem, amount);

      expect(service.totalItemsNumber).toBe(amount);
    });

    it('should update totalItemsCost', () => {
      const amount = 1;

      service.updateOrderedItems(catalogueItem, amount);

      expect(service.totalItemsCost).toBe(amount * catalogueItem.price);
    });

    it('should update orderedItemsList', () => {
      const amount = 1;

      service.updateOrderedItems(catalogueItem, amount);

      expect(service.orderedItemsList).toContain(catalogueItem);
    });
  });

  // Can't be tested now since method doesn't return anything or modify any property
  // describe("placeAnOrder()", () => {
  // ...
  // });
});
