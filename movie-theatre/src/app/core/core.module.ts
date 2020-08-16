import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from '@app-core/core-routing.module';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
  ],
  providers: [],
})

export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the RootModule only');
    }
  }
}
