import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAccount } from 'src/app/model/userAccount.model';
import { Student } from '../model/student.model';
import { SemesterState } from 'src/app/semesters/store/reducers';
import { Store, select } from '@ngrx/store';
import { selectAllSemesters } from 'src/app/semesters/store/semester.selectors';
import { Observable } from 'rxjs';
import { Semester } from 'src/app/model/semester.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  @Output() studentCreated = new EventEmitter<Student>();

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
  };

  userDetails: UserAccount;

  semesters$: Observable<Semester[]>;

  studentForm: FormGroup;

  constructor(
    private semesterStore: Store<SemesterState>,
    public datepipe: DatePipe
  ) {
    this.semesters$ = semesterStore.pipe(select(selectAllSemesters));
    this.studentForm = new FormGroup({
      id: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      semester: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    let birthdate: Date = this.birthdate.value;
    this.student.id = this.id.value;
    this.student.firstName = this.firstname.value;
    this.student.lastName = this.lastname.value;
    this.student.birthDate = this.datepipe.transform(birthdate, 'yyyy-MM-dd');
    this.student.studentSemesterIdList = [];
    this.student.studentSemesterIdList.push(this.semester.value);

    console.log(this.student);

    this.studentCreated.emit(this.student);
    this.resetForm();
  }

  resetForm() {
    this.firstname.setValue('');
    this.id.setValue('');
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
  get semester() {
    return this.studentForm.get('semester');
  }
  get id() {
    return this.studentForm.get('id');
  }

  ngOnInit(): void {}
}
