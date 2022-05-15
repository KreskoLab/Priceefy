<script
	setup
	lang="ts"
>
import type { Product } from '~/models/product'
import type { Badge } from '~/models/badge'
import { useStore } from '~/stores/main'

const piniaStore = useStore()
const userStore = useUser()
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const isFavorite = computed<boolean>(() => {
	return userStore.value.loggedIn && userStore.value.user.favorites.includes(product.value._id)
})

const queryObject = useQueryObject()
piniaStore.setCity(useCityCookie())

const { data: product } = await useFetch<Product>(`/api/product/${route.params.product}`, {
	params: { city: useCityCookie().slug },
})

const information = computed<Badge[]>(() => {
	const items = []

	if (product.value.country) items.push({ header: 'країна', text: product.value.country })

	if (product.value.trademark !== 'без тм')
		items.push({ header: 'тм', text: product.value.trademark })

	if (product.value.weight) {
		items.push({
			header: 'вага',
			text: useHandleWeight(product.value.weight, product.value.unit),
		})
	}

	return items
})

const prices = computed<Badge[]>(() => {
	return product.value.prices
		.sort((a, b) => a.price - b.price)
		.map(item => ({
			header: item.store,
			text: `${item.price.toFixed(2)} ₴`,
		}))
})

async function handleFavorite(productId: string) {
	if (userStore.value.loggedIn) {
		const httpMethod = userStore.value.user.favorites.includes(productId) ? 'delete' : 'post'

		const res = await $fetch<string[]>(
			`${config.baseAPI}/users/${userStore.value.user._id}/favorite`,
			{
				method: httpMethod,
				credentials: 'include',
				body: {
					product: productId,
				},
			}
		)

		userStore.value.user.favorites = res
	} else {
		piniaStore.openDropdown()
	}
}

function close() {
	if (queryObject) {
		return router.go(-1)
	} else return navigateTo({ path: '/', query: { page: '1' } })
}
</script>

<template>
	<div class="w-full h-full">
		<Head>
			<Title>{{ product.name }} - Priceefy</Title>

			<Meta
				name="description"
				:content="`${product.name} ціни та акції - priceefy.com`"
			/>

			<Meta
				name="keywords"
				:content="`${product.name}, ${product.trademark}, ${product.name} ціна, ${product.name} акції,`"
			/>
		</Head>

		<div
			class="relative flex flex-col lg:mt-8 lg:flex-row space-y-5 lg:space-x-20 lg:py-14 w-full md:w-10/12 mx-auto md:px-6 rounded-xl border-0 md:border-8 dark:border-slate-800 border-gray-200"
		>
			<button
				class="absolute top-0 right-0 dark:text-slate-200 text-gray-600 p-6"
				@click="close()"
			>
				<svg
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-x-circle"
					viewBox="0 0 16 16"
				>
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
					<path
						d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
					/>
				</svg>
			</button>

			<h1 class="text-xl dark:text-slate-200 text-gray-800 block px-8 md:hidden">
				{{ product.name }}
			</h1>

			<div
				class="relative grid place-items-center w-full lg:w-4/12 h-1/2 dark:bg-slate-700/90 bg-white rounded-xl"
			>
				<img
					:src="`${config.baseImages}/products/${product.image}?width=356&height=356`"
					:alt="product.name"
				/>

				<button
					@click="handleFavorite(product._id)"
					class="absolute top-4 right-4 rounded-md bg-gray-100 dark:bg-gray-100 p-2 z-10 focus:outline-none"
				>
					<svg
						class="h-6 w-6 dark:stroke-slate-800 stoke-gray-600"
						:class="{ 'fill-amber-300 stroke-amber-300 dark:stroke-amber-300': isFavorite }"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
						/>
					</svg>
				</button>
			</div>

			<div class="flex flex-col space-y-8 flex-1 px-8 py-4 md:px-0">
				<h1 class="text-xl dark:text-slate-200 text-gray-800 hidden md:block">
					{{ product.name }}
				</h1>

				<div>
					<div class="flex space-x-2 mb-4">
						<svg
							class="h-6 w-6 text-teal-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span class="uppercase tracking-wide text-teal-400">інформація</span>
					</div>

					<div class="flex flex-row flex-wrap justify-center lg:justify-start gap-4">
						<Badge
							v-for="item in information"
							:key="item.header"
							:header="item.header"
							:text="item.text"
						/>
					</div>
				</div>

				<div>
					<div class="flex space-x-2 mb-4">
						<svg
							class="h-6 w-6 text-teal-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
							/>
						</svg>
						<span class="uppercase tracking-wide text-teal-400">Ціни</span>
					</div>

					<div class="flex flex-row flex-wrap justify-center lg:justify-start gap-4">
						<Badge
							v-for="item in prices"
							:key="item.header"
							:header="item.header"
							:text="item.text"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
