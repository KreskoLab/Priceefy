export default eventHandler(async event => {
	const config = useRuntimeConfig()

	setCookie(event, 'accessToken', '', {
		maxAge: 0,
		httpOnly: true,
		secure: true,
		domain: config.domain,
		sameSite: 'lax',
	})

	return 'ok'
})
