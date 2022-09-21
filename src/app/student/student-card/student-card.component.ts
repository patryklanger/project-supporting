import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StudentsState } from '../store/reducers';
import { deleteStudentInit } from '../store/students.actions';
import { Student } from './../model/student.model';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent implements OnInit {
  @Input() student: Student;

  constructor(private router: Router, private store: Store<StudentsState>) {}

  editStudent() {
    this.router.navigateByUrl(`/student/edit/${this.student.id}`);
  }
  deleteStudent() {
    this.store.dispatch(deleteStudentInit({ id: this.student.id }));
  }

  ngOnInit(): void {}
}
