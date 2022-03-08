import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './errores/errores.service';
import { MensajeService } from './mensajes/mensaje.service';
import { UrlService } from './url/url.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UrlService,
    ErrorService,
    MensajeService
  ]
})

export class ServicioModule { }
