import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogueComponent } from '@app-features/catalogue/catalogue.component';
import { ConcessionItemComponent } from '@app-features/catalogue/concession-item/concession-item.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CatalogueComponent,
    data: { title: 'Catalogue' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogueRoutingModule { }

export const CATALOGUE_ROUTING_COMPONENTS = [
  CatalogueComponent,
  ConcessionItemComponent,
];

