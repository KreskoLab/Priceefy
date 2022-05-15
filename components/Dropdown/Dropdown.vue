<template>
	<div class="relative w-max">
		<div
			@click="active = !active"
			ref="dropdown"
			class="flex items-center space-x-2 cursor-pointer"
		>
			<slot name="header" />
		</div>

		<ul
			v-if="active"
			class="absolute right-0 w-32 mt-2 py-1 dark:bg-slate-800 bg-white border-t dark:border-t-slate-700 border-t-gray-200 shadow-md rounded-lg"
		>
			<slot />
		</ul>
	</div>
</template>

<script
	setup
	lang="ts"
>
const active = ref<boolean>(false)
const dropdown = ref<HTMLElement | null>(null)

onMounted(() => onClickOutside(dropdown, () => (active.value = false)))

function open() {
	active.value = true
}

defineExpose({ open })
</script>
