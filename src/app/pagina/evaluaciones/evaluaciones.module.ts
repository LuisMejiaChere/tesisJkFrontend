import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluacionesRouteModule } from './evaluaciones.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { WidgetAssistantModule } from 'src/@vex/components/widgets/widget-assistant/widget-assistant.module';
import { VexModule } from 'src/@vex/vex.module';
import { MaterialModule } from 'src/app/material/material-module';
import { ConfigPanelModule } from 'src/@vex/components/config-panel/config-panel.module';
import { SidebarModule } from 'src/@vex/components/sidebar/sidebar.module';
import { FooterModule } from 'src/@vex/layout/footer/footer.module';
import { LayoutModule } from 'src/@vex/layout/layout.module';
import { QuickpanelModule } from 'src/@vex/layout/quickpanel/quickpanel.module';
import { SidenavModule } from 'src/@vex/layout/sidenav/sidenav.module';
import { ToolbarModule } from 'src/@vex/layout/toolbar/toolbar.module';
import { ModeloCarreraComponent } from './modelo-carrera/modelo-carrera.component';
import { EvaluacionesComponent } from './evaluaciones.component';






@NgModule({
 
  declarations: [EvaluacionesComponent,ModeloCarreraComponent],
  
  imports: [
    CommonModule,
    LayoutModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    ConfigPanelModule,
    SidebarModule,
    QuickpanelModule,
    EvaluacionesRouteModule,
    FormsModule,
    MaterialModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
    WidgetAssistantModule,
    SecondaryToolbarModule,
    IconModule,
    VexModule,
  ],
  
})
export class EvaluacionesModule { }
