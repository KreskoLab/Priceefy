import { Product } from '~/models/product'

export const useHandlePrice = (price: Product['prices']) => {
	const prices = price.map(item => item.price)

	if (prices.length > 1) {
		return `₴ ${Math.min(...prices).toFixed(2)} - ${Math.max(...prices).toFixed(2)}`
	} else {
		return `₴ ${prices[0].toFixed(2)}`
	}
}
