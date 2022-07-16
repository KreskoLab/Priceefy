<template>
	<div class="relative w-full">
		<input
			placeholder="Пошук"
			ref="search"
			autofocus
			class="appearance-none outline-none rounded-md dark:bg-slate-700/70 bg-gray-200/70 w-full h-10 px-10 focus:ring-2 dark:focus:ring-slate-700/50 focus:ring-gray-200/50 transition duration-200 ease-in-out dark:text-slate-300 text-gray-800 dark:caret-slate-50"
		/>

		<svg
			class="h-6 w-6 absolute inset-2 dark:text-slate-400 text-gray-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>

		<span
			class="hidden sm:inline absolute right-2 dark:bg-slate-700/50 my-2 px-2 rounded-md shadow dark:text-slate-400 text-gray-500"
		>
			/
		</span>
	</div>
</template>

<script
	setup
	lang="ts"
>
const search = ref(null)

function eventHandler(event: KeyboardEvent) {
	if (event.key === '/') search.value.focus()
	if (event.key === 'Escape') search.value.blur()
}

onMounted(() => {
	window.addEventListener('keyup', eventHandler)
})

onUnmounted(() => window.removeEventListener('keyup', eventHandler))
</script>
