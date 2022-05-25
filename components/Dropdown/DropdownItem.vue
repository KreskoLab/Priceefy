<template>
	<li
		class="dark:text-slate-200 text-gray-800 select-none dark:hover:bg-slate-600/30 hover:bg-gray-200/30 hover:rounded-md hover:cursor-pointer"
	>
		<a
			v-if="!hasLink"
			class="w-full block px-3 py-1.5"
		>
			<slot />
		</a>

		<div
			class="hasLink w-full px-3 py-1.5"
			v-else
		>
			<slot />
		</div>
	</li>
</template>

<script
	setup
	lang="ts"
>
defineProps<{
	hasLink?: boolean
}>()
</script>

<style scoped>
div.hasLink :deep(a) {
	display: block;
	width: 100%;
}
</style>
