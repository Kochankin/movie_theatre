import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { CartItemComponent } from '@app-features/cart/cart-item/cart-item.component';

import { SHARED_MATERIAL_MODULES } from '@app-shared/shared.module';

import { CatalogueItem } from '@app-shared/models';


describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  const catalogueItem = CatalogueItem.parse({
    name: 'snickers',
    id: 2,
    price: 4,
    imageUrl: 'https://cdn1.ozone.ru/multimedia/c650/1021033876.jpg',
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac nibh id mi tincidunt
      convallis quis ut diam. Aliquam eu mattis ex, eget laoreet urna. In id velit sed felis.`,
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemComponent ],
      imports: [
        SHARED_MATERIAL_MODULES,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.item = catalogueItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should assign amount', () => {
      expect(component.amount).toBe(catalogueItem.amount);
    });

    it('should assign buttonIcon', () => {
      expect(component.buttonIcon).toBeDefined();
    });

    it('should create amountControl with item amount as an initial value', () => {
      expect(component.amountControl.value).toBe(catalogueItem.amount);
    });

    it('should update button icon on amount value change', () => {
      component.amountControl.setValue(0);
      const initialBtnIcon = component.buttonIcon;

      component.amountControl.setValue(2);

      expect(component.buttonIcon).not.toBe(initialBtnIcon);
    });
  });

  describe('onButtonClick()', () => {
    it('should update amount', () => {
      const amount = 2;
      component.amountControl.setValue(amount);

      component.onButtonClick();

      expect(component.amount).toBe(amount);
    });

    it('should emit amountChangeEmitter', () => {
      const emitSpy = spyOn(component.amountChangeEmitter, 'emit');
      const amount = 1;
      component.amountControl.setValue(amount);

      component.onButtonClick();

      expect(emitSpy).toHaveBeenCalledWith(amount);
    });
  });
});
