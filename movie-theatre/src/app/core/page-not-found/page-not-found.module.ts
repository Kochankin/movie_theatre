import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAGE_NOT_FOUND_ROUTING_COMPONENTS, PageNotFoundRoutingModule } from '@app-core/page-not-found/page-not-found-routing.module';


@NgModule({
  declarations: [PAGE_NOT_FOUND_ROUTING_COMPONENTS],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
  ],
})
export class PageNotFoundModule { }
