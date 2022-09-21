import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, shareReplay } from 'rxjs';
import { Lecturer } from '../models/lecturer.model';
import { editLecturerInit } from '../store/lecturer.actions';
import { selectAllLecturers } from '../store/lecturer.selectors';
import { LecturersState } from '../store/reducers';

@Component({
  selector: 'app-edit-lecturer-lay',
  templateUrl: './edit-lecturer-lay.component.html',
  styleUrls: ['./edit-lecturer-lay.component.scss'],
})
export class EditLecturerLayComponent implements OnInit {
  lecturerId: string;

  lecturerToEdit$: Observable<Lecturer>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<LecturersState>
  ) {}

  onFormSubmit(event: Lecturer) {
    console.log(event);
    this.store.dispatch(editLecturerInit({ lecturer: event }));
  }

  fetchData(id: number) {
    this.lecturerToEdit$ = this.store.pipe(
      select(selectAllLecturers),
      map((topics) => topics.find((topic) => topic.id == id)),
      shareReplay()
    );
  }

  ngOnInit(): void {
    this.lecturerId = this.activatedRoute.snapshot.paramMap.get('id');

    const id = parseInt(this.lecturerId);
    if (isNaN(id)) return;
    this.fetchData(id);
    console.log(this.lecturerId);
  }
}
