export const useHandleWeight = (weight: number, unit: string) => {
	switch (unit) {
		case 'kg':
			return `${weight} кг`

		case 'ml':
			return String(weight).length === 4 ? `${weight / 1000}л` : `${weight}мл`

		case 'g':
			return `${weight} г`

		case 'pcs':
			if (weight > 5) return `${weight} г`
			else return `${weight} шт`
	}
}
