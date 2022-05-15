import { defineStore } from 'pinia'
import type { Store } from '~/models/store'
import type { Category } from '~/models/category'
import type { City } from '~/models/city'
import type { Sort } from '~/models/sort'

export const useStore = defineStore('main', {
	state: () => ({
		stores: [] as Store[],
		store: {} as Store,
		category: {} as Category,
		city: {} as City,
		sort: { title: 'Дешевші', val: 'asc' } as Sort,
		showDropdown: false,
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

		setSort(newSort: Sort) {
			this.sort = newSort
		},

		openDropdown() {
			this.showDropdown = !this.showDropdown
		},
	},
	getters: {
		availableStores: state =>
			state.stores.filter(store => store.cities.some(item => item.slug === state.city.slug)),
	},
})
