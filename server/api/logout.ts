export default eventHandler(async event => {
	setCookie(event, 'accessToken', '', { maxAge: 0 })
	return 'ok'
})
