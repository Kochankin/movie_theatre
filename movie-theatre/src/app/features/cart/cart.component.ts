import { Component, ChangeDetectionStrategy } from '@angular/core';

import { OrderService } from '@app-features/order-service/order.service';

import { CatalogueItem } from '@app-shared/models';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private _orderedItems: CatalogueItem[];
  public get orderedItems(): CatalogueItem[] {
    return this._orderedItems;
  }

  private _totalOrderedItemsCost: number;
  public get totalOrderedItemsCost(): number {
    return this._totalOrderedItemsCost;
  }

  constructor(private _orderService: OrderService) {
    this._totalOrderedItemsCost = this._orderService.totalItemsCost;
    this._orderedItems = this._orderService.orderedItemsList;
  }

  public amountChangeHandler(amount: number, item: CatalogueItem): void {
    this._orderService.updateOrderedItems(item, amount);
    this._totalOrderedItemsCost = this._orderService.totalItemsCost;
    this._orderedItems = this._orderService.orderedItemsList;
  }

  public onButtonClick(): void {
    this._orderService.placeAnOrder();
  }

  public itemTrackByFunc(_: number, item: CatalogueItem): number {
    if (!item) {
      return null;
    }

    return item.id;
  }
}
