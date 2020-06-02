import {Component, Input, OnInit} from '@angular/core';
import {Update} from '../../../../../../../models/project/update';

@Component({
  selector: 'app-auth-update-entity',
  templateUrl: './auth-update-entity.component.html',
  styleUrls: ['./auth-update-entity.component.css']
})
export class AuthUpdateEntityComponent implements OnInit {
  @Input() update: Update;

  constructor() { }

  ngOnInit(): void {
  }

}
