import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PAGE_NOT_FOUND_FEATURE_PATH } from '@app-core/page-not-found';
import { ZERO_FEATURE_PATH } from '@app-features/zero-feature';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ZERO_FEATURE_PATH,
  },
  {
    path: PAGE_NOT_FOUND_FEATURE_PATH,
    loadChildren: () => import('@app-core/page-not-found/page-not-found.module')
      .then(m => m.PageNotFoundModule),
  },
  {
    path: '**',
    redirectTo: PAGE_NOT_FOUND_FEATURE_PATH,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
