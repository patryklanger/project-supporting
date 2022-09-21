import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TopicActions } from './action-types';
import { TopicService } from '../services/topic.service';
import { concatMap, map, of, tap } from 'rxjs';
import {
  allTopicsLoaded,
  topicLoadingSuccess,
  creatingNewTopicSuccess,
  creatingNewTopicFail,
} from './topics.actions';
import { DialogService } from './../../shared/services/dialog.service';
import { Router } from '@angular/router';
import { Topic } from './../model/topic';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TopicsEffects {
  loadTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TopicActions.loadAllTopics),
      concatMap((action) => this.topicsService.getAllTopics(action.page, 20)),
      map((topics) => allTopicsLoaded({ topics }))
    )
  );

  createNewTopic$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TopicActions.initCreatingNewTopic),
        concatMap((action) =>
          this.topicsService.createTopic(action.topic).pipe(
            map((info) => creatingNewTopicSuccess({ topic: info })),
            catchError(() => of(creatingNewTopicFail()))
          )
        )
      ),
    { dispatch: true }
  );

  createNewTopicSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TopicActions.creatingNewTopicSuccess),
        tap((action) =>
          this.dialogService.openDialog(
            'Successfully added topic!',
            `You have just added topic named ${action.topic.topicName}`
          )
        )
      ),
    { dispatch: false }
  );

  loadTopicById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TopicActions.loadTopicById),
        concatMap((action) =>
          this.topicsService.getTopicById(parseInt(action.topicId))
        ),
        map((topic: Topic) => topicLoadingSuccess({ topic }))
      ),
    { dispatch: true }
  );

  loadingTopicByIdFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TopicActions.topicLoadingFailure),
      tap(() => {
        this.router.navigateByUrl('/error');
      })
    )
  );

  deleteTopic$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TopicActions.deleteTopic),
        concatMap((action) =>
          this.topicsService.deleteTopic(action.topicId).pipe(
            tap(() => {
              this.router.navigateByUrl(`/topic/all`);
              this.showDialog('Success!', 'Successfully deleted a task!');
            })
          )
        )
      ),
    { dispatch: false }
  );

  editTopicInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TopicActions.editTopicInit),
      concatMap((action) =>
        this.topicsService.editTopic(action.topic).pipe(
          map((topic) => TopicActions.editTopicSuccess({ topic })),
          catchError((error) => of(TopicActions.editTopicFail({ error })))
        )
      ),

      catchError((error) => of(TopicActions.editTopicFail({ error })))
    )
  );

  editTopicSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TopicActions.editTopicSuccess),
        tap((action) => this.router.navigateByUrl('/topic/' + action.topic.id))
      ),
    { dispatch: false }
  );

  editTopicFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TopicActions.editTopicFail),
        tap((action) => this.dialogService.openErrorDialog(action.error))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private topicsService: TopicService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  showDialog(title: string, content: string) {
    this.dialogService.openDialog(title, content);
  }
}
