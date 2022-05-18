<template>
	<div class="h-full px-6 lg:px-0 lg:pl-80">
		<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 w-full h-full">
			<NuxtLink
				v-for="product in products"
				:key="product.slug"
				:to="`/product/${product.slug}`"
			>
				<Card :product="product" />
			</NuxtLink>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
import { Product } from '~/models/product'

const userStore = useUser()
const router = useRouter()

if (!userStore.value.loggedIn) router.push('/')

const { data: products } = await useFetch<Product[]>(
	`/api/favorites?userId=${userStore.value.user._id}`,
	{
		headers: useRequestHeaders(['cookie']),
	}
)

watch(
	() => userStore.value.loggedIn,
	val => {
		if (!val) router.push('/')
	}
)
</script>
