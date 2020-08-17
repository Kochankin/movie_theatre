import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CatalogueItemsService } from '@app-features/catalogue/catalogue-items-service/catalogue-items.service';


describe('CatalogueItemsService', () => {
  let service: CatalogueItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogueItemsService],
    });
    service = TestBed.inject(CatalogueItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCatalogueItems()', () => {
    it('should return observable with items in 1000ms', fakeAsync(() => {
      let itemsFromSubscribe = null;

      service.getCatalogueItems().subscribe(items => itemsFromSubscribe = items);
      tick(1000);

      expect(itemsFromSubscribe).not.toBeNull();
    }));
  });
});
