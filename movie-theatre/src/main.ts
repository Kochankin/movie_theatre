import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


// tslint:disable-next-line: tir-newline-after-import
// tslint:disable-next-line: no-relative-imports
import { AppModule } from './app/app.module';


// tslint:disable-next-line: no-relative-imports
import { ENVIRONMENT } from './environments/environment';


if (ENVIRONMENT.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
