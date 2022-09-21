import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, Observable, tap, shareReplay } from 'rxjs';
import { AppState } from 'src/app/store/app-store';
import { TopicsState } from './store/reducers';
import { loadAllTopics } from './store/topics.actions';

@Injectable()
export class TopicsResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<TopicsState>) {}
  resolve(router: ActivatedRouteSnapshot): Observable<any> {
    let page = router.params['id'];
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllTopics({ page: page, limit: 20 }));
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
