<template>
	<div
		class="fixed top-0 h-16 z-50 w-full border-b dark:border-slate-800 dark:bg-slate-900/75 bg-white/75 border-gray-200 backdrop-blur"
	>
		<div class="flex justify-between items-center container mx-auto px-4 lg:px-8 h-full">
			<div class="flex items-center space-x-4">
				<Logo />

				<UiSelect
					v-model="city"
					:options="cities"
					:default-option="defaultOption"
				/>
			</div>

			<div class="hidden sm:flex sm:grow sm:max-w-xs md:max-w-sm 2xl:max-w-xl">
				<SearchInput />
			</div>

			<div class="flex items-center space-x-6">
				<div class="sm:hidden">
					<svg
						class="h-6 w-6 dark:text-slate-400"
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
						class="absolute z-50 top-[60px] left-0 dark:bg-slate-900/70 bg-white/70 border-b border-gray-200 dark:border-slate-800 w-full px-3 py-4"
					>
						<SearchInput />
					</div>
				</div>

				<div class="hidden lg:block lg:!mx-8">
					<ClientOnly>
						<ColorToggle />
					</ClientOnly>
				</div>

				<Dropdown ref="dropdown">
					<template #header>
						<div
							class="rounded-full border-[1.6px] dark:border-slate-50 border-gray-600 p-2"
							v-if="!userStore.loggedIn"
						>
							<svg
								viewBox="0 0 20 21.9"
								class="h-4 w-4 dark:fill-slate-300 fill-gray-600"
							>
								<path
									d="M13.4,11.7c2.9-1.9,3.8-5.8,1.9-8.8S9.5-0.9,6.6,1S2.8,6.8,4.7,9.8c0.5,0.8,1.1,1.4,1.9,1.9
	C2.6,13.1,0,16.9,0,21.1c0,0.4,0.4,0.8,0.8,0.8s0.8-0.4,0.8-0.8c0-4.6,3.8-8.4,8.4-8.4s8.4,3.8,8.4,8.4c0,0.4,0.4,0.8,0.8,0.8
	c0.4,0,0.8-0.4,0.8-0.8C20,16.9,17.4,13.1,13.4,11.7 M5.3,6.3c0-2.6,2.1-4.7,4.7-4.7s4.7,2.1,4.7,4.7s-2.1,4.7-4.7,4.7
	C7.4,11.1,5.3,8.9,5.3,6.3"
								/>
							</svg>
						</div>

						<div
							class="w-10 h-10"
							v-else
						>
							<img
								class="object-cover rounded-lg select-none"
								:src="userStore.user.avatar"
								alt="user avatar"
							/>
						</div>

						<svg
							class="h-5 w-5 dark:text-slate-300"
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

					<DropdownItem class="lg:hidden">
						<div class="flex items-center justify-between">
							<span>Тема</span>
							<ColorToggle />
						</div>
					</DropdownItem>

					<DropdownItem v-if="userStore.loggedIn">
						<NuxtLink to="/favorites">Обранні</NuxtLink>
					</DropdownItem>

					<DropdownItem
						v-if="userStore.loggedIn"
						@click="logout()"
					>
						Вийти
					</DropdownItem>

					<DropdownItem v-else>
						<a :href="`${config.baseAPI}/users/auth/google`">Увійти</a>
					</DropdownItem>
				</Dropdown>
			</div>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
import type { City } from '~/models/city'
import type { SelectOption } from '~/models/select-option'
import { useStore } from '~/stores/main'
import Dropdown from '~/components/Dropdown/Dropdown.vue'

const userStore = useUser()
const piniaStore = useStore()
const config = useRuntimeConfig()

const logout = async () => {
	await logOut()
}

const dropdown = ref<InstanceType<typeof Dropdown>>()
const showMobileSearch = useState<boolean>('mobileSearch', () => false)

const city = computed({
	get: () => piniaStore.city,
	set: (value: City) => piniaStore.setCity(value),
})

const { data: cities } = await useFetch<SelectOption[]>('/api/cities')

const defaultOption = cities.value.find(item => item.value.slug === city.value.slug)

watch(
	() => piniaStore.showDropdown,
	val => {
		if (val) {
			dropdown.value?.open()
			piniaStore.openDropdown()
		}
	}
)
</script>
