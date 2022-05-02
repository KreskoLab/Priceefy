<script
	setup
	lang="ts"
>
const showBottomSheet = useBottomSheet()
</script>

<template>
	<div
		class="h-full bg-slate-900"
		:class="showBottomSheet ? 'overflow-y-hidden' : 'overflow-y-auto'"
	>
		<NavBar />

		<BottomSheet />

		<div class="container mx-auto">
			<div class="hidden xl:block">
				<SideBar v-if="$route.name !== 'product'" />
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
