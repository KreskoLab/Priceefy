import type { User } from '~/models/user'

export default defineEventHandler(async event => {
	const cookies = useCookies(event)

	if (cookies.accessToken) {
		const user = await $fetch('http://localhost:8000/users/auth/me', {
			headers: {
				cookie: `accessToken=${cookies.accessToken}`,
			},
		})
			.then(res => {
				return { status: true, user: res as User }
			})
			.catch(err => {
				return { status: false, user: {} as User }
			})

		return user
	}
})
