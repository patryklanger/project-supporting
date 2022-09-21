import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { logout } from '../store/app.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  headers: HttpHeaders;
  httpOptions: {
    headers: HttpHeaders;
    params?: HttpParams;
  };

  constructor(
    private oauthService: OAuthService,
    private authStore: Store<AuthState>
  ) {}

  checkIfTokenExpired() {
    if (this.oauthService.getAccessTokenExpiration() - Date.now() < 2000) {
      this.authStore.dispatch(logout());
    }
    return this.oauthService.getAccessTokenExpiration() - Date.now() < 2000;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('no-auth') == 'false') {
      if (this.checkIfTokenExpired()) return EMPTY;
      let previousHeaders = request.headers;
      if (!previousHeaders) previousHeaders = new HttpHeaders();
      let newHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.oauthService.getAccessToken(),
      });

      previousHeaders.keys().forEach((e) => {
        newHeaders.set(e, previousHeaders.get(e));
      });
      if (previousHeaders.has('Content-Type'))
        newHeaders = newHeaders.set(
          'Content-Type',
          previousHeaders.get('Content-Type')
        );
      newHeaders = newHeaders.delete('No-Auth');
      const clonedReq = request.clone({ headers: newHeaders });
      return next.handle(clonedReq);
    } else if (request.headers.get('no-auth') == 'file') {
      let headers = request.headers.delete('no-auth');
      headers = request.headers.set(
        'Authorization',
        'Bearer ' + this.oauthService.getAccessToken()
      );
      return next.handle(request.clone({ headers: headers }));
    }
    return next.handle(request);
  }
}
