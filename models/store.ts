import type { City } from '~/models/city'

export type Store = {
	name: string
	slug: string
	image: string
	cities?: City[]
}
