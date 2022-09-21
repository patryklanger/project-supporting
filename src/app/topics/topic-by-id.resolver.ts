import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { first, Observable, of, tap, finalize } from 'rxjs';
import { TopicsState } from './store/reducers';
import { loadAllTopics, loadTopicById } from './store/topics.actions';

@Injectable({
  providedIn: 'root',
})
export class TopicByIdResolver implements Resolve<boolean> {
  loading: boolean = false;

  constructor(private store: Store<TopicsState>) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const topicId = route.params['id'];
    return this.store.pipe(
      tap(() => {
        this.loading = true;
        this.store.dispatch(loadTopicById({ topicId }));
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
