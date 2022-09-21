import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminUserState } from './../../store/reducers/index';
import { getAllUsersInit } from '../../store/adminUser.actions';
import { selectAllAdminUsers } from '../../store/adminUser.selectors';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss'],
})
export class AllUserComponent implements OnInit {
  users$: any;

  constructor(private store: Store<AdminUserState>) {
    store.dispatch(getAllUsersInit({ page: 1, limit: 50 }));
  }

  ngOnInit(): void {
    this.users$ = this.store.select(selectAllAdminUsers);
  }
}
