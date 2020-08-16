import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule, CART_ROUTING_COMPONENTS } from '@app-features/cart/cart-routing.module';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
  declarations: [
    CART_ROUTING_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule,
  ],
})
export class CartModule { }
