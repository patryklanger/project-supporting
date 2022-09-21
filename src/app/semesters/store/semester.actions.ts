import { createAction, props } from '@ngrx/store';
import { Semester } from '../../model/semester.model';

export const tryFetchSemesters = createAction('[Menu] Try to fetch semester');

export const fetchSemestersSuccessful = createAction(
  '[Semester actions] Successfully fetched semesters',
  props<{ semesters: Semester[] }>()
);

export const fetchSemestersFailure = createAction(
  '[Semester actions] Fetching semesters failed'
);

export const currentSemesterSet = createAction(
  '[Semester roller] Curretn semester set',
  props<{ current: Semester }>()
);
