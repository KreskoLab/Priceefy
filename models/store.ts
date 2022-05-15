import type { City } from '~/models/city'

export type Store = {
	name: string
	slug: string
	icon: string
	cities?: City[]
}
