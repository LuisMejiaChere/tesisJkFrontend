import { Component, OnInit, ViewChild } from '@angular/core';

import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'vex-custom-layout-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  
  }
}
