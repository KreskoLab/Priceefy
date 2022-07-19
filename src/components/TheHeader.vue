<script setup lang="ts">
import type { City } from '~/models/city'
import type { SelectOption } from '~/models/select-option'
import { useStore } from '~/stores/main'
import Dropdown from '~/components/App/Dropdown/AppDropdown.vue'

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

<template>
	<header
		class="fixed top-0 h-16 z-50 min-w-[320px] w-full border-b dark:border-slate-800 dark:bg-slate-900/75 bg-white/75 border-gray-200 backdrop-blur"
	>
		<div class="flex justify-between items-center container mx-auto px-4 lg:px-8 h-full">
			<div class="flex items-center space-x-4">
				<TheLogo />

				<AppSelect
					v-model="city"
					:options="cities"
				/>
			</div>

			<div class="hidden sm:flex sm:grow sm:max-w-xs md:max-w-sm 2xl:max-w-xl">
				<ClientOnly>
					<SearchInput />
				</ClientOnly>
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
						<AppColorToggle />
					</ClientOnly>
				</div>

				<AppDropdown ref="dropdown">
					<template #header>
						<div
							class="rounded-full border-[1.6px] dark:border-slate-50 border-gray-600 p-1.5"
							v-if="!userStore.loggedIn"
						>
							<IconMdiAccountOutline class="dark:text-slate-300 text-gray-600 text-xl" />
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

						<IconMdiChevronDown class="dark:text-slate-300 text-gray-600 text-xl" />
					</template>

					<AppDropdownItem class="lg:hidden">
						<div class="flex items-center justify-between">
							<span>Тема</span>
							<AppColorToggle />
						</div>
					</AppDropdownItem>

					<AppDropdownItem
						v-if="userStore.loggedIn"
						:has-link="true"
					>
						<NuxtLink to="/favorites">Обранні</NuxtLink>
					</AppDropdownItem>

					<AppDropdownItem
						v-if="userStore.loggedIn"
						@click="logout()"
					>
						Вийти
					</AppDropdownItem>

					<AppDropdownItem
						:has-link="true"
						v-else
					>
						<a :href="`${config.baseAPI}/login`">Увійти</a>
					</AppDropdownItem>
				</AppDropdown>
			</div>
		</div>
	</header>
</template>
