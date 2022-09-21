import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AdminActions } from './action-types';
import { AdminState } from './reducers/admin.reducer';
import { concatMap, map, catchError, of, tap } from 'rxjs';
import { AdminService } from './../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { createAdminFailure } from './admin.actions';
import { Router } from '@angular/router';

@Injectable()
export class AdminEffects {
  getAdminsInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getAdminsInit),
      concatMap((action) =>
        this.adminService.getAdmins(action.page, action.limit)
      ),
      map((admins) => AdminActions.getAdminsSuccess({ admins })),
      catchError((error: HttpErrorResponse) =>
        of(AdminActions.getAdminFailure({ error: error.error.message }))
      )
    )
  );

  getAdminFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getAdminFailure),
        tap((action) => this.dialogService.openDialog('Error!', action.error))
      ),
    { dispatch: false }
  );

  createAdminInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createAdminInit),
      concatMap((action) => this.adminService.createAdmin(action.admin)),
      map((admin) => AdminActions.createAdminSuccess({ admin })),
      catchError((error: HttpErrorResponse) =>
        of(AdminActions.createAdminFailure({ error: error.error.message }))
      )
    )
  );

  createAdminFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.createAdminFailure),
        tap((action) => this.dialogService.openDialog('Error!', action.error))
      ),
    { dispatch: false }
  );

  createAdminSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.createAdminSuccess),
        tap(() => this.router.navigateByUrl('/admin/admin/all'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AdminState>,
    private adminService: AdminService,
    private dialogService: DialogService,
    private router: Router
  ) {}
}
