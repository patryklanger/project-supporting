export const semesterFeatureKey = 'semester';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Semester } from '../../../model/semester.model';
import { createReducer, on } from '@ngrx/store';
import { SemesterActions } from '../action-types';

export const semestersFeatureKey = 'currentSemester';

export interface CurrentSemesterState {
  current: Semester;
  error: string | null;
}

export const initialCurrentSemesterState: CurrentSemesterState = {
  current: undefined,
  error: null,
};

export const currentSemesterReducer = createReducer(
  initialCurrentSemesterState,
  on(SemesterActions.currentSemesterSet, (state, action) => {
    return { current: action.current, error: null };
  })
);
