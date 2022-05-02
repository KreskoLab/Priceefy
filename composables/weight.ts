export const useHandleWeight = (weight: number, unit: string) => {
	switch (unit) {
		case 'kg':
			return `${weight} кг`

		case 'ml':
			return `${weight / 1000} л`

		case 'pcs':
			if (weight > 5) return `${weight} г`
			else return `${weight} шт`
	}
}
