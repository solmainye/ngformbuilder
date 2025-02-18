import { Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder.component';

export const routes: Routes = [
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
  { path: 'builder', component: FormBuilderComponent }
];
