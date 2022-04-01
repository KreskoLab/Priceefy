<template>
  <div class="w-full h-full  xl:pl-72">

    <Head>
      <Title>Перегляд цін на продукти - Pricify</Title>
    </Head>

    <div class="flex items-center space-x-4 w-full mt-3 h-10">

      <svg
          class="h-6 w-6 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          v-if="Object.keys(store).length || Object.keys(category).length"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>

      <Chip
          :title="store.name"
          @clear="store = {}"
          v-if="Object.keys(store).length"
      />

      <Chip
          :title="category.name"
          @clear="category = {}"
          v-if="Object.keys(category).length"
      />
    </div>

    <div class="mb-8">

      <div class="w-full py-3 text-slate-200 mb-4">
        <span class="font-medium text-lg">{{ data.count }}</span>
        <span class="ml-2">товарів знайдено</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 w-full h-full" v-if="!pending">
        <Card
            v-for="product in data.products"
            :key="product.slug"
            :name="product.name"
            :image="product.image"
            :country="product.country"
            :weight="product.weight"
            :unit="product.unit"
            :trademark="product.trademark"
            :prices="product.prices"
        />
      </div>

      <div class="mt-12 mb-4 2xl:mr-52" v-if="!pending">
        <Pagination
            :count="data.count"
            :defaultPage="route.query.page"
            query="page"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCity, useSelectedCategory, useSelectedStore} from "~/composables/states";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const city = useCity();

const category = useSelectedCategory();
const store = useSelectedStore();

const currentPage = useState<string>("currentPage", () => route.query.page ? String(route.query.page) : "1")
const queries = ref<string>()

const { data, refresh, pending } = await useAsyncData<object>("data", async () => {
  return await $fetch(`${config.baseAPI}/product/city/${city.value.slug}?${queries.value}`)
  .then(([res]: object[]) => ({
    products: res.results,
    count: res.count
  }))
})

watch(city, (val) => {
  const cookie = useCookie<object>("cityCookie")
  cookie.value = val

  router.push({path: '/', query: {...route.query, page: "1"}})
  if (route.query.page === "1") {
    refresh()
  }
})

watch(() => route.query.page, (page: string) => {
  currentPage.value = page
})

watch(() => route.query, () => {
  queries.value = Object.keys(route.query).map((key) => `${key}=${route.query[key]}`).join('&')
  console.log(queries.value)
  refresh()
})

watch(category, (newCategory: object) => {
  if (newCategory.slug) {
    router.push({path: '/', query: {...route.query, page: "1", category: newCategory.slug}})
  }

  else {
    let newQuery = Object.assign({}, route.query);
    delete newQuery.category
    router.push({path: '/', query: {...newQuery, page: "1"}})
  }
}, { deep: true })

watch(store, (newStore: object) => {
  if (newStore.slug) {
    router.push({path: '/', query: {...route.query, page: "1", store: newStore.slug}})
  }

  else {
    let newQuery = Object.assign({}, route.query);
    delete newQuery.store
    router.push({path: '/', query: {...newQuery, page: "1"}})
  }
}, { deep: true })
</script>
