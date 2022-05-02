import type { Product } from '~/models/product'

export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const query = useQuery(event)

	const res = await $fetch<Product>(
		`${config.baseAPI}/product/${event.context.params.slug}?city=${query.city}`
	)

	return res
})
