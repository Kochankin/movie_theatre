import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '@app-core/page-not-found/page-not-found.component';


const routes: Routes = [{
  path: '',
  component: PageNotFoundComponent,
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageNotFoundRoutingModule {}

export const PAGE_NOT_FOUND_ROUTING_COMPONENTS = [PageNotFoundComponent];
