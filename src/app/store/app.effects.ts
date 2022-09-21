import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, noop, tap } from 'rxjs';
import { AuthActions } from './action-types';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from './../model/user.model';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/reducers';
import { saveLoggedUser, tryToLogin } from './app.actions';

@Injectable()
export class AppEffects {
  private _login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        map((action) => {
          const claims: any = this.oauthService.getIdentityClaims();
          if (claims === null || claims === undefined) {
            this.oauthService.initCodeFlow();
            return null;
          } else {
            const user: User = {
              id: claims.sub,
              username: claims.preferred_username,
              roles: claims.realm_access.roles,
            };
            return user;
          }
        }),
        tap((user) => {
          if (user === null) this.store.dispatch(tryToLogin());
          else this.store.dispatch(saveLoggedUser({ user }));
        })
      ),
    { dispatch: false }
  );
  public get login$() {
    return this._login$;
  }
  public set login$(value) {
    this._login$ = value;
  }

  tryLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.tryToLogin),
        tap(() => {
          const claims: any = this.oauthService.getIdentityClaims();
          if (claims === null || claims === undefined) {
            return null;
          } else {
            const user: User = {
              id: claims.sub,
              username: claims.preferred_username,
              roles: claims.realm_access.roles,
            };
            this.store.dispatch(saveLoggedUser({ user }));
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.oauthService.revokeTokenAndLogout();
          this.oauthService.logOut();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private oauthService: OAuthService,
    private store: Store<AuthState>
  ) {}
}
