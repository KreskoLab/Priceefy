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
const user = userStore.value.user
const loggedIn = userStore.value.loggedIn
const router = useRouter()

const products = ref<Product[]>([])

onMounted(async () => {
	products.value = await $fetch(`http://localhost:8000/users/${user._id}/favorites`, {
		headers: useRequestHeaders(['cookie']),
		credentials: 'include',
	})
})
</script>
