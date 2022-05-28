<script
	setup
	lang="ts"
>
import type { ProductsAndCount } from '~/models/products-count'
import type { Store } from '~/models/store'
import type { Category } from '~/models/category'
import { Sort, SortVal, SORT_TITLES } from '~/models/sort'
import { QueryObject } from '~/models/query-object'
import { useStore } from '~/stores/main'

const piniaStore = useStore()
const router = useRouter()
const queryObject = useQueryObject()
const pageLoaded = ref<boolean>(false)

const city = computed(() => piniaStore.city)
piniaStore.setCity(useCityCookie())

const store = computed<Store>(() => piniaStore.store)
const category = computed<Category>(() => piniaStore.category)
const sort = computed<Sort>(() => piniaStore.sort)

const currentPage = ref<string>('')
currentPage.value = queryObject.page || '1'

if (queryObject.sort) {
	piniaStore.setSort({ val: queryObject.sort as SortVal, title: SORT_TITLES[queryObject.sort] })
}

const { data, refresh, pending } = await useLazyAsyncData<ProductsAndCount>(
	'products',
	() =>
		$fetch(`/api/products/${city.value.slug}`, {
			params: queryObject,
		}),
	{ server: category.value.slug ? true : false }
)

onMounted(() => {
	pageLoaded.value = true
})

watch(city, (val, old) => {
	if (val.slug !== old.slug) {
		if (currentPage.value === '1') refresh()
		else {
			if (pageLoaded.value) currentPage.value = '1'
		}
	}
})

watch([currentPage, sort], () => updateParamsObject())

watch(
	[store, category],
	() => {
		if (currentPage.value === '1') updateParamsObject()
		else {
			if (pageLoaded.value) currentPage.value = '1'
		}
	},
	{ deep: true }
)

watch(queryObject, val => {
	router.push({ name: 'index', query: val })
	refresh()

	window.scrollTo(0, 0)
})

function updateParamsObject(): void {
	const newQueryObject: QueryObject = {
		page: currentPage.value,
		store: store.value.slug,
		category: category.value.slug,
		sort: sort.value.val,
	}

	Object.keys(newQueryObject).forEach(key => {
		if (newQueryObject[key] !== undefined) queryObject[key] = newQueryObject[key]
		else delete queryObject[key] && delete newQueryObject[key]
	})
}
</script>

<template>
	<div class="h-full px-6 lg:px-0 lg:pl-80">
		<Head>
			<Title>Перегляд цін на продукти</Title>
			<Meta
				name="description"
				content="Ціни та акції на продукти - priceefy.com"
			/>
			<Meta
				name="keywords"
				content="ціни, акції, перегляд товарів, продукти, сільпо, ашан, метро, новус, silpo"
			/>
		</Head>

		<div class="mb-8">
			<TheFiltersBar />

			<AppLevel
				v-if="!pending"
				:count="data.count"
			/>

			<AppSkeletonLevel v-else />

			<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 w-full h-full">
				<template v-if="!pending">
					<NuxtLink
						v-for="product in data.products"
						:key="product.slug"
						:to="`/product/${product.slug}`"
					>
						<AppCard :product="product" />
					</NuxtLink>
				</template>

				<template v-else>
					<AppSkeletonCard
						v-for="n in 30"
						:key="n"
					/>
				</template>
			</div>

			<div class="mt-12 mb-4 xl:mr-52">
				<AppPagination
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
