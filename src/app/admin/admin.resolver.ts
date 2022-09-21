import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap, first, finalize } from 'rxjs';
import { getAdminsInit } from './store/admin.actions';
import { AdminState } from './store/reducers/admin.reducer';

@Injectable({
  providedIn: 'root',
})
export class AdminResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store<AdminState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let page = route.params['id'];
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(getAdminsInit({ page: page, limit: 20 }));
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
