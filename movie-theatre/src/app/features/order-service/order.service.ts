import { Injectable } from '@angular/core';

import { CatalogueItem, IRequestBody } from '@app-shared/models';


@Injectable()
export class OrderService {
  private _orderedItems: { [id: number]: CatalogueItem };

  private _orderedItemsList: CatalogueItem[];
  public get orderedItemsList(): CatalogueItem[] {
    return this._orderedItemsList;
  }

  private _totalItemsNumber: number;
  public get totalItemsNumber(): number {
    return this._totalItemsNumber;
  }

  private _totalItemsCost: number;
  public get totalItemsCost(): number {
    return this._totalItemsCost;
  }

  constructor() {
    this._orderedItems = {};
    this._orderedItemsList = [];
    this._totalItemsCost = 0;
    this._totalItemsNumber = 0;
  }

  public updateOrderedItems(item: CatalogueItem, amount: number): void {
    if (amount === 0) {
      delete this._orderedItems[item.id];
    } else {
      item.setItemsAmountAndCost(amount);
      this._orderedItems[item.id] = Object.assign(item);
    }

    const { totalAmount, totalCost } = this.calculateTotalItemsNumber();
    this._totalItemsNumber = totalAmount;
    this._totalItemsCost = totalCost;
    this._orderedItemsList = Object.values(this._orderedItems);
  }

  public placeAnOrder(): void {
    const requestBody = {
      items: CatalogueItem.deparse(this._orderedItemsList),
      totalCost: this._totalItemsCost,
    } as IRequestBody;

   // tslint:disable-next-line: no-console
    console.log(requestBody);
    // here will be some logic for sending http-request
  }

  private calculateTotalItemsNumber(): { totalAmount: number; totalCost: number; } {
    return Object.values(this._orderedItems).reduce((result, item) => {
      return ({
        totalAmount: result.totalAmount + item.amount,
        totalCost: result.totalCost + item.cost,
      });
    }, { totalAmount: 0, totalCost: 0 });
  }

}
