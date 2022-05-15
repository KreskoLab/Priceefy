import { Product } from '~/models/product'

export default eventHandler(async event => {
	const cookies = useCookies(event)
	const query = useQuery(event)

	const products = await $fetch<Product[]>(
		`http://localhost:8000/users/${query.userId}/favorites`,
		{
			headers: {
				cookie: `accessToken=${cookies.accessToken}`,
			},
		}
	)

	return products
})
