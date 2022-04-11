import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icHowToReg from '@iconify/icons-ic/twotone-how-to-reg';
import icFat from '@iconify/icons-ic/twotone-fact-check';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Centro de Evaluación y Aseguramiento de la Calidad';
  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private renderer: Renderer2,
              private platform: Platform,
              @Inject(DOCUMENT) private document: Document,
              @Inject(LOCALE_ID) private localeId: string,
              private layoutService: LayoutService,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private splashScreenService: SplashScreenService) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


    this.navigationService.items = [
      {
        type: 'link',
        label: 'Dashboard',
        route: '/principal/tablero',
        icon: icLayers,
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'subheading',
        label: 'Evaluaciones',
        rol : ['1','2'],
        children: [
          // EVALUACIONES
          {
            type: 'dropdown',
            label: 'Evaluación de la carrera',
            icon: icFat,
            children: [
              {
                type: 'link',
                label: 'Modelo Carrera',
                route: '/principal/evaluaciones/modelo-carrera'
              },
            ]
          },
        ]
      },
      {
        type: 'subheading',
        label: 'Modulos',
        rol : ['1', '1'],
        children: [
          // CONFIGURACIONES
          {
            type: 'dropdown',
            label: 'Configuraciones',
            icon: icSettings,
            children: [
              {
                type: 'link',
                label: 'Periodo Lectivo',
                route: '/principal/configuraciones/periodo-lectivo'
              },
              {
                type: 'link',
                label: 'Criterio',
                route: '/principal/configuraciones/criterios'
              },
              {
                type: 'link',
                label: 'Subcriterios',
                route: '/principal/configuraciones/subcriterios'
              },
              {
                type: 'link',
                label: 'Indicadores',
                route: '/principal/configuraciones/indicadores'
              },
            ]
          },
          {
            type: 'dropdown',
            label: 'Personal',
            icon: icHowToReg,
            children: [
              {
                type: 'link',
                label: 'Evaluadores',
                route: '/principal/personal/evaluadores'
              },
            ]
          },
        ]
      },
      
    ];
  }
}
