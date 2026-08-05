import { $http } from '@/utils/https';
import { defineStore } from 'pinia';
import { getRequestError, setRequestStatus } from '@/utils/store';
import { REQUEST_STATUS } from '@/utils/constants';
import { storage } from '@/utils/storage.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    _isAuth: false,
    _loginStatus: {
      loading: false,
      done: false,
      error: null
    },
    _logoutStatus: {
      loading: false,
      done: false,
      error: null
    },
    _registrationStatus: {
      loading: false,
      done: false,
      error: null
    },
    _resetStatus: {
      loading: false,
      done: false,
      error: null
    },
    _restoreData: null,
    _restoreStatus: {
      loading: false,
      done: false,
      error: null
    },
    _me: null,
    _meStatus: {
      loading: false,
      done: false,
      error: null
    },
    _meUpdateStatus: {
      loading: false,
      done: false,
      error: null
    },
    _meDeleteStatus: {
      loading: false,
      done: false,
      error: null
    },
    _passwordUpdateStatus: {
      loading: false,
      done: false,
      error: null
    }
  }),

  getters: {
    isAuth: (state) => state._isAuth,

    loginStatus: (state) => state._loginStatus,
    registrationStatus: (state) => state._registrationStatus,
    resetStatus: (state) => state._resetStatus,
    restoreData: (state) => state._restoreData,
    restoreStatus: (state) => state._restoreStatus,
    me: (state) => state._me,
    meStatus: (state) => state._meStatus,
    meUpdateStatus: (state) => state._meUpdateStatus,
    passwordUpdateStatus: (state) => state._passwordUpdateStatus,
    meDeleteStatus: (state) => state._meDeleteStatus
  },

  actions: {
    async LOGIN(payload) {
      setRequestStatus(this._loginStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.post(`v1/auth/login`, payload);
        setRequestStatus(this._loginStatus, REQUEST_STATUS.SUCCESS);
        if (payload.remember) {
          storage.setItem('remember_token', 'true');
        }
        this.SET_TOKEN(response.data.access_token);
        return response.data;
      } catch (e) {
        setRequestStatus(this._loginStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setRequestStatus(this._loginStatus, REQUEST_STATUS.DONE);
      }
    },
    async REFRESH() {
      setRequestStatus(this._loginStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.post(`v1/auth/refresh`);
        setRequestStatus(this._loginStatus, REQUEST_STATUS.SUCCESS);
        this.SET_TOKEN(response.data.access_token);
        return response.data;
      } catch (e) {
        this.REMOVE_TOKEN();
        setRequestStatus(this._loginStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setTimeout(() => {
          location.reload();
        }, 100);
        setRequestStatus(this._loginStatus, REQUEST_STATUS.DONE);
      }
    },

    async LOGOUT() {
      setRequestStatus(this._logoutStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.post(`v1/auth/logout`);
        setRequestStatus(this._logoutStatus, REQUEST_STATUS.SUCCESS);
        return response.data;
      } catch (e) {
        setRequestStatus(this._logoutStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        this._me = null;
        this.REMOVE_TOKEN();
        setRequestStatus(this._logoutStatus, REQUEST_STATUS.DONE);
      }
    },

    async REGISTRATION(payload) {
      setRequestStatus(this._registrationStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.post(`v1/auth/register`, payload);
        this.SET_TOKEN(response.data.access_token);
        setRequestStatus(this._registrationStatus, REQUEST_STATUS.SUCCESS);
        return response.data;
      } catch (e) {
        setRequestStatus(this._registrationStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setRequestStatus(this._registrationStatus, REQUEST_STATUS.DONE);
      }
    },

    async RESET_PASSWORD(payload) {
      setRequestStatus(this._resetStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.post(`v1/auth/password/reset`, payload);
        setRequestStatus(this._resetStatus, REQUEST_STATUS.SUCCESS);
        return response.data;
      } catch (e) {
        setRequestStatus(this._resetStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setRequestStatus(this._resetStatus, REQUEST_STATUS.DONE);
      }
    },

    SET_RESTORE(data) {
      this._restoreData = data;
    },

    async RESTORE_PASSWORD(payload) {
      setRequestStatus(this._restoreStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.post(`v1/auth/password/restore`, payload);
        this.SET_TOKEN(response.data.access_token);
        setRequestStatus(this._restoreStatus, REQUEST_STATUS.SUCCESS);
        return response.data;
      } catch (e) {
        setRequestStatus(this._restoreStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setRequestStatus(this._restoreStatus, REQUEST_STATUS.DONE);
      }
    },

    async SET_AUTH() {
      this._isAuth = true;
      await this.GET_ME();
    },

    SET_TOKEN(access_token) {
      this._isAuth = true;
      storage.setItem('user_token', access_token);
    },

    REMOVE_TOKEN() {
      storage.removeItem('user_token');
      storage.removeItem('remember_token');
      this._isAuth = false;
      setTimeout(() => {
        location.reload();
      }, 200);
    },

    async GET_ME() {
      setRequestStatus(this._meStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.get(`v1/auth/me?include=profile`);
        this._me = response.data.data;
        setRequestStatus(this._meStatus, REQUEST_STATUS.SUCCESS);
        return response.data;
      } catch (e) {
        setRequestStatus(this._meStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setRequestStatus(this._meStatus, REQUEST_STATUS.DONE);
      }
    },
    async UPDATE_ME(payload) {
      let url = `v1/auth/update`;
      setRequestStatus(this._meUpdateStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.post(url, payload);
        setRequestStatus(this._meUpdateStatus, REQUEST_STATUS.SUCCESS);
        return response.data;
      } catch (e) {
        setRequestStatus(this._meUpdateStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setRequestStatus(this._meUpdateStatus, REQUEST_STATUS.DONE);
      }
    },
    async DELETE_ME() {
      let url = `v1/auth/delete`;
      setRequestStatus(this._meDeleteStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.delete(url);
        setRequestStatus(this._meDeleteStatus, REQUEST_STATUS.SUCCESS);
        return response.data;
      } catch (e) {
        setRequestStatus(this._meDeleteStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setRequestStatus(this._meDeleteStatus, REQUEST_STATUS.DONE);
      }
    },
    async UPDATE_PASSWORD(payload) {
      let url = `auth/password/change`;
      setRequestStatus(this._passwordUpdateStatus, REQUEST_STATUS.RUN);
      try {
        const response = await $http.post(url, payload);
        setRequestStatus(this._passwordUpdateStatus, REQUEST_STATUS.SUCCESS);
        return response.data;
      } catch (e) {
        setRequestStatus(this._passwordUpdateStatus, REQUEST_STATUS.ERROR, e);
        throw getRequestError(e);
      } finally {
        setRequestStatus(this._passwordUpdateStatus, REQUEST_STATUS.DONE);
      }
    }
  }
});
