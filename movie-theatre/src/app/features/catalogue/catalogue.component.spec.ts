import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CatalogueComponent } from '@app-features/catalogue/catalogue.component';

import { CatalogueItemsService } from '@app-features/catalogue/catalogue-items-service/catalogue-items.service';
import { OrderService } from '@app-features/order-service/order.service';

import { SHARED_MATERIAL_MODULES } from '@app-shared/shared.module';

import { CatalogueItem } from '@app-shared/models';

const items = [
  CatalogueItem.parse({
    name: 'popcorn',
    id: 1,
    price: 3,
    imageUrl:
      'https://www.rachelpaulsfood.com/wp-content/uploads/DSC_0697.jpg',
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis nibh eros,
      sed sodales arcu semper ac. Duis sit amet ipsum quis sapien viverra efficitur sit amet non sapien. Quisque.`,
    discount: null,
  }),
];

@Component({
  selector: 'app-concession-item',
  template: 'app-concession-itemb stub',
})
// tslint:disable-next-line: component-class-suffix
export class ConcessionItemComponentStub {
  @Input()
  public item: CatalogueItem;

  @Output()
  public amountChangeEmitter: EventEmitter<number> = new EventEmitter();
}

@Injectable()
class CatalogueItemsServiceStub {
  public getCatalogueItemsSpy = jasmine.createSpy('getCatalogueItems').and.returnValue(of(items));

  public getCatalogueItems(): Observable<CatalogueItem[]> {
    return this.getCatalogueItemsSpy();
  }
}

@Injectable()
class OrderServiceStub {
  public totalItemsCost = 3;
  public totalItemsNumber = 1;

  public updateOrderedItemsSpy = jasmine.createSpy('updateOrderedItems');

  public updateOrderedItems(item: CatalogueItem, amount: number): void {
    return this.updateOrderedItemsSpy(item, amount);
  }
}

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;
  let orderServiceStub: OrderServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CatalogueComponent,
        ConcessionItemComponentStub,
      ],
      imports: [SHARED_MATERIAL_MODULES],
      providers: [
        {
          provide: CatalogueItemsService,
          useValue: new CatalogueItemsServiceStub(),
        },
        {
          provide: OrderService,
          useValue: new OrderServiceStub(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;
    orderServiceStub = TestBed.inject(OrderService) as unknown as OrderServiceStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should get catalogue items', () => {
      expect(component.catalogueItems).toBe(items);
    });
  });

  describe('amountChangeHandler()', () => {
    it('should call updateOrderedItems() method of Order Service', () => {
      const [item, amount] = [items[0], 2];

      component.amountChangeHandler(amount, item);

      expect(orderServiceStub.updateOrderedItemsSpy).toHaveBeenCalledWith(item, amount);
    });

    it('should set totalOrderedItemsAmount', () => {
      const [item, amount] = [items[0], 2];

      component.amountChangeHandler(amount, item);

      expect(component.totalOrderedItemsAmount).toBe(String(orderServiceStub.totalItemsNumber));
    });

    it('should set totalOrderedItemsCost', () => {
      const [item, amount] = [items[0], 2];

      component.amountChangeHandler(amount, item);

      expect(component.totalOrderedItemsCost).toBe(orderServiceStub.totalItemsCost);
    });
  });

  describe('itemTrackByFunc()', () => {
    it('should return null if no item is provided', () => {
      expect(component.itemTrackByFunc(1, null)).toBe(null);
    });

    it('should return item id if item is provided', () => {
      expect(component.itemTrackByFunc(1, items[0])).toBe(items[0].id);
    });
  });
});
