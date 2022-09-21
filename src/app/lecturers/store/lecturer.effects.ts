import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LecturerService } from './../services/lecturer.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LecturerActions } from './action-types';
import { concatMap, map, tap } from 'rxjs';
import { LecturersState } from './reducers';
import { Store } from '@ngrx/store';
import {
  addLecturerSuccess,
  addLecturerFail,
  getLecturersSuccess,
  getLecturerByIdSuccess,
  editLecturerSuccess,
} from './lecturer.actions';
import { Router } from '@angular/router';

@Injectable()
export class LecturerEffects {
  initCreatingLecturer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LecturerActions.addLecturerInit),
        concatMap(async (action) =>
          this.lecturerService.createLecturer(action.lecturer).subscribe({
            next: (res) =>
              this.store.dispatch(addLecturerSuccess({ lecturer: res })),
            error: (res) => {
              this.store.dispatch(addLecturerFail({ error: res }));
            },
          })
        )
      ),
    { dispatch: false }
  );

  creatingLecturerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LecturerActions.addLecturerSuccess),
        tap((action) => {
          this.showDialog(
            'Success!',
            `Successfully created lecturer named ${action.lecturer.firstName} ${action.lecturer.lastName}`
          );
          this.router.navigateByUrl('/lecturer/all');
        })
      ),
    { dispatch: false }
  );

  creatingLecturerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LecturerActions.addLecturerFail),
        tap((action) => {
          this.dialogService.openErrorDialog(action.error);
        })
      ),
    { dispatch: false }
  );

  fetchingLecturers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LecturerActions.getLecturersInit),
      concatMap((action) => this.lecturerService.getLecturers(action.page, 20)),
      map((lecturers) => getLecturersSuccess({ lecturers: lecturers }))
    )
  );

  fetchingLecturersSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(LecturerActions.getLecturersSuccess)),
    { dispatch: false }
  );

  fetchingLecturerByIdInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LecturerActions.getLecturerByIdInit),
      concatMap((action) => this.lecturerService.getLecturer(action.id)),
      map((lecturer) => getLecturerByIdSuccess({ lecturer }))
    )
  );

  deleteLecturerInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LecturerActions.deleteLecturerInit),
        concatMap((action) => this.lecturerService.deleteLecturer(action.id)),
        tap((res) => {
          if (res) {
            this.dialogService.openDialog(
              'Success!',
              'Successfully deleted lecturer!'
            );
            this.router.navigateByUrl('/lecturer/all');
          }
        })
      ),
    { dispatch: false }
  );

  editLecturerInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LecturerActions.editLecturerInit),
      concatMap((action) => this.lecturerService.editLecturer(action.lecturer)),
      map((res) => editLecturerSuccess({ lecturer: res }))
    )
  );

  editLecturerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LecturerActions.editLecturerSuccess),
        tap(() => this.router.navigateByUrl('/lecturer/all'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private lecturerService: LecturerService,
    private dialogService: DialogService,
    private store: Store<LecturersState>,
    private router: Router
  ) {}

  showDialog(title: string, content: string) {
    this.dialogService.openDialog(title, content);
  }
}
