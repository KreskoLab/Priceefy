<script
	setup
	lang="ts"
>
import type { ProductsAndCount } from '~/models/products-count'
import type { City } from '~/models/city'
import { QueryObject } from '~/models/query-object'
import { state, setCity } from '~/stores/main'

const router = useRouter()

const queryObject = useQueryObject()
queryObject.value = queryObject.value || (router.currentRoute.value.query as QueryObject)

const city = computed(() => state.city)
setCity(useCityCookie())

const store = computed(() => state.store)
const category = computed(() => state.category)

const currentPage = ref<string>('')
currentPage.value = queryObject.value.page || '1'

const paramsObject = reactive({})
Object.assign(paramsObject, queryObject.value)

const { data, refresh, pending } = await useLazyAsyncData<ProductsAndCount>('products', () =>
	$fetch(`/api/products/${city.value.slug}`, {
		params: paramsObject,
	})
)

watch(city, (val, old) => {
	if (val.slug !== old.slug) {
		const cityCookie = useCookie<City>('cityCookie')
		cityCookie.value = val

		if (currentPage.value === '1') refresh()
		else currentPage.value = '1'
	}
})

watch(currentPage, () => updateParamsObject())

watch([store, category], ([newStore, newCategory], [oldStore, oldCategory]) => {
	if (newStore.slug !== oldStore.slug || newCategory.slug !== oldCategory.slug) {
		if (currentPage.value === '1') updateParamsObject()
		else currentPage.value = '1'
	}
})

watch(paramsObject, val => {
	router.push(`/?${new URLSearchParams(val).toString()}`)
	refresh()

	window.scrollTo(0, 0)
})

function updateParamsObject(): void {
	const objectParams: QueryObject = {
		page: currentPage.value,
		store: store.value.slug,
		category: category.value.slug,
	}

	Object.keys(objectParams).forEach(
		key => objectParams[key] === undefined && delete objectParams[key]
	)

	Object.keys(paramsObject).forEach(key => delete paramsObject[key])
	Object.assign(paramsObject, objectParams)

	queryObject.value = objectParams
}
</script>

<template>
	<div class="h-full px-6 sm:px-0 xl:pl-80">
		<Head>
			<Title>Перегляд цін на продукти - Priceefy</Title>
		</Head>

		<div class="mb-8">
			<FiltersBar />

			<Level
				v-if="!pending"
				id="products"
				:count="data.count"
			/>

			<SkeletonLevel v-else />

			<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 w-full h-full">
				<template v-if="!pending">
					<NuxtLink
						v-for="product in data.products"
						:key="product.slug"
						:to="`/${product.slug}`"
					>
						<Card :product="product" />
					</NuxtLink>
				</template>

				<template v-else>
					<SkeletonCard
						v-for="n in 30"
						:key="n"
					/>
				</template>
			</div>

			<div class="mt-12 mb-4 2xl:mr-52">
				<Pagination
					v-if="!pending"
					:count="data.count"
					:per-page="30"
					:page="Number(currentPage)"
					@update-page="currentPage = $event"
				/>
			</div>
		</div>
	</div>
</template>
