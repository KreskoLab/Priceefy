import { City } from '~/models/city'
import { QueryObject } from '~/models/query-object'

export const useBottomSheet = () => useState<boolean>('bottomSheet', () => false)

export const useCityCookie = () => {
	const cookie = useCookie<City>('cityCookie', { maxAge: 2147483647 })
	cookie.value = cookie.value || { name: 'Київ', slug: 'kyiv' }

	return cookie.value
}

export const useQueryObject = () => {
	return useState<QueryObject>(null)
}
