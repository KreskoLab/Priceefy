import type { Category } from '~/models/category'

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	return $fetch<Category[]>(`${config.baseAPI}/categories`)
})
