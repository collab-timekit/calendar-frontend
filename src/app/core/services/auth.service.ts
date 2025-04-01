import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly keycloak: Keycloak) {}

  getUserData() {
    if (this.keycloak.authenticated) {
      return {
        username: this.keycloak.tokenParsed?.['preferred_username'],
        email: this.keycloak.tokenParsed?.['email'],
        roles: this.keycloak.realmAccess?.roles
      };
    }
    return null;
  }
}
