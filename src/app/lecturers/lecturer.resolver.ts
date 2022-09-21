import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, Observable, of, tap } from 'rxjs';
import { getLecturersInit } from './store/lecturer.actions';
import { LecturersState } from './store/reducers';

@Injectable({
  providedIn: 'root',
})
export class LecturerResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store<LecturersState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let page = route.params['id'];
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(getLecturersInit({ page: page }));
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
