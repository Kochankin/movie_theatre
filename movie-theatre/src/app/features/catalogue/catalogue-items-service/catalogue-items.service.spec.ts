import { TestBed } from '@angular/core/testing';

import { CatalogueItemsService } from './catalogue-items.service';


describe('CatalogueItemsService', () => {
  let service: CatalogueItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogueItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
