import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ZeroFeatureComponent } from '@app-features/zero-feature/zero-feature.component';

import { SharedModule } from '@app-shared/shared.module';


export const ZERO_FEATURE_COMPONENT = ZeroFeatureComponent;

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    ZeroFeatureComponent,
  ],
})
export class ZeroFeatureModule { }
