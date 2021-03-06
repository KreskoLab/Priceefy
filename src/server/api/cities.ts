import type { City } from '~/models/city'
import type { SelectOption } from '~/models/select-option'

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()

	const cities = await $fetch<City[]>(`${config.baseAPI}/cities`)
	const options: SelectOption[] = cities.map(city => ({ title: city.name, value: city }))

	return options
})
