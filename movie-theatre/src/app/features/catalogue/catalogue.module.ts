import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueItemsService } from '@app-features/catalogue/catalogue-items-service/catalogue-items.service';

import { SharedModule } from '@app-shared/shared.module';
import { CatalogueRoutingModule, CATALOGUE_ROUTING_COMPONENTS } from '@app-features/catalogue/catalogue-routing.module';


@NgModule({
  declarations: [
    CATALOGUE_ROUTING_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogueRoutingModule,
  ],
  providers: [CatalogueItemsService],
})
export class CatalogueModule { }

