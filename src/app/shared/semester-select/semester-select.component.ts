import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Semester } from 'src/app/model/semester.model';
import { SemesterState } from 'src/app/semesters/store/reducers';
import { selectAllSemesters } from 'src/app/semesters/store/semester.selectors';

@Component({
  selector: 'app-semester-select',
  templateUrl: './semester-select.component.html',
  styleUrls: ['./semester-select.component.scss'],
})
export class SemesterSelectComponent implements OnInit {
  @Output() onSemesterSelected = new EventEmitter<Semester>();

  selectedOption = '';

  semesters$: Observable<Semester[]>;

  constructor(private semesterStore: Store<SemesterState>) {}

  semesterSelected(event: Number) {
    this.semesters$
      .pipe(
        map((semesters) => semesters.find((semester) => semester.id == event))
      )
      .subscribe((selectedSemester) => {
        this.onSemesterSelected.emit(selectedSemester);
      });
  }

  ngOnInit(): void {
    this.semesters$ = this.semesterStore.pipe(select(selectAllSemesters));
  }
}
