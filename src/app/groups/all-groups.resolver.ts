import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, Observable, of, tap } from 'rxjs';
import { GroupsActions } from './store/action-types';
import { GroupsState } from './store/reducers';

@Injectable({
  providedIn: 'root',
})
export class AllGroupsResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<GroupsState>) {}

  resolve(router: ActivatedRouteSnapshot): Observable<any> {
    let page = 1;
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(
            GroupsActions.loadAllGroupsForSemesterInit({
              page: page,
              limit: 20,
            })
          );
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
