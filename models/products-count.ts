import type { Product } from '~/models/product'

export type ProductsAndCount = {
	results: Product[]
	count: number
}
