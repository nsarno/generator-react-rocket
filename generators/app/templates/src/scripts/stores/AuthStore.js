import EventEmitter from 'events';
import jwt_decode from 'jwt-decode';

import Constants from 'Constants';
import Dispatcher from 'Dispatcher';

class AuthStore extends EventEmitter {
  constructor() {
    super();

    var jwt = localStorage.getItem('jwt');
    
    this._status = 'ok';
    this._jwt = jwt || '';
    this._user = jwt ? jwt_decode(jwt) : '';

    this.dispatchToken = Dispatcher.register(this._registerToActions.bind(this));
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }

  _onLogout() {
    this._jwt = '';
    this._user = '';
    localStorage.setItem('jwt', this.jwt);
    this.emit(Constants.CHANGE);
  }

  _onLogin(payload) {
    this._status = 'signing_in';
    this.emit(Constants.CHANGE);
  }

  _onLoginSuccess(payload) {
    this._jwt = payload.jwt;
    this._user = jwt_decode(this.jwt);
    localStorage.setItem('jwt', this._jwt);
    this.emit(Constants.CHANGE);
  }

  _onLoginFailure(payload) {
    this._status = 'error';
    this.emit(Constants.CHANGE); 
  }

  _registerToActions(action) {
    switch(action.type) {
      case Constants.LOGOUT:
        this._onLogout();
        break;

      case Constants.LOGIN:
        this._onLogin(action.data);
        break;

      case Constants.LOGIN_SUCCESS:
        this._onLoginSuccess(action.data);
        break;

      case Constants.LOGIN_FAILURE:
        this._onLoginFailure(action.data);
        break;

      default:
        return true;
    }
  }

  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  get status() {
    return this._status;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new AuthStore();
