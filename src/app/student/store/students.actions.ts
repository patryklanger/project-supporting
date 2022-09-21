import { createAction, props } from '@ngrx/store';
import { Student } from '../model/student.model';
import { StudentUser } from '../model/studentUser.model';
import { PaginatedResult } from './../../model/paginatedResult.model';
import { HttpErrorResponse } from '@angular/common/http';

export const addStudentInit = createAction(
  '[Create Student Page] Creating Student init',
  props<{ student: StudentUser }>()
);

export const addStudentSuccess = createAction(
  '[Create Student Effect] Successfully created student',
  props<{ student: Student }>()
);

export const addStudentFailure = createAction(
  '[Create Student Effect] Creating stident failed',
  props<{ error: string }>()
);

export const getStudentsInit = createAction(
  '[All studnets page] Gettling students list init',
  props<{ page: number }>()
);

export const getStudentsSuccess = createAction(
  '[Students effects] Students fetched',
  props<{ students: PaginatedResult<Student> }>()
);

export const getStudentsFail = createAction(
  '[Students effect] Fetching students failed',
  props<{ error: string }>()
);

export const getStudentByIdInit = createAction(
  '[Get student by id resolver] Get student by id init',
  props<{ id: number }>()
);

export const getStudentByIdSuccess = createAction(
  '[Students effects] Get student by id success',
  props<{ student: Student }>()
);

export const getStudentByIdFailure = createAction(
  '[Students effects] Get student by id failure',
  props<{ error: string }>()
);

export const deleteStudentInit = createAction(
  '[Delete student button] Delete student init',
  props<{ id: string }>()
);

export const deleteStudentSuccess = createAction(
  '[Delete student button] Delete student init',
  props<{ id: string }>()
);

export const deleteStudentFailure = createAction(
  '[Delete student button] Delete student init',
  props<{ error: string }>()
);

export const editStudentInit = createAction(
  '[Edit student form] Student edit init',
  props<{ student: Student }>()
);

export const editStudentSuccess = createAction(
  '[Student effect] Student edit success',
  props<{ student: Student }>()
);

export const editStudentFailure = createAction(
  '[Student effects] Student edit failure',
  props<{ error: string }>()
);
