import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentsState } from './reducers/index';
import * as fromStudents from './reducers/index';

export const selectStudentsState =
  createFeatureSelector<StudentsState>('students');

export const selectAllStudents = createSelector(
  selectStudentsState,
  fromStudents.selectAll
);

export const selectStudentsPagination = createSelector(
  selectStudentsState,
  (state) => state.pagination
);
export const selectStudentsPagesAmount = createSelector(
  selectStudentsState,
  (state) => {
    return Math.ceil(state.pagination.totalCount / state.limit);
  }
);
export const selectStudentsPageLimit = createSelector(
  selectStudentsState,
  (state) => state.limit
);
