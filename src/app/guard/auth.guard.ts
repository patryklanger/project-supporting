import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { Claims } from './../model/claims.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const roles = route.data['roles'] as string[];
    if (roles.length == 0 || !route.data['roles']) return true;
    const claims: Claims = this.oauthService.getIdentityClaims() as Claims;
    return claims.realm_access.roles.some((e) => roles.includes(e));
  }
}
