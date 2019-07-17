import EventEmitter from 'eventemitter3';
import Oidc from 'oidc-client';

export default class IdVPNClient extends EventEmitter {
  constructor(clientOptions = {}, options = {}) {
    super();
    this.options = options;
    this._client = new Oidc.UserManager(
      Object.assign(
        {
          userStore: new Oidc.WebStorageStateStore(),
          loadUserInfo: true
        },
        clientOptions
      )
    );
    this._client.events.addUserLoaded(user => this.emit('userLoaded', user));
    this._client.events.addUserUnloaded(() => this.emit('userUnloaded'));
    this._client.events.addSilentRenewError(err => this.emit('renewalError', err));
    this._client.events.addUserSignedOut(() => this.emit('userLoggedOut'));
    this._client.events.addUserSessionChanged(session => this.emit('sessionChanged', session));
  }

  login() {
    if (this.options.popup) return this._client.signinPopup();
    else return this._client.signinRedirect();
  }

  handleLoginCallback() {
    if (this.options.popup) return this._client.signinPopupCallback();
    else return this._client.signinRedirectCallback();
  }

  logout(params) {
    if (this.options.popup) return this._client.signoutPopup(params);
    else return this._client.signoutRedirect(params);
  }

  handleLogoutCallback() {
    if (this.options.popup) return this._client.signoutPopupCallback();
    else return this._client.signoutRedirectCallback();
  }

  loginSilentCallback() {
    return this._client.signinSilentCallback();
  }

  querySessionStatus() {
    return this._client.querySessionStatus();
  }

  getUser() {
    return this._client.getUser();
  }

  silentSignin() {
    return this._client.silentSignin();
  }
}
