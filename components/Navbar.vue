<template>
	<div class="fixed top-0 h-16 z-50 w-full border-b border-slate-800 bg-slate-900/75 backdrop-blur">
		<div class="flex justify-between items-center container mx-auto px-4 sm:px-0 lg:px-8 h-full">
			<Logo />

			<div class="hidden sm:flex sm:grow sm:max-w-xs md:max-w-sm 2xl:max-w-xl">
				<SearchInput />
			</div>

			<div class="flex space-x-4">
				<div class="sm:hidden">
					<svg
						class="h-6 w-6 text-slate-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						@click="showMobileSearch = !showMobileSearch"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>

					<div
						v-if="showMobileSearch"
						class="absolute z-50 top-[60px] left-0 bg-slate-900/75 border-b border-slate-800 w-full px-3 py-4"
					>
						<SearchInput />
					</div>
				</div>

				<DropDown
					v-model="city"
					:options="cities"
					:default-option="defaultOption"
				>
					<template #icon>
						<svg
							class="h-6 w-6 text-slate-50"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</template>
				</DropDown>
			</div>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
import { City } from '~/models/city'
import { DropdownOption } from '~/models/dropdown-option'
import { state, setCity } from '~/stores/main'

const config = useRuntimeConfig()

const showMobileSearch = useState<boolean>('mobileSearch', () => false)

const city = computed({
	get: () => state.city,
	set: (value: City) => setCity(value),
})

const { data: cities } = await useAsyncData('cities', async () => {
	const res: City[] = await $fetch(`${config.baseAPI}/store/cities`)

	const options: DropdownOption[] = res.map(city => ({ title: city.name, value: city }))
	return options
})

const defaultOption: DropdownOption = cities.value.find(item => item.value.slug === city.value.slug)
</script>
