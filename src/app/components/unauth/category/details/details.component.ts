import { Component, OnInit } from '@angular/core';
import * as bootbox from 'bootbox';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  show() {
   bootbox.alert('hello word');
  }

}
