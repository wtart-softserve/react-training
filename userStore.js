import { action, observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import { get } from 'lodash';
import Router from 'next/router';
import { requestor } from '../../../utilities/requestor';
import { APP_STATES } from '../login/config';
import { DEFAULT_ERROR_MESSAGE } from '../../../utilities/config';
import { addToLocalStorage } from '../../../utilities/helpers';

const isServer = !process.browser
useStaticRendering(isServer)

class UserStore {
  @observable token;
  @observable isAuthenticated;
  @observable appState;
  @observable errorMessage;

  constructor() {
    this.token = undefined;
  }

  @action loginUser = async (email, password) => {
    this.appState = APP_STATES.LOADING;

    try {
      const response = await requestor(this.getUserQuery(email, password));
      const token = get(response, 'data.data.login.token');
      this.assertUserIsAuthenticated(token);
      this.token = token;
      this.isAuthenticated = true;
      addToLocalStorage('token', token);
      Router.push('/manager');
    } catch (error) {
      const resMessage = get(error, 'response.data.errors[0].message');
      this.errorMessage = resMessage ? resMessage : DEFAULT_ERROR_MESSAGE;
      this.appState = APP_STATES.ERROR;
    }
  }

  @action setToken = async (token) => {
    this.token = token;
    this.isAuthenticated = true;
  }

  getUserQuery(email, password) {
    return(`
        query {
          login(email: "${email}", password: "${password}") {
            token
          }
        }
      `);
  }

  assertUserIsAuthenticated(token) {
    if (!token) throw new Error();
  }
}

var store = null;

export function initUserStore(isServer) {
  // Always make a new store if server, otherwise state is shared between requests
  store = (isServer || !store) ? new UserStore(isServer) : store;

  return store;
};