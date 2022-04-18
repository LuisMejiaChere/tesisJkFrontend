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

import { ServicioModule } from './servicios/servicios.module';
import { AdmininistradorGuard } from './guards/administrador.guard';
import { DirectivasModule } from './directivas/directivas.module';
import { LogeoGuard } from './guards/logeo.guard';
import { NoLogeoGuard } from './guards/no-logeo.guard';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { ResPaswwordComponent } from './auth/res-paswword/res-paswword.component';


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, ResPaswwordComponent,
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
    SecondaryToolbarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    IconModule,
    DirectivasModule,
    // Vex
    VexModule,
  ],
  providers: [AdmininistradorGuard,  LogeoGuard,NoLogeoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
