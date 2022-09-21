import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteUserInit } from '../../store/adminUser.actions';
import { AdminUserState } from '../../store/reducers';
import { AdminUser } from './../../model/adminUser.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: AdminUser;

  constructor(private store: Store<AdminUserState>) {}

 

  ngOnInit(): void {}
}
