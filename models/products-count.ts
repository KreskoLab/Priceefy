import type { Product } from '~/models/product'

export type ProductsAndCount = {
	products: Product[]
	count: number
}
