export const environment = {
  production: true,
  baseUrl: 'http://54.93.250.110:8080',
  keycloakConfig: {
    issuer: 'http://54.93.250.110:28080/auth/realms/management',
    redirectUri: 'http://54.93.250.110:4200/',
    clientId: 'front-end',
    scope: 'openid profile email offline_access roles',
  },
};
