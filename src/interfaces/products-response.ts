import { Product } from '~/models/product'

export interface ProductResponse {
	results: Product[]
	count: number
}
