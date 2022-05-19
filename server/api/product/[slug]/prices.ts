import type { ChartSeries } from '~/models/chart-series'

export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const query = useQuery(event)

	try {
		const chartSeries: ChartSeries = {
			series: [],
			timeseries: [],
		}

		const time = []

		const res = await $fetch<[]>(
			`${config.baseAPI}/products/${event.context.params.slug}/prices?city=${query.city}&period=${query.period}`
		)

		res.forEach((item: any) => {
			const prices = item.prices.map(item => [item.createdAt, item.price])
			const itemCreatedAt = item.prices.map(item => item.createdAt)

			chartSeries.series.push({ name: item.store, data: prices })
			time.push(itemCreatedAt)
		})

		chartSeries.timeseries = [...new Set(time.flat())]

		return chartSeries
	} catch (error) {}
})
