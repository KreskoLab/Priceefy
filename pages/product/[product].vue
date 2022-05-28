<script
	setup
	lang="ts"
>
import type { Product } from '~/models/product'
import type { Badge } from '~/models/badge'
import type { ChartSeries } from '~/models/chart-series'
import { useStore } from '~/stores/main'

const piniaStore = useStore()
const userStore = useUser()

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const queryObject = useQueryObject()
piniaStore.setCity(useCityCookie())

const city = computed(() => piniaStore.city)

const isFavorite = computed<boolean>(() => {
	return userStore.value.loggedIn && userStore.value.user.favorites.includes(product.value._id)
})

const { data: product } = await useFetch<Product>(`/api/product/${route.params.product}`, {
	params: { city: city.value.slug },
})

const { data: charts } = await useFetch<ChartSeries>(
	`/api/product/${route.params.product}/prices`,
	{
		params: { city: city.value.slug, period: 'week' },
		initialCache: false,
	}
)

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

const prices = computed<Badge[]>(() =>
	product.value.prices
		.sort((a, b) => a.price - b.price)
		.map(price => ({
			header: price.store,
			text: price.discount
				? `${price.discount_price.toFixed(2)} ₴ до ${new Date(
						price.discount_end
				  ).getDay()} ${new Date(price.discount_end).toLocaleString('default', {
						month: 'short',
				  })}`
				: `${price.price.toFixed(2)} ₴`,
		}))
)

async function handleFavorite(productId: string) {
	if (userStore.value.loggedIn) {
		const httpMethod = userStore.value.user.favorites.includes(productId) ? 'delete' : 'post'

		userStore.value.user.favorites = await $fetch(
			`/api/favorite?userId=${userStore.value.user._id}&product=${productId}&method=${httpMethod}`,
			{
				headers: useRequestHeaders(['cookie']),
			}
		)
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
	<article
		class="flex flex-col space-y-6 px-4 py-4 lg:px-12 lg:space-y-4 lg:w-10/12 w-full mx-auto dark:bg-slate-800 bg-white rounded-lg"
	>
		<Head>
			<Title>{{ product.name }}</Title>

			<Meta
				name="description"
				:content="`${product.name} ціни та акції - Priceefy.com`"
			/>

			<Meta
				name="keywords"
				:content="`${product.name}, ${product.trademark}, ${product.name} ціна, ${product.name} акції,`"
			/>
		</Head>

		<div class="flex items-center justify-between">
			<h1 class="text-xl dark:text-slate-200 text-gray-800">
				{{ product.name }}
			</h1>

			<button
				class="dark:text-slate-300 text-gray-600 p-4"
				@click="close()"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					class="w-6 h-6"
				>
					<path
						d="M12 22C17.4706 22 22 17.4706 22 12C22 6.53922 17.4608 2 11.9902 2C6.52941 2 2 6.53922 2 12C2 17.4706 6.53922 22 12 22ZM12 20.3333C7.37255 20.3333 3.67647 16.6275 3.67647 12C3.67647 7.38235 7.36274 3.66667 11.9902 3.66667C16.6176 3.66667 20.3235 7.38235 20.3333 12C20.3431 16.6275 16.6275 20.3333 12 20.3333ZM8.64706 16.1569C8.86275 16.1569 9.06863 16.0686 9.20588 15.9118L11.9902 13.1176L14.7843 15.9118C14.9314 16.0588 15.1176 16.1569 15.3431 16.1569C15.7745 16.1569 16.1275 15.7941 16.1275 15.3627C16.1275 15.1373 16.049 14.951 15.8922 14.8039L13.1078 12.0196L15.902 9.21569C16.0686 9.04902 16.1373 8.88235 16.1373 8.66667C16.1373 8.22549 15.7843 7.88235 15.3529 7.88235C15.1471 7.88235 14.9804 7.95098 14.8137 8.11765L11.9902 10.9216L9.18627 8.12745C9.04902 7.97059 8.86275 7.90196 8.64706 7.90196C8.21569 7.90196 7.86274 8.23529 7.86274 8.67647C7.86274 8.89216 7.94118 9.07843 8.09804 9.22549L10.8824 12.0196L8.09804 14.8137C7.94118 14.951 7.86274 15.1471 7.86274 15.3627C7.86274 15.7941 8.21569 16.1569 8.64706 16.1569Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</div>

		<div class="flex flex-col space-y-6 lg:flex-row lg:space-x-10">
			<div class="relative grid place-items-center p-4 dark:bg-slate-700/90 bg-white rounded-xl">
				<img
					class="max-w-full lg:min-w-[512px] lg:min-h-[512px] min-h-[360px] rounded-md"
					:src="`${config.baseImages}/products/${product.image}?width=512&height=512`"
					:alt="product.name"
				/>

				<button
					@click="handleFavorite(product._id)"
					class="absolute top-4 right-4 rounded-md bg-gray-100 dark:bg-slate-400 p-2 z-10 focus:outline-none"
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

			<div class="flex flex-col space-y-8">
				<section>
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

						<h2 class="uppercase tracking-wide text-teal-400">інформація</h2>
					</div>

					<div class="flex flex-wrap gap-4">
						<Badge
							v-for="item in information"
							:key="item.header"
							:header="item.header"
							:text="item.text"
						/>
					</div>
				</section>

				<section>
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
						<h3 class="uppercase tracking-wide text-teal-400">Ціни</h3>
					</div>

					<div class="flex flex-wrap flex-col lg:flex-row gap-4">
						<Badge
							v-for="item in prices"
							:key="item.header"
							:header="item.header"
							:text="item.text"
						/>
					</div>
				</section>

				<div class="bg-gray-100 dark:bg-slate-700/90 rounded-md">
					<Charts :chart-series="charts" />
				</div>
			</div>
		</div>
	</article>
</template>
