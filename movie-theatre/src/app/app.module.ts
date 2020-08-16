import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from 'app/app.component';

import { OrderService } from '@app-features/order-service/order.service';

import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@app-core/core.module';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [OrderService],
})
export class AppModule {}
