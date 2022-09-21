import { Component, OnInit } from '@angular/core';
import { Claims } from './../../model/claims.model';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  claims: Claims;

  roles: string;

  constructor(private oauthService: OAuthService) {
    this.claims = this.oauthService.getIdentityClaims() as Claims;
    this.roles = this.claims.realm_access.roles
      .filter(
        (e) =>
          ![
            'default-roles-management',
            'offline_access',
            'uma_authorization',
          ].includes(e)
      )
      .join(' ');
  }

  ngOnInit(): void {}
}
