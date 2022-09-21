import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, first, tap, finalize } from 'rxjs';
import { LecturersState } from './store/reducers';
import { getLecturerByIdInit } from './store/lecturer.actions';

@Injectable({
  providedIn: 'root',
})
export class LecturerByIdResolver implements Resolve<boolean> {
  loading: boolean = false;

  constructor(private store: Store<LecturersState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    var id = route.params['id'];
    var idNum: number = parseInt(id);
    console.log(`resolving id: ${idNum}`);
    return this.store.pipe(
      tap(() => {
        this.loading = true;
        this.store.dispatch(getLecturerByIdInit({ id: idNum }));
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
