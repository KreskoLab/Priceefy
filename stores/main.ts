import { defineStore } from 'pinia'
import type { Store } from '~/models/store'
import type { Category } from '~/models/category'
import type { City } from '~/models/city'

export const useStore = defineStore('main', {
	state: () => ({
		stores: [] as Store[],
		store: {} as Store,
		category: {} as Category,
		city: {} as City,
	}),
	actions: {
		setStore(newStore: Store) {
			this.store = newStore
		},
		setStores(newStores: Store[]) {
			this.stores = newStores
		},
		setCategory(newCategory: Category) {
			this.category = newCategory
		},
		setCity(newCity: City) {
			this.city = newCity
		},
	},
	getters: {
		availableStores: state =>
			state.stores.filter(store => store.cities.some(item => item.slug === state.city.slug)),
	},
})
