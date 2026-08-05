import { defineStore } from 'pinia';
import { storage } from '@/utils/storage.js';

export const useAppStore = defineStore('app', {
  state() {
    return {
      _theme: storage.getItem('user_theme') || 'light-theme',
      _modal: {},
      _sidebar: {},
      _isLoader: false,
      _sidebarOpen: false
    };
  },
  getters: {
    theme: (state) => state._theme,
    modal: (state) => state._modal,
    sidebar: (state) => state._sidebar,
    isLoader: (state) => state._isLoader,
    sidebarOpen: (state) => state._sidebarOpen
  },
  actions: {
    SET_THEME(theme) {
      storage.setItem('user_theme', theme);
      document.documentElement.className = theme;
      this._theme = theme;
    },
    SET_LOADER_STATUS(status) {
      this._isLoader = status;
    },
    SET_SIDEBAR_OPEN_STATUS(status) {
      this._sidebarOpen = status;
    },

    OPEN_MODAL(name, props = {}) {
      this._modal = { name, props, isOpen: true };
    },
    CLOSE_MODAL() {
      this._modal = {};
    },

    OPEN_SIDEBAR(name, props = {}) {
      this._sidebar = { name, props, isOpen: true };
      this._sidebarOpen = true;
    },
    CLOSE_SIDEBAR() {
      this._sidebar = {};
      this._sidebarOpen = false;
    }
  }
});
