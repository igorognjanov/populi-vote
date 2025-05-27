import { Injectable } from '@angular/core';
// @ts-ignore
import Keycloak from 'keycloak-js';
import { UserProfile } from '../interface/user-profile.interface';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  keycloak: Keycloak = new Keycloak({
    url: 'http://localhost:8181',
    realm: 'populi-vote',
    clientId: 'populi-vote'
  });

  profile: UserProfile | undefined;

  constructor() {
  }

  async init() {
    console.log('Authenticating the user');
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',
    })

    if (authenticated){
      this.profile = await this.keycloak.loadUserProfile() as UserProfile;
      this.profile.token = await this.keycloak.token;
      console.log("User authenticated");
    }
  }

  logout() {
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'})

  }

}
