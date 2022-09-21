import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, Observable, of, tap } from 'rxjs';
import { GroupsState } from './store/reducers';
import { getGroupByIdInit } from './store/groups.actions';

@Injectable({
  providedIn: 'root',
})
export class GroupByIdResolver implements Resolve<boolean> {
  loading: boolean = false;

  constructor(private store: Store<GroupsState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params['id'];
    return this.store.pipe(
      tap(() => {
        this.loading = true;
        this.store.dispatch(getGroupByIdInit({ id }));
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
