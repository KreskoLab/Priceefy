export enum SORT_TITLES {
	asc = 'Дешевші',
	desc = 'Дорожчі',
	discount = 'Акційні',
}

export type SortVal = 'asc' | 'desc' | 'discount'

export type Sort = {
	val: SortVal
	title: 'Дешевші' | 'Дорожчі' | 'Акційні'
}
