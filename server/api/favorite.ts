export default defineEventHandler(async event => {
	const query = useQuery(event)
	const cookies = useCookies(event)
	const config = useRuntimeConfig()

	const res = await $fetch<string[]>(`${config.baseAPI}/users/${query.userId}/favorite`, {
		method: query.method as string,
		headers: {
			cookie: `accessToken=${cookies.accessToken}`,
		},
		body: {
			product: query.product,
		},
	})

	return res
})
