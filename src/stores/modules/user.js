import { defineStore } from 'pinia'
import * as userApi from '@/services/api/user.api.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const {data} = await userApi.getUser()
      this.user = data
    }
  }
})
