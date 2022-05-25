export default eventHandler(async event => {
	const cookies = useCookies(event)
	const config = useRuntimeConfig()

	await $fetch(`${config.baseAPI}/users/auth/logout`, {
		headers: {
			cookie: `accessToken=${cookies.accessToken}`,
		},
	})
})
