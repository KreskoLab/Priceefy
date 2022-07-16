<script setup lang="ts">
import { Product } from '~/models/product'

const route = useRoute()
const { slug } = useCityCookie()

const { data: products } = await useFetch<Product[]>(`/api/search?q=${route.query.q}&city=${slug}`)
</script>

<template>
	<div class="h-full px-6 pt-4 pb-8 lg:px-0 lg:pt-0">
		<Head>
			<Title>Пошук</Title>
		</Head>

		<h1 class="text-2xl dark:text-slate-200 text-gray-800">
			Знайдено {{ products.length }} товари
		</h1>

		<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 w-full h-full mt-8">
			<NuxtLink
				v-for="product in products"
				:key="product.slug"
				:to="`/product/${product.slug}`"
			>
				<AppCard :product="product" />
			</NuxtLink>
		</div>
	</div>
</template>
