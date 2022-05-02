<template>
	<div
		class="flex space-x-3 rounded-3xl bg-slate-800 border border-slate-700 py-1 px-4 text-sm text-slate-300 w-max"
	>
		<span class="select-none truncate w-16 sm:w-max">{{ title }}</span>
		<button
			class="outline-none"
			@click="emit('clear')"
		>
			<svg
				class="h-4 w-4 mt-[2px] text-slate-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	</div>
</template>

<script
	setup
	lang="ts"
>
defineProps<{
	title: string
}>()

const emit = defineEmits<{
	(e: 'clear'): void
}>()
</script>
