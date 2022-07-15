import type { Product } from '~/models/product'

export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const query = useQuery(event)

	try {
		return $fetch<Product>(
			`${config.baseAPI}/products/${event.context.params.slug}?city=${query.city}`
		)
	} catch (error) {
		throwError('Товар не знайден')
	}
})
