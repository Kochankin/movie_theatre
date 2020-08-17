import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { take } from 'rxjs/operators';

import { CatalogueItemsService } from '@app-features/catalogue/catalogue-items-service/catalogue-items.service';
import { OrderService } from '@app-features/order-service/order.service';

import {
  untilComponentDestroyed,
  OnDestroyMixin,
} from '@w11k/ngx-componentdestroyed';
import { CatalogueItem } from '@app-shared/models';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogueComponent extends OnDestroyMixin implements OnInit {
  private _catalogueItems: CatalogueItem[];
  public get catalogueItems(): CatalogueItem[] {
    return this._catalogueItems;
  }

  private _totalOrderedItemsAmount: string;
  public get totalOrderedItemsAmount(): string {
    return this._totalOrderedItemsAmount;
  }

  private _totalOrderedItemsCost: number;
  public get totalOrderedItemsCost(): number {
    return this._totalOrderedItemsCost;
  }

  constructor(
    private _catalogueItemsService: CatalogueItemsService,
    private _orderService: OrderService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
    this._totalOrderedItemsCost = this._orderService.totalItemsCost;
    this._totalOrderedItemsAmount = String(this._orderService.totalItemsNumber);
  }

  public ngOnInit(): void {

    this._catalogueItemsService
      .getCatalogueItems()
      .pipe(
        take(1),
        untilComponentDestroyed(this),
      )
      .subscribe((items: CatalogueItem[]) => {
        this._catalogueItems = items;
        this._changeDetectorRef.detectChanges();
      });
  }

  public amountChangeHandler(amount: number, item: CatalogueItem): void {
    this._orderService.updateOrderedItems(item, amount);
    this._totalOrderedItemsAmount = String(this._orderService.totalItemsNumber);
    this._totalOrderedItemsCost = this._orderService.totalItemsCost;
  }

  public itemTrackByFunc(_: number, item: CatalogueItem): number {
    if (!item) {
      return null;
    }

    return item.id;
  }
}
