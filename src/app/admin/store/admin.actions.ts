import { createAction, props } from '@ngrx/store';
import { PaginatedResult } from 'src/app/model/paginatedResult.model';
import { AdminDto } from './../model/adminDto.model';
import { CreateAdminUser } from './../model/createAdminUser.model';

export const getAdminsInit = createAction(
  '[All admins component] Get all admins init',
  props<{ page: number; limit: number }>()
);

export const getAdminsSuccess = createAction(
  '[Admins effects] Get all admin success',
  props<{ admins: PaginatedResult<AdminDto> }>()
);

export const getAdminFailure = createAction(
  '[Admins effects] Get all admin fauilure',
  props<{ error: string }>()
);

export const createAdminInit = createAction(
  '[Add admin component] Create admin init',
  props<{ admin: CreateAdminUser }>()
);

export const createAdminSuccess = createAction(
  '[Admin effects] Create admin success',
  props<{ admin: AdminDto }>()
);

export const createAdminFailure = createAction(
  '[Admin effects] Create admin failure',
  props<{ error: string }>()
);
