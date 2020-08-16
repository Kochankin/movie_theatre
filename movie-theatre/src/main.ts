import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// tslint:disable-next-line: tir-newline-after-import
import { AppModule } from './app/app.module';

// tslint:disable-next-line: no-relative-imports
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
