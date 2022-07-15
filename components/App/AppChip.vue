<script setup lang="ts">
defineProps<{
	title: string
}>()

const emit = defineEmits<{
	(e: 'remove'): void
}>()
</script>

<template>
	<div
		class="flex space-x-3 rounded-3xl dark:bg-slate-800 bg-white border dark:border-slate-700 border-gray-200 py-1.5 px-4 text-sm dark:text-slate-300 text-gray-600 w-max"
	>
		<p class="select-none truncate w-min">{{ title }}</p>

		<button
			class="outline-none"
			@click="emit('remove')"
		>
			<IconMdiClose
				class="text-slate-400 mt-[1px] hover:text-slate-600 dark:hover:text-slate-200"
			/>
		</button>
	</div>
</template>
