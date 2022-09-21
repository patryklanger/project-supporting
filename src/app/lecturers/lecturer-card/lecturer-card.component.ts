import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/reducers';
import { deleteLecturerInit } from '../store/lecturer.actions';
import { LecturersState } from '../store/reducers';
import { Lecturer } from './../models/lecturer.model';
import { Observable } from 'rxjs';
import { hasStudentRole } from './../../store/app.selectors';
import { hasLecturerRole } from 'src/app/store/app.selectors';

@Component({
  selector: 'app-lecturer-card',
  templateUrl: './lecturer-card.component.html',
  styleUrls: ['./lecturer-card.component.scss'],
})
export class LecturerCardComponent implements OnInit {
  @Input() lecturer: Lecturer;

  hasStudentRole$: Observable<boolean>;

  hasLecturerRole$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<LecturersState>,
    private authStore: Store<AuthState>
  ) {}

  editLecturer() {
    this.router.navigateByUrl(`/lecturer/edit/${this.lecturer.id}`);
  }

  deleteLecturer() {
    this.store.dispatch(deleteLecturerInit({ id: this.lecturer.id }));
  }

  ngOnInit(): void {
    this.hasStudentRole$ = this.authStore.select(hasStudentRole);

    this.hasLecturerRole$ = this.authStore.select(hasLecturerRole);
  }
}
