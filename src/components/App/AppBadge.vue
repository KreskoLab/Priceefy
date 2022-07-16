<script setup lang="ts">
defineProps<{
	header: string
}>()
</script>

<template>
	<div class="flex flex-col rounded-md w-full dark:bg-slate-700/90 bg-gray-100 pt-0">
		<div
			class="w-max dark:bg-slate-800/50 bg-gray-200 self-start rounded-br-lg rounded-tl-lg px-3 mb-1"
		>
			<span class="uppercase dark:text-slate-400 text-gray-500 text-xs tracking-wider leading-6">
				{{ header }}
			</span>
		</div>

		<div class="flex justify-center items-center mb-2 px-2">
			<span class="dark:text-slate-200 text-gray-600 text-center font-medium">
				<slot />
			</span>
		</div>
	</div>
</template>
