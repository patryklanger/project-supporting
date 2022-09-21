import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const login = createAction('[Menu] User Login');

export const tryToLogin = createAction('[Page reload] Try to login');

export const saveLoggedUser = createAction(
  '[Login Effect] Save user',
  props<{ user: User }>()
);

export const logout = createAction('[User dropdown] Logout');
