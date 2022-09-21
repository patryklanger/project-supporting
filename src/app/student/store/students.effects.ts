import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentService } from '../service/student.service';
import { StudentActions } from './action-types';
import {
  concatMap,
  map,
  catchError,
  throwError,
  tap,
  Observable,
  of,
} from 'rxjs';
import {
  addStudentSuccess,
  addStudentFailure,
  getStudentsSuccess,
  getStudentsFail,
  getStudentByIdSuccess,
  getStudentByIdFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
  editStudentSuccess,
  editStudentFailure,
} from './students.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from './../model/student.model';

@Injectable()
export class StudentEffects {
  initCreatingStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudentInit),
      concatMap((action) =>
        this.studentService.createStudent(action.student).pipe(
          map((res: Student) => addStudentSuccess({ student: res })),
          catchError((err: HttpErrorResponse) => {
            return of(addStudentFailure({ error: err.error.message }));
          })
        )
      ),
      catchError((err: HttpErrorResponse) => {
        return of(addStudentFailure({ error: err.error.message }));
      })
    )
  );

  addStudentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.addStudentSuccess),
        tap(() => this.router.navigateByUrl('/student/all'))
      ),
    { dispatch: false }
  );

  addStudentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.addStudentFailure),
        tap((e) => this.dialogService.openDialog('Error', e.error))
      ),
    { dispatch: false }
  );

  fetchStudentsInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.getStudentsInit),
      concatMap((action) =>
        this.studentService.getStudents(action.page, 20).pipe(
          map((students: any) => getStudentsSuccess({ students })),
          catchError((error: HttpErrorResponse) =>
            of(getStudentsFail({ error: error.error.message }))
          )
        )
      ),
      catchError((error: HttpErrorResponse) =>
        of(getStudentsFail({ error: error.error.message }))
      )
    )
  );

  fetchStudentsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.getStudentsFail),
        tap((action) => this.dialogService.openDialog('Error', action.error))
      ),
    { dispatch: false }
  );

  fetchStudentInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.getStudentByIdInit),
      concatMap((action) => this.studentService.getStudent(action.id)),
      map((student: any) => getStudentByIdSuccess({ student })),
      catchError((error: HttpErrorResponse) =>
        of(getStudentByIdFailure({ error: error.error.message }))
      )
    )
  );

  fetchStudentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.getStudentByIdFailure),
        tap((action) => this.dialogService.openDialog('Error', action.error))
      ),
    { dispatch: false }
  );

  deleteStudentInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.deleteStudentInit),
        tap((e) => deleteStudentSuccess({ id: e.id })),
        concatMap((e) => this.studentService.deleteStudent(e.id)),
        catchError((e: HttpErrorResponse) => {
          return of(deleteStudentFailure({ error: e.message }));
        })
      ),
    { dispatch: false }
  );

  deleteStudentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.deleteStudentSuccess),
        tap(() => this.router.navigateByUrl('/student/all'))
      ),
    { dispatch: false }
  );

  deleteStudentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.deleteStudentFailure),
        tap((action) => console.error(action.error))
      ),
    { dispatch: false }
  );

  editStudentInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.editStudentInit),
      concatMap((action) =>
        this.studentService.editStudent(action.student).pipe(
          map((student) => editStudentSuccess({ student })),
          catchError((error: HttpErrorResponse) =>
            of(editStudentFailure({ error: error.error.message }))
          )
        )
      ),
      catchError((error: HttpErrorResponse) =>
        of(editStudentFailure({ error: error.error.message }))
      )
    )
  );

  editStudentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.editStudentSuccess),
        tap(() => this.router.navigateByUrl('/student/all'))
      ),
    { dispatch: false }
  );

  editStudentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentActions.editStudentFailure),
        tap((action) => {
          console.log(action);
          this.dialogService.openDialog('Error!', action.error);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error.message) errorMessage = error.error.message;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    this.dialogService.openDialog('Error!', errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
