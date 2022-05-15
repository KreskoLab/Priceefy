<template>
	<div class="flex items-center justify-between w-full py-3 dark:text-slate-200 text-gray-600 mb-4">
		<div>
			<span class="font-medium text-lg">{{ count }}</span>
			<span class="text-sm sm:text-base ml-2">товарів знайдено</span>
		</div>

		<div class="flex items-center space-x-3">
			<Dropdown>
				<template #header>
					<span
						class="bg-white text-gray-600 dark:bg-slate-800 dark:text-slate-200 text-sm sm:text-base py-1 px-3 rounded-md select-none"
					>
						{{ sort.title }}
					</span>
				</template>

				<DropdownItem @click="setSort({ val: 'asc', title: 'Дешевші' })">Дешевші</DropdownItem>
				<DropdownItem @click="setSort({ val: 'desc', title: 'Дорожчі' })">Дорожчі</DropdownItem>
				<DropdownItem @click="setSort({ val: 'discount', title: 'Акційні' })">Акційні</DropdownItem>
			</Dropdown>

			<svg
				class="h-6 w-6 rotate-90 block cursor-pointer lg:hidden"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				@click="bottomSheet = !bottomSheet"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
				/>
			</svg>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
import { useStore } from '~/stores/main'
import type { Sort } from '~/models/sort'

defineProps({
	count: {
		type: Number,
		default: 0,
	},
})

const piniaStore = useStore()
const bottomSheet = useBottomSheet()

const sort = computed<Sort>(() => piniaStore.sort)

function setSort(sort: Sort) {
	piniaStore.setSort(sort)
}
</script>
