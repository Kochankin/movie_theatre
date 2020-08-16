import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CatalogueItem, ICatalogueItem } from '@app-shared/models';


// tslint:disable-next-line: no-relative-imports
import items from '../../../../assets/items.json';


@Injectable()
export class CatalogueItemsService {
  // This is an imitation of real HTTP-request with some delay
  public getCatalogueItems(): Observable<CatalogueItem[]> {
    return of(items.map((item: ICatalogueItem) => CatalogueItem.parse(item))).pipe(delay(1000));
  }
}
