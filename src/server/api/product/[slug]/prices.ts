import type { ChartSeries } from '~/models/chart-series'
import { Price } from '~/models/price'

export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const query = useQuery(event)

	return $fetch<Pick<Price, 'price' | 'store' | 'created_at'>[]>(
		`${config.baseAPI}/products/${event.context.params.slug}/prices?city=${query.city}&period=${query.period}`
	)
})
