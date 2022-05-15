import type { Store } from '~/models/store'

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()

	const res = await $fetch<object[]>(`${config.baseAPI}/store`)

	const stores: Store[] = res.map((item: any) => ({
		name: item.name,
		slug: item.slug,
		icon: item.image,
		cities: item.cities,
	}))

	return stores
})
