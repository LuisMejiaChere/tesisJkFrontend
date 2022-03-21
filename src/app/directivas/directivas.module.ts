import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ArrastrarYSoltarDirective } from './arrastrar-y-soltar-directive/arrastrar-y-soltar.directive';


const UTILITY_COMPONENTS = [
    // ArrastrarYSoltarDirective
];


@NgModule({
  imports: [
    CommonModule,
    // AppMaterialImporterModule,
    ReactiveFormsModule
  ],
  declarations: UTILITY_COMPONENTS,
  exports: UTILITY_COMPONENTS
})
export class DirectivasModule { }