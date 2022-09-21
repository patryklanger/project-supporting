import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lecturer } from './../../models/lecturer.model';

@Component({
  selector: 'app-new-lecturer-form',
  templateUrl: './new-lecturer-form.component.html',
  styleUrls: ['./new-lecturer-form.component.scss'],
})
export class NewLecturerFormComponent implements OnInit {
  @Output() lecturerCreated = new EventEmitter<Lecturer>();

  lecturer: Lecturer;

  lecturerForm: FormGroup;

  constructor() {
    this.lecturerForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      subject: new FormControl(''),
      academicDegree: new FormControl(''),
      cathedral: new FormControl(''),
    });
  }

  onFormSubmit() {
    if (!this.lecturerForm.valid) return;
    const lecturer: Lecturer = {
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      subject: this.subject.value,
      academicDegree: this.academicDegree.value,
      cathedral: this.cathedral.value,
    };
    this.lecturer = {
      ...lecturer,
    };

    this.lecturerCreated.emit(this.lecturer);
    this.resetForm();
  }

  resetForm() {
    this.firstname.setValue('');
    this.lastname.setValue('');
    this.subject.setValue('');
    this.academicDegree.setValue('');
    this.cathedral.setValue('');
    Object.keys(this.lecturerForm.controls).forEach((key) => {
      this.lecturerForm.get(key)?.setErrors(null);
    });
    this.lecturerForm.markAsUntouched();
  }

  get firstname() {
    return this.lecturerForm.get('firstname');
  }

  get lastname() {
    return this.lecturerForm.get('lastname');
  }

  get subject() {
    return this.lecturerForm.get('subject');
  }

  get academicDegree() {
    return this.lecturerForm.get('academicDegree');
  }

  get cathedral() {
    return this.lecturerForm.get('cathedral');
  }

  ngOnInit(): void {}
}
