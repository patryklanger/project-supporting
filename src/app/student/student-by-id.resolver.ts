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
import { getStudentByIdInit } from './store/students.actions';

@Injectable({
  providedIn: 'root',
})
export class StudentByIdResolver implements Resolve<boolean> {
  loading: boolean = false;

  constructor(private store: Store<StudentsState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    var id = route.params['id'];
    return this.store.pipe(
      tap(() => {
        this.loading = true;
        this.store.dispatch(getStudentByIdInit({ id }));
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
