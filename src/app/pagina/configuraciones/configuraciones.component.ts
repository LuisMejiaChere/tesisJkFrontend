import { Component, OnInit, ViewChild } from '@angular/core';

import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'vex-custom-layout-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss']
})
export class ConfiguracionesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  
  }
}
