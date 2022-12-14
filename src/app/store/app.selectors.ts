import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/store/reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (isLoggedIn) => !isLoggedIn
);

export const hasUserRole = createSelector(selectAuthState, (auth) => {
  if (!!auth.user) return auth.user.roles.includes('user');
  else return false;
});

export const hasAdminRole = createSelector(selectAuthState, (auth) => {
  if (!!auth.user) return auth.user.roles.includes('admin');
  else return false;
});

export const hasLecturerRole = createSelector(selectAuthState, (auth) => {
  if (!!auth.user) return auth.user.roles.includes('lecturer');
  else return false;
});

export const hasStudentRole = createSelector(selectAuthState, (auth) => {
  if (!!auth.user) return auth.user.roles.includes('student');
  else return false;
});

export const getUsername = createSelector(
  selectAuthState,
  (auth) => auth.user?.username
);
