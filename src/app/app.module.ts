import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { MaterialModule } from './material/material-module';
import { PaginaModule } from './pagina/pagina.module';
import { PaginaComponent } from './pagina/pagina.component';
import { ServicioModule } from './servicios/servicios.module';


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    // PaginaComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ServicioModule,

    FlexLayoutModule,
    ReactiveFormsModule,
    IconModule,

    // Vex
    VexModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
