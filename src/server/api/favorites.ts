import { Product } from '~/models/product'

export default eventHandler(async event => {
	const cookies = useCookies(event)
	const query = useQuery(event)
	const config = useRuntimeConfig()

	return $fetch<Product[]>(`${config.baseAPI}/users/${query.userId}/favorites?city=${query.city}`, {
		headers: {
			cookie: `accessToken=${cookies.accessToken}`,
		},
	})
})
