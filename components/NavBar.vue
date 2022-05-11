<template>
	<div class="fixed top-0 h-16 z-50 w-full border-b border-slate-800 bg-slate-900/75 backdrop-blur">
		<div class="flex justify-between items-center container mx-auto px-4 sm:px-0 lg:px-8 h-full">
			<Logo />

			<div class="hidden sm:flex sm:grow sm:max-w-xs md:max-w-sm 2xl:max-w-xl">
				<SearchInput />
			</div>

			<div class="flex items-center space-x-4">
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

				<UiSelect
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
				</UiSelect>

				<NuxtLink
					to="http://localhost:8000/users/auth/google"
					v-if="!userStore.loggedIn"
				>
					<svg
						class="h-6 w-6 text-slate-200"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</NuxtLink>

				<Dropdown v-else>
					<template #header>
						<div class="w-10 h-10">
							<img
								class="object-cover rounded-lg"
								:src="user.avatar"
								alt="user avatar"
							/>
						</div>

						<svg
							class="h-5 w-5 text-slate-300"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</template>

					<DropdownItem>Обранні</DropdownItem>
					<DropdownItem @click="userStore.logOut()">Вийти</DropdownItem>
				</Dropdown>
			</div>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
import { City } from '~/models/city'
import { SelectOption } from '~/models/select-option'
import { useStore } from '~/stores/main'
import { useUser } from '~/stores/user'

const userStore = useUser()
const user = userStore.user

const piniaStore = useStore()
const config = useRuntimeConfig()

const showMobileSearch = useState<boolean>('mobileSearch', () => false)

const city = computed({
	get: () => piniaStore.city,
	set: (value: City) => piniaStore.setCity(value),
})

const { data: cities } = await useAsyncData('cities', async () => {
	const res: City[] = await $fetch(`${config.baseAPI}/store/cities`)

	const options: SelectOption[] = res.map(city => ({ title: city.name, value: city }))
	return options
})

const defaultOption: SelectOption = cities.value.find(item => item.value.slug === city.value.slug)
</script>
