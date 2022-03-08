import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
@Component({
  selector: 'vex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  icMoreVert = icMoreVert;
  layoutCtrl = new FormControl('boxed');
  ngOnInit(): void {
  }

}
