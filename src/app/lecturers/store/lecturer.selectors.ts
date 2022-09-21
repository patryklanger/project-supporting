import { EntityCollection } from '@ngrx/data';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LecturersState } from './reducers';
import * as fromLecturers from './reducers/index';
import { Lecturer } from './../models/lecturer.model';

export const selectLecturersState =
  createFeatureSelector<LecturersState>('lecturers');

export const selectAllLecturers = createSelector(
  selectLecturersState,
  fromLecturers.selectAll
);

export const selectLecturersPagination = createSelector(
  selectLecturersState,
  (state) => state.pagination
);

export const selectLecturersPagesAmount = createSelector(
  selectLecturersState,
  (state) => {
    return Math.ceil(state.pagination.totalCount / state.limit);
  }
);

export const selectLecturersPageLimit = createSelector(
  selectLecturersState,
  (state) => state.limit
);
