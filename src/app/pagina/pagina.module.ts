import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../../@vex/layout/layout.module";
import { SidenavModule } from "../../@vex/layout/sidenav/sidenav.module";
import { ToolbarModule } from "../../@vex/layout/toolbar/toolbar.module";
import { FooterModule } from "../../@vex/layout/footer/footer.module";
import { ConfigPanelModule } from "../../@vex/components/config-panel/config-panel.module";
import { SidebarModule } from "../../@vex/components/sidebar/sidebar.module";
import { QuickpanelModule } from "../../@vex/layout/quickpanel/quickpanel.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { PagesRouteModule } from "./pagina.routes";
import { MaterialModule } from "../material/material-module";
import { VexModule } from "src/@vex/vex.module";
import { PaginaComponent } from "./pagina.component";

import { PageLayoutModule } from "../../@vex/components/page-layout/page-layout.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BreadcrumbsModule } from "../../@vex/components/breadcrumbs/breadcrumbs.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WidgetAssistantModule } from "../../@vex/components/widgets/widget-assistant/widget-assistant.module";
import { SecondaryToolbarModule } from "../../@vex/components/secondary-toolbar/secondary-toolbar.module";
import { IconModule } from "@visurel/iconify-angular";
import { MiPerfilComponent } from "./mi-perfil/mi-perfil.component";


@NgModule({
  declarations: [DashboardComponent, PaginaComponent, MiPerfilComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    ConfigPanelModule,
    SidebarModule,
    QuickpanelModule,
    PagesRouteModule,
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
  exports: [DashboardComponent,MiPerfilComponent],
})
export class PaginaModule {}
