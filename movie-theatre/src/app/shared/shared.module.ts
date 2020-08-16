import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


export const SHARED_MATERIAL_MODULES: unknown[] = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
];

const SHARED_MODULES: unknown[] = [
  ...SHARED_MATERIAL_MODULES,
  ReactiveFormsModule,
  FormsModule,
];

const SHARED_COMPONENTS: unknown[] = [];

const SHARED_PIPES: unknown[] = [];

const SHARED_DIRECTIVES: unknown[] = [];

@NgModule({
  imports: [CommonModule, SHARED_MODULES],
  declarations: [SHARED_COMPONENTS, SHARED_PIPES, SHARED_DIRECTIVES],
  exports: [SHARED_MODULES, SHARED_COMPONENTS, SHARED_PIPES, SHARED_DIRECTIVES],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
