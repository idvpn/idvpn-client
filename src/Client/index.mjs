import EventEmitter from 'eventemitter3';
import Oidc from 'oidc-client';

export default class IdVPNClient extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.isLoggedIn = false;
    this._client = new Oidc.UserManager(
      Object.assign(
        {
          userStore: new Oidc.WebStorageStateStore(),
          loadUserInfo: true
        },
        options
      )
    );
    this._client.events.addUserLoaded(this._onUserLoaded);
    this._client.events.addUserUnloaded(this._onUserUnloaded);
    this._client.events.addSilentRenewError(this._onSilentRenewalError);
    this._client.events.addUserSignedOut(this._onUserSignedOut);
    this._client.events.addUserSessionChanged(this._onSessionChanged);
  }
  destroy() {
    this._client.events.removeUserLoaded(this._onUserLoaded);
    this._client.events.removeUserUnloaded(this._onUserUnloaded);
    this._client.events.removeSilentRenewError(this._onSilentRenewalError);
    this._client.events.removeUserSignedOut(this._onUserSignedOut);
    this._client.events.removeUserSessionChanged(this._onSessionChanged);
  }

  _onUserLoaded = user => {
    this.isLoggedIn = true;
    this.emit('userLoaded', user);
  };
  _onUserUnloaded = () => {
    this.isLoggedIn = false;
    this.emit('userUnloaded');
  };
  _onSilentRenewalError = err => this.emit('renewalError', err);
  _onUserSignedOut = () => this.emit('userLoggedOut');
  _onSessionChanged = session => this.emit('sessionChanged', session);

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
