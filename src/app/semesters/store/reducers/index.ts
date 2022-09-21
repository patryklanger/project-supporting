export const semesterFeatureKey = 'semester';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Semester } from '../../../model/semester.model';
import { createReducer, on } from '@ngrx/store';
import { SemesterActions } from '../action-types';

export const semestersFeatureKey = 'semesters';

export interface SemesterState extends EntityState<Semester> {}

export const adapter = createEntityAdapter<Semester>({});

export const initialLecturersState = adapter.getInitialState();

export const semesterReducer = createReducer(
  initialLecturersState,
  on(SemesterActions.fetchSemestersSuccessful, (state, action) =>
    adapter.addMany(action.semesters, state)
  )
);

export const { selectAll } = adapter.getSelectors();
