import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap, first, finalize } from 'rxjs';
import { StudentsState } from './store/reducers/index';
import { getStudentsInit } from './store/students.actions';

@Injectable({
  providedIn: 'root',
})
export class StudentResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store<StudentsState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let page = route.params['id'];
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(getStudentsInit({ page: page }));
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
