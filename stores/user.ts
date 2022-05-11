import { defineStore } from 'pinia'
import { User } from '~/models/user'

export const useUser = defineStore('user', {
	state: () => ({
		user: {} as User,
		loggedIn: false,
	}),
	actions: {
		async getUser() {
			$fetch('http://localhost:8000/users/auth/me', {
				headers: useRequestHeaders(['cookie']),
			})
				.then((res: User) => {
					this.user = res
					this.loggedIn = true
				})
				.catch(() => {
					this.loggedIn = false
					this.user = {}
				})
		},

		async logOut() {
			$fetch
				.raw('http://localhost:8000/users/auth/logout', {
					credentials: 'include',
				})
				.then(() => {
					this.loggedIn = false
					this.user = {}
				})
		},
	},
})
