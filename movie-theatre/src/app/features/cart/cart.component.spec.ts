import { Component, Output, EventEmitter, Injectable } from '@angular/core';
import { Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from '@app-features/cart/cart.component';

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
  selector: 'app-cart-item',
  template: 'app-cart-item stub',
})
// tslint:disable-next-line: component-class-suffix
export class CartItemComponentStub {
  @Input()
  public item: CatalogueItem;

  @Output()
  public amountChangeEmitter: EventEmitter<number> = new EventEmitter();
}

@Injectable()
class OrderServiceStub {
  public totalItemsCost = 3;
  public totalItemsNumber = 1;
  public orderedItemsList = items;

  public updateOrderedItemsSpy = jasmine.createSpy('updateOrderedItems');
  public placeAnOrderSpy = jasmine.createSpy('placeAnOrder');

  public updateOrderedItems(item: CatalogueItem, amount: number): void {
    return this.updateOrderedItemsSpy(item, amount);
  }

  public placeAnOrder(): void {
    return this.placeAnOrderSpy();
  }
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let orderServiceStub: OrderServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CartComponent,
        CartItemComponentStub,
      ],
      imports: [SHARED_MATERIAL_MODULES],
      providers: [
        {
          provide: OrderService,
          useValue: new OrderServiceStub(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    orderServiceStub = TestBed.inject(OrderService) as unknown as OrderServiceStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('amountChangeHandler()', () => {
    it('should call updateOrderedItems() method of Order Service', () => {
      const [item, amount] = [items[0], 2];

      component.amountChangeHandler(amount, item);

      expect(orderServiceStub.updateOrderedItemsSpy).toHaveBeenCalledWith(item, amount);
    });

    it('should set orderedItems', () => {
      const [item, amount] = [items[0], 2];

      component.amountChangeHandler(amount, item);

      expect(component.orderedItems).toBe(orderServiceStub.orderedItemsList);
    });

    it('should set totalOrderedItemsCost', () => {
      const [item, amount] = [items[0], 2];

      component.amountChangeHandler(amount, item);

      expect(component.totalOrderedItemsCost).toBe(orderServiceStub.totalItemsCost);
    });
  });

  describe('onButtonClick()', () => {
    it('should call placeAnOrder() method of Order Service', () => {
      component.onButtonClick();

      expect(orderServiceStub.placeAnOrderSpy).toHaveBeenCalled();
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
