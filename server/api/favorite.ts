export default defineEventHandler(async event => {
	const body = await useBody(event)
	const query = useQuery(event)
	const cookies = useCookies(event)
	const config = useRuntimeConfig()

	const res = await $fetch<string[]>(`${config.baseAPI}/users/${query.userId}/favorite`, {
		method: body.httpMethod,
		headers: {
			cookie: `accessToken=${cookies.accessToken}`,
		},
		body: {
			product: body.productId,
		},
	})

	return res
})
