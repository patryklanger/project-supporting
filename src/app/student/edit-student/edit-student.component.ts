import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Student } from '../model/student.model';
import { ActivatedRoute } from '@angular/router';
import { StudentsState } from '../store/reducers';
import { select, Store } from '@ngrx/store';
import { selectAllStudents } from '../store/students.selectors';
import { editStudentInit } from './../store/students.actions';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  studentId: string;

  studentToEdit$: Observable<Student>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<StudentsState>
  ) {}

  onFormSubmit(event: any) {
    this.store.dispatch(editStudentInit({ student: event }));
  }

  fetchData(id: string) {
    this.studentToEdit$ = this.store.pipe(
      select(selectAllStudents),
      map((students) => students.find((student) => student.id == id)),
      shareReplay()
    );
  }

  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');

    this.fetchData(this.studentId);
  }
}
