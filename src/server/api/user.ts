import type { User } from '~/models/user'

export default defineEventHandler(async event => {
	const cookies = useCookies(event)
	const config = useRuntimeConfig()

	if (cookies.accessToken) {
		const user = await $fetch(`${config.baseAPI}/me`, {
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
	} else return { status: false, user: {} as User }
})
