import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from '@app-features/cart/cart.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule { }

export const CART_ROUTING_COMPONENTS = [
  CartComponent,
];

