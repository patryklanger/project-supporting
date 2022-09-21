import { createAction, props } from '@ngrx/store';
import { LecturerUser } from '../models/lecturerUser.model';
import { Lecturer } from './../models/lecturer.model';
import { PaginatedResult } from './../../model/paginatedResult.model';

export const addLecturerInit = createAction(
  '[Create Lecturer Page] Creating Lecturer init',
  props<{ lecturer: LecturerUser }>()
);

export const addLecturerSuccess = createAction(
  '[Create Lecturer Effect] Successfully created lecturer;',
  props<{ lecturer: Lecturer }>()
);

export const addLecturerFail = createAction(
  '[Create Lecturer Effect] Creating lecturer failed',
  props<{ error: string }>()
);

export const getLecturersInit = createAction(
  '[Init lectureres fetch] Getting lecturers list',
  props<{ page: number }>()
);

export const getLecturersSuccess = createAction(
  '[] Lecturers fetched',
  props<{ lecturers: PaginatedResult<Lecturer> }>()
);

export const getLecturersFail = createAction(
  '[] Fetching lecturers failed',
  props<{ error: string }>()
);

export const getLecturerByIdInit = createAction(
  '[] Get lecturer by id init',
  props<{ id: number }>()
);

export const getLecturerByIdSuccess = createAction(
  '[Lecturer effects] Get lecturer by id success',
  props<{ lecturer: Lecturer }>()
);

export const getLecturerByIdFailure = createAction(
  '[Lecturer effects] Get lecturer by id failure',
  props<{ error: string }>()
);
export const deleteLecturerInit = createAction(
  '[All lecturer page] Delete lectuerer init',
  props<{ id: number }>()
);

export const deleteLecturerSuccess = createAction(
  '[Lecturer effects] Delete lecturer success',
  props<{ id: number }>()
);

export const editLecturerInit = createAction(
  '[Lecturer edit page] Edit lecturer',
  props<{ lecturer: Lecturer }>()
);

export const editLecturerSuccess = createAction(
  '[Lecutrer effects] Edit lecturer success',
  props<{ lecturer: Lecturer }>()
);
