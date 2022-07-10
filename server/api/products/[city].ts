import { ProductResponse } from '~/interfaces'

interface Query {
	page: number
	sort: string
	category?: string
	store?: string
}

export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const queryObject = useQuery(event) as unknown as Query

	let url = ''

	if (queryObject.category || (queryObject.category && queryObject.store)) {
		url = `/categories/${queryObject.category}?city=${event.context.params.city}`
	} else if (queryObject.store) {
		url = `/stores/${queryObject.store}?city=${event.context.params.city}`
	} else {
		url = `/products?city=${event.context.params.city}`
	}

	const res = await $fetch<ProductResponse>(url, {
		params: queryObject,
		baseURL: config.baseAPI,
	}).then(res => {
		return {
			count: res.count,
			results: res.results.map(({ category, country, ...rest }) => rest),
		}
	})

	return res
})
