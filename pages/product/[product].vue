<script setup lang="ts">
import type { Product } from '~/models/product'
import type { Badge } from '~/models/badge'
import { useStore } from '~/stores/main'
import { Price } from '~/models/price'

const piniaStore = useStore()
const userStore = useUser()

const route = useRoute()
const router = useRouter()

const queryObject = useQueryObject()
piniaStore.setCity(useCityCookie())

const showChart = ref<boolean>(false)

const city = computed(() => piniaStore.city)

const isFavorite = computed<boolean>(() => {
	return userStore.value.loggedIn && userStore.value.user.favorites.includes(product.value._id)
})

const { data: product } = await useFetch<Product>(`/api/product/${route.params.product}`, {
	params: { city: city.value.slug },
})

const { data: pricesSeries } = await useFetch<Pick<Price, 'price' | 'store' | 'created_at'>[]>(
	`/api/product/${route.params.product}/prices`,
	{
		params: { city: city.value.slug, period: 'week' },
		initialCache: false,
	}
)

const information = computed<Badge[]>(() => {
	const items = []

	if (product.value.country)
		items.push({
			header: 'країна',
			text: product.value.country.charAt(0).toUpperCase() + product.value.country.slice(1),
		})

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

const prices = computed(() =>
	product.value.prices
		.sort((a, b) => a.price - b.price)
		.map(price => ({
			header: price.store,
			price: price.discount
				? `${price.price.toFixed(2)} ₴ до ${new Date(price.discount_end).getDate()} ${new Date(
						price.discount_end
				  ).toLocaleString('default', {
						month: 'short',
				  })}`
				: `${price.price.toFixed(2)} ₴`,
			inStock: price.in_stock,
		}))
)

async function handleFavorite(productId: string) {
	if (userStore.value.loggedIn) {
		const config = useRuntimeConfig()

		userStore.value.user.favorites = await $fetch(
			`${config.baseAPI}/users/${userStore.value.user._id}/favorites`,
			{
				headers: useRequestHeaders(['cookie']),
				credentials: 'include',
				method: 'PUT',
				body: {
					product: productId,
				},
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
		class="dark:bg-slate-800 bg-white flex flex-col space-y-6 px-4 pt-2 pb-4 rounded-none w-full mx-auto lg:rounded-lg xl:px-10 xl:space-y-4 xl:w-10/12"
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
				<IconMdiCloseCircleOutline class="text-xl" />
			</button>
		</div>

		<div class="flex flex-col space-y-6 xl:flex-row xl:space-x-10">
			<div class="relative grid place-items-center p-4 dark:bg-slate-700/90 bg-white rounded-xl">
				<img
					width="512"
					height="512"
					class="rounded-md"
					:src="product.image"
					:alt="product.name"
				/>

				<button
					@click="handleFavorite(product._id)"
					class="absolute top-4 right-4 rounded-md bg-gray-100 dark:bg-slate-400 p-2 z-10 focus:outline-none"
				>
					<IconMdiHeartPlusOutline
						v-if="!isFavorite"
						class="dark:text-slate-800 text-gray-600 text-xl"
					/>

					<IconMdiHeart
						v-else
						class="text-amber-300 text-xl"
					/>
				</button>
			</div>

			<div class="flex flex-col space-y-8 flex-grow">
				<section>
					<div class="flex items-center space-x-2 mb-4 text-teal-400">
						<IconMdiInformationOutline class="text-2xl" />
						<h2 class="uppercase tracking-wide">інформація</h2>
					</div>

					<div class="grid grid-cols-3 gap-4">
						<AppBadge
							class="col-span-full md:col-span-1"
							v-for="item in information"
							:key="item.header"
							:header="item.header"
						>
							<p>{{ item.text }}</p>
						</AppBadge>
					</div>
				</section>

				<section>
					<div class="flex items-center space-x-2 mb-4 text-teal-400">
						<IconMdiTagMultipleOutline class="text-2xl" />

						<div class="flex items-center justify-between w-full">
							<h3 class="uppercase tracking-wide">Ціни</h3>
							<IconMdiChartAreaspline
								@click="showChart = !showChart"
								class="cursor-pointer"
							/>
						</div>
					</div>

					<div
						class="bg-gray-100 dark:bg-slate-700/90 rounded-md"
						v-if="showChart"
					>
						<ProductPriceChart
							chart-id="prices"
							:chart-data="pricesSeries"
							:height="280"
						/>
					</div>

					<div
						class="grid gap-4"
						v-else
					>
						<AppBadge
							class="col-span-full md:col-span-1"
							v-for="item in prices"
							:key="item.header"
							:header="item.header"
						>
							<p>{{ item.price }}</p>
							<p
								class="text-sm mb-1 text-slate-600 dark:text-slate-200"
								v-if="!item.inStock"
							>
								Немає в наявності
							</p>
						</AppBadge>
					</div>
				</section>
			</div>
		</div>
	</article>
</template>
