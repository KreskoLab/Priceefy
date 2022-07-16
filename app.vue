<script setup lang="ts">
await logIn()

const showBottomSheet = useBottomSheet()

watch(showBottomSheet, val => {
	if (val) document.body.classList.add('overflow-y-hidden')
	else document.body.classList.remove('overflow-y-hidden')
})
</script>

<template>
	<div class="min-h-screen overflow-y-auto overflow-x-hidden dark:bg-slate-900 bg-gray-100">
		<TheHeader v-if="$route.name !== 'callback'" />

		<AppBottomSheet />

		<div class="container mx-auto">
			<div class="hidden lg:block">
				<AppSidebar
					v-if="
						$route.name !== 'callback' &&
						$route.name !== 'product-product' &&
						$route.name !== 'favorites'
					"
				/>
			</div>

			<main class="pt-[4rem] min-w-[320px] lg:px-8 lg:pt-24">
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
