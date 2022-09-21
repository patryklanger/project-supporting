import { Component, OnInit } from '@angular/core';
import { UserAccount } from 'src/app/model/userAccount.model';
import { CreateAdminUser } from './../model/createAdminUser.model';
import { Admin } from './../model/admin.model';
import { AdminState } from '../store/reducers/admin.reducer';
import { Store } from '@ngrx/store';
import { createAdminInit } from '../store/admin.actions';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  isUserInfoCreated = false;

  userAdmin: CreateAdminUser;

  user: UserAccount;

  formProgress = 0;

  admin: Admin;
  constructor(private store: Store<AdminState>) {}

  onUserInfo(payload: UserAccount) {
    this.user = payload;
    this.isUserInfoCreated = true;
    this.formProgress = 50;
  }

  goBackToUserInfo() {
    this.isUserInfoCreated = false;
    this.formProgress = 0;
  }

  onAdminInfo(payload: Admin) {
    this.admin = payload;
    this.userAdmin = {
      ...this.user,
      ...this.admin,
    };
    console.log(this.userAdmin);
    this.store.dispatch(createAdminInit({ admin: this.userAdmin }));
    this.isUserInfoCreated = false;
    this.formProgress = 0;
  }
  ngOnInit(): void {}
}
