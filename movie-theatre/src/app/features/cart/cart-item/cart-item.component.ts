import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ConcessionItemComponent } from '@app-features/catalogue/concession-item/concession-item.component';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent extends ConcessionItemComponent implements OnInit {
  // extend ConcessionItemComponent to avoid complete duplicating the code
}
