import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserAccount } from './../../../model/userAccount.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output() user = new EventEmitter<UserAccount>();
  @Input() userInput: UserAccount = {
    username: '',
    password: '',
    email: '',
  };

  passwordsNotEqual = false;

  userTemp: UserAccount;

  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onFormSubmit() {
    if (!this.userForm.valid) return;
    if (this.password.value != this.confirmPassword.value) {
      this.passwordsNotEqual = true;
      return;
    }

    this.userTemp = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
    };

    this.user.emit(this.userTemp);
  }

  resetForm() {
    this.username.setValue('');
    this.password.setValue('');
    this.email.setValue('');
    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key).setErrors(null);
    });
    this.userForm.markAsUntouched();
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  get email() {
    return this.userForm.get('email');
  }

  ngOnInit(): void {
    if (this.userInput) {
      this.username.setValue(this.userInput.username);
      this.email.setValue(this.userInput.email);
    }
  }
}
