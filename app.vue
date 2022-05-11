<script
	setup
	lang="ts"
>
import { useUser } from '~/stores/user'

const showBottomSheet = useBottomSheet()
const userStore = useUser()

userStore.getUser()

watch(showBottomSheet, val => {
	if (val) document.body.classList.add('overflow-y-hidden')
	else document.body.classList.remove('overflow-y-hidden')
})
</script>

<template>
	<div class="min-h-screen overflow-y-auto bg-slate-900">
		<NavBar />

		<BottomSheet />

		<div class="container mx-auto">
			<div class="hidden lg:block">
				<SideBar v-if="$route.name !== 'callback' && $route.name !== 'product-product'" />
			</div>

			<main class="pt-[4.5rem] lg:px-8 lg:pt-24">
				<NuxtPage />
			</main>
		</div>
	</div>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: opacity 0.3s;
}
.page-enter,
.page-leave-to {
	opacity: 0;
}
</style>
