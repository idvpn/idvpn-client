import Auth0 from 'auth0-js';
import EventEmitter from 'eventemitter3';

export default class IdVPNClient extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.isLoggedIn = false;
    this._client = new Auth0.WebAuth({
      domain: options.authority,
      clientID: options.client_id,
      redirectUri: options.redirect_uri
    });
  }
  destroy() {}

  // _onUserLoaded = user => {
  //   this.isLoggedIn = true;
  //   this.emit('userLoaded', user);
  // };
  // _onUserUnloaded = () => {
  //   this.isLoggedIn = false;
  //   this.emit('userUnloaded');
  // };
  // _onSilentRenewalError = err => {
  //   this.emit('renewalError', err);
  // };
  // _onUserSignedOut = () => {
  //   this.emit('userLoggedOut');
  // };
  // _onSessionChanged = session => {
  //   this.emit('sessionChanged', session);
  // };

  login() {
    const options = {};
    if (this.options.scope) options.scope = this.options.scope;
    if (this.options.response_type) options.responseType = this.options.response_type;
    if (this.options.response_mode) options.responseMode = this.options.response_mode;
    if (this.options.popup) return this._client.popup.authorize(options);
    else return this._client.authorize(options);
  }

  handleLoginCallback() {
    if (this.options.popup) return this._client.popup.callback();
    else return this._client.authorize(this.options);
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
