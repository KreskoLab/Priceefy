import { Product } from '~/models/product'

export default eventHandler(async event => {
	const cookies = useCookies(event)
	const query = useQuery(event)
	const config = useRuntimeConfig()

	const products = await $fetch<Product[]>(`${config.baseAPI}/users/${query.userId}/favorites`, {
		headers: {
			cookie: `accessToken=${cookies.accessToken}`,
		},
	})

	return products
})
