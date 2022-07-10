import type { Store } from '~/models/store'

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	return $fetch<Store[]>(`${config.baseAPI}/stores`)
})
