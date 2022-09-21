import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  concatMap,
  debounceTime,
  Observable,
  Subject,
  takeUntil,
  filter,
  map,
  tap,
  of,
  from,
} from 'rxjs';
import { Student } from 'src/app/student/model/student.model';
import { GroupsActions } from '../../store/action-types';
import { GroupState } from '../../utils/groupState.model';
import { StudentService } from './../../../student/service/student.service';
import { AddStudentsDialogData } from './utils/add-students-dialog-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-students-component',
  templateUrl: './add-students-component.component.html',
  styleUrls: ['./add-students-component.component.scss'],
})
export class AddStudentsComponentComponent implements OnInit {
  studentCtrl: FormControl = new FormControl();

  studentFilterCtrl: FormControl = new FormControl();

  students$: Observable<Student[]>;

  students: Student[];

  addedStudents$: Observable<Student[]>;

  addedIds$: Subject<string[]> = new Subject();

  addedStudentsIds: string[] = [];

  protected _onDestroy = new Subject<void>();

  constructor(
    private studentService: StudentService,
    private store: Store<GroupState>,
    public dialogRef: MatDialogRef<AddStudentsComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddStudentsDialogData,
    private _snackBar: MatSnackBar
  ) {}

  addStudentToList() {
    console.log(this.data.studentIdsInGroup);
    if (this.data.studentIdsInGroup.includes(this.studentCtrl.value)) {
      this._snackBar.open('Student currently in group', 'OK!');
      return;
    }
    this.addedStudentsIds.push(this.studentCtrl.value);
    this.addedIds$.next([...new Set(this.addedStudentsIds)]);
  }

  onStudentDeleted(id: string) {
    let newAddedStudentsIds = [...new Set(this.addedStudentsIds)];
    newAddedStudentsIds = newAddedStudentsIds.filter(
      (filteredId) => filteredId != id
    );
    this.addedStudentsIds = newAddedStudentsIds;
    this.addedIds$.next(this.addedStudentsIds);
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.students$ = this.studentFilterCtrl.valueChanges.pipe(
      takeUntil(this._onDestroy),
      debounceTime(500),
      concatMap(() =>
        this.studentService.getStudentByName(this.studentFilterCtrl.value)
      ),
      tap((students) => (this.students = students))
    );
    this.addedStudents$ = this.addedIds$.pipe(
      tap((ids) => console.log(ids)),
      map((ids) => this.students.filter((stu) => ids.includes(stu.id)))
    );
  }

  onDoneClick() {
    this.store.dispatch(
      GroupsActions.addStudentsToGroupInit({
        groupId: this.data.groupId,
        studentsIds: this.addedStudentsIds,
      })
    );
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
