import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../model/admin.model';

@Component({
  selector: 'app-new-admin-form',
  templateUrl: './new-admin-form.component.html',
  styleUrls: ['./new-admin-form.component.scss'],
})
export class NewAdminFormComponent implements OnInit {
  @Output() adminCreated = new EventEmitter<Admin>();

  admin: Admin;

  adminForm: FormGroup;
  constructor() {
    this.adminForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    if (!this.adminForm.valid) return;
    const admin: Admin = {
      firstName: this.firstname.value,
      lastName: this.lastname.value,
    };
    this.adminCreated.emit(admin);
    this.resetForm();
  }

  resetForm() {
    this.firstname.setValue('');
    this.lastname.setValue('');
    Object.keys(this.adminForm.controls).forEach((key) => {
      this.adminForm.get(key)?.setErrors(null);
    });
    this.adminForm.markAsUntouched();
  }

  get firstname() {
    return this.adminForm.get('firstname');
  }

  get lastname() {
    return this.adminForm.get('lastname');
  }

  ngOnInit(): void {}
}
