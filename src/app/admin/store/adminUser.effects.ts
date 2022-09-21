import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserService } from './../services/user.service';
import { AdminUserActions } from './action-types';
import { AdminUserState } from './reducers/index';
import { concatMap, noop, catchError } from 'rxjs';
import { getAllUsersSuccess } from './adminUser.actions';

@Injectable()
export class AdminUserEffects {
  initFetchingUsers = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminUserActions.getAllUsersInit),
        concatMap(async (action) =>
          this.userService.getAllUsers(action.page, action.limit).subscribe({
            next: (res) => {
              console.log(res);
              this.store.dispatch(getAllUsersSuccess({ paginatedUsers: res }));
            },
            error: (err) => console.log(err),
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AdminUserState>
  ) {}
}
