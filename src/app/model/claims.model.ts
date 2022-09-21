export interface Claims {
  family_name?: string;
  given_name?: string;
  email?: string;
  preferred_username: string;
  realm_access: {
    roles: string[];
  };
  email_verified: boolean;
  acr: string;
  at_hash: string;
  aud: string;
  auth_time: number;
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nonce: string;
  session_state: string;
  sid: string;
  sub: string;
  typ: string;
}
