import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { SemesterActions } from './action-types';
import { concatMap, map, catchError, of, tap } from 'rxjs';
import { SemesterService } from '../services/semester.service';
import {
  fetchSemestersSuccessful,
  fetchSemestersFailure,
} from './semester.actions';
import { GroupsState } from 'src/app/groups/store/reducers';
import { Store } from '@ngrx/store';
import { deleteAllGroups } from './../../groups/store/groups.actions';

@Injectable()
export class SemesterEffects {
  tryToFetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActions.tryFetchSemesters),
      concatMap((action) => this.semesterService.getSemesters()),
      map((semesters) => fetchSemestersSuccessful({ semesters })),
      catchError(() => of(fetchSemestersFailure()))
    )
  );

  currentSemesterSet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SemesterActions.currentSemesterSet),
        tap(() => this.groupStore.dispatch(deleteAllGroups()))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private semesterService: SemesterService,
    private groupStore: Store<GroupsState>
  ) {}
}
