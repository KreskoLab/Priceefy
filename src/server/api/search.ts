import { Product } from '~/models/product'

interface Query {
	q: string
	city: string
}

export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const queryObject = useQuery(event) as unknown as Query

	return $fetch<Product[]>(`/products/search?q=${queryObject.q}&city=${queryObject.city}`, {
		baseURL: config.baseAPI,
	})
})
