import { createAction, props } from '@ngrx/store';
import { PaginatedResult } from './../../model/paginatedResult.model';
import { AdminUser } from './../model/adminUser.model';

export const getAllUsersInit = createAction(
  '[All users component] Get all users initialization',
  props<{ page: number; limit: number }>()
);

export const getAllUsersSuccess = createAction(
  '[Users effects] Saving all users',
  props<{ paginatedUsers: PaginatedResult<AdminUser> }>()
);

export const getAllUsersFailure = createAction(
  '[Users effects] Fetching users failure',
  props<{ error: any }>()
);

export const deleteUserInit = createAction(
  '[User delete button] Delete user init',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User effects] Delete user success',
  props<{ id: string }>()
);

export const deleteUserFail = createAction(
  '[User effects] Delete user failure',
  props<{ error: string }>()
);
