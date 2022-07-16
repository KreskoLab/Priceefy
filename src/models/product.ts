import type { Price } from '~/models/price'

export type Product = {
	_id: string
	name: string
	slug: string
	image: string
	country?: string
	category?: string
	weight: number
	unit: string
	trademark: string
	prices: Price[]
}
