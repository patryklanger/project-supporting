import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SemesterState } from 'src/app/semesters/store/reducers';
import { CurrentSemesterState } from './reducers/current-semester';
import * as fromSemesters from './reducers/index';

export const selectSemestersState =
  createFeatureSelector<SemesterState>('semesters');

export const selectCurrentSemestersState =
  createFeatureSelector<CurrentSemesterState>('currentSemester');

export const selectAllSemesters = createSelector(
  selectSemestersState,
  fromSemesters.selectAll
);

export const selectCurrentSemester = createSelector(
  selectCurrentSemestersState,
  (state) => state.current
);
