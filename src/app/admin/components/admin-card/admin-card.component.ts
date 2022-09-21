import { Component, Input, OnInit } from '@angular/core';
import { AdminDto } from './../../model/adminDto.model';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss'],
})
export class AdminCardComponent implements OnInit {
  @Input() admin: AdminDto;

  constructor() {}

  deleteAdmin() {}

  editAdmin() {}

  ngOnInit(): void {}
}
