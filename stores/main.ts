import type { Store } from '~/models/store'
import type { Category } from '~/models/category'
import type { City } from '~/models/city'

const STATE = {
	stores: <Store[]>[],
	store: <Store>{},
	category: <Category>{},
	city: <City>{},
}

export const { state, mutation, getter, ...store } = createStore('main', STATE)

export const setStore = mutation<Store>('setStore', (state, payload) => {
	state.store = payload
})

export const setStores = mutation<Store[]>('setStores', (state, payload) => {
	state.stores = payload
})

export const setCategory = mutation<Category>('setCategory', (state, payload) => {
	state.category = payload
})

export const setCity = mutation<City>('setCity', (state, payload) => {
	state.city = payload
})

export const availableStores = getter('availbaleStores', state => {
	return state.stores.filter(store => store.cities.some(item => item.slug === state.city.slug))
})
