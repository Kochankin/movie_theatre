import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZERO_FEATURE_COMPONENT } from '@app-features/zero-feature/zero-feature.module';

import { ZERO_FEATURE_PATH } from '@app-features/zero-feature';
import { CATALOGUE_PATH } from '@app-features/catalogue';
import { CART_PATH } from '@app-features/cart';


const features: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: CATALOGUE_PATH,
  },
  {
    path: CATALOGUE_PATH,
    loadChildren:
      () => import('@app-features/catalogue/catalogue.module')
        .then(m => m.CatalogueModule),
  },
  {
    path: CART_PATH,
    loadChildren:
      () => import('@app-features/cart/cart.module')
        .then(m => m.CartModule),
  },
];

const routes: Routes = [
  {
    path: ZERO_FEATURE_PATH,
    component: ZERO_FEATURE_COMPONENT,
    pathMatch: 'prefix',
    children: [ ...features],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
