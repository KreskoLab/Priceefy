<template>
	<div class="relative font-sans h-screen bg-slate-900">
		<div
			class="flex flex-col justify-center items-center h-full container mx-auto py-10 px-4 text-slate-200"
		>
			<h1>Помилка сервера 😱</h1>
			<h2>{{ error.statusCode }}</h2>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
defineProps({
	error: Object,
})
</script>

<style scoped>
h1,
h2 {
	font-size: 3rem;
}
</style>
