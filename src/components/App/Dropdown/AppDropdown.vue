<script setup lang="ts">
const active = ref<boolean>(false)
const dropdown = ref<HTMLElement | null>(null)

onMounted(() => onClickOutside(dropdown, () => (active.value = false)))

function open() {
	active.value = true
}

defineExpose({ open })
</script>

<template>
	<div class="relative w-max">
		<div
			@click="active = !active"
			ref="dropdown"
			class="flex items-center space-x-2 cursor-pointer"
		>
			<slot name="header" />
		</div>

		<Transition name="scale-fade">
			<ul
				v-if="active"
				class="absolute origin-top-right right-0 w-32 mt-2 py-1 dark:bg-slate-800 bg-white border-t dark:border-t-slate-700 border-t-gray-200 shadow-md rounded-lg"
			>
				<slot />
			</ul>
		</Transition>
	</div>
</template>

<style scoped>
.scale-fade-enter-active {
	transition: all 0.1s ease-out;
}

.scale-fade-leave-active {
	transition: all 0.1s cubic-bezier(0.17, 0.67, 1, 0.21);
}

.scale-fade-enter-from,
.scale-fade-leave-to {
	transform: scale(0.7);
	opacity: 0;
}
</style>
