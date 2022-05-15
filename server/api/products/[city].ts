import type { Product } from '~/models/product'
import type { ProductsAndCount } from '~/models/products-count'

export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const queryObject = useQuery(event)

	const res = await $fetch<ProductsAndCount>(`products/city/${event.context.params.city}`, {
		params: queryObject,
		baseURL: config.baseAPI,
	})

	const products: Product[] = res.products.map(({ category, country, ...rest }) => rest)
	const count: number = res.count

	return { products, count }
})
