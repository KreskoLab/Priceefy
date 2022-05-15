import type { Category } from '~/models/category'

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()

	const res = await $fetch<object[]>(`${config.baseAPI}/category`)

	const categories: Category[] = res.map((item: any) => ({
		name: item.name,
		slug: item.slug,
		icon: item.icon,
	}))

	return categories
})
