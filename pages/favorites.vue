<script setup lang="ts">
import { Product } from '~/models/product'

definePageMeta({
	key: 'favorites',
})

const userStore = useUser()
const router = useRouter()
const city = useCityCookie()

if (!userStore.value.loggedIn) router.push('/')

const { data: products } = await useFetch<Product[]>(
	`/api/favorites?userId=${userStore.value.user._id}&city=${city.slug}`,
	{
		headers: useRequestHeaders(['cookie']),
		initialCache: false,
	}
)
</script>

<template>
	<div class="h-full px-6 pt-4 pb-8 lg:px-0 lg:pt-0">
		<Head>
			<Title>Обранні товари</Title>
		</Head>

		<h1 class="text-2xl dark:text-slate-200 text-gray-800">Обранні товари</h1>

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
