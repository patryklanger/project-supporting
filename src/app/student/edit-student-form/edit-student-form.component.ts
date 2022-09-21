import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './edit-student-form.component.html',
  styleUrls: ['./edit-student-form.component.scss'],
})
export class EditStudentFormComponent implements OnInit {
  student: Student = {
    firstName: '',
    lastName: '',
    birthDate: '',
  };

  studentForm: FormGroup;

  @Input() studentToEdit$: Observable<Student>;

  @Output() editStudent = new EventEmitter<Student>();

  constructor(public datepipe: DatePipe) {
    this.studentForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    let birthdate: Date = this.birthdate.value;

    let edditedStudent: Student = {
      id: this.student.id,
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      birthDate: this.datepipe.transform(birthdate, 'yyyy-MM-dd'),
    };

    this.editStudent.emit(edditedStudent);
    this.resetForm();
  }

  resetForm() {
    this.firstname.setValue('');
    this.lastname.setValue('');
    this.birthdate.setValue('');
    Object.keys(this.studentForm.controls).forEach((key) => {
      this.studentForm.get(key)?.setErrors(null);
    });
    this.studentForm.markAsUntouched();
  }

  get firstname() {
    return this.studentForm.get('firstname');
  }

  get lastname() {
    return this.studentForm.get('lastname');
  }

  get birthdate() {
    return this.studentForm.get('birthdate');
  }

  updateForm() {
    if (!this.student) return;
    this.firstname.setValue(this.student.firstName);
    this.lastname.setValue(this.student.lastName);
    this.birthdate.setValue(this.student.birthDate);
  }

  ngOnInit(): void {
    if (this.studentToEdit$) {
      this.studentToEdit$.subscribe((topic) => {
        this.student = topic;
        this.updateForm();
      });
    }
  }
}
