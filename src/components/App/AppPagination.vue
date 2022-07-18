<template>
	<div class="flex flex-row justify-center w-full h-full">
		<button
			class="rounded-l-3xl"
			aria-label="Previous page"
			:disabled="page === 1"
			@click="prev()"
		>
			<IconMdiChevronLeft class="text-2xl" />
		</button>

		<div
			class="flex dark:bg-slate-800 bg-white border-y-2 dark:border-slate-700 border-gray-200 dark:text-slate-300 text-gray-800 dark:shadow py-3 px-12"
		>
			<div class="w-max px-2 dark:text-slate-400 text-gray-600">{{ page }}</div>
			<div class="">/</div>
			<div class="w-max px-2">{{ pages }}</div>
		</div>

		<button
			class="rounded-r-3xl"
			aria-label="Next page"
			:disabled="page >= pages"
			@click="next()"
		>
			<IconMdiChevronRight class="text-2xl" />
		</button>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	count: {
		type: Number,
		default: 0,
	},
	perPage: {
		type: Number,
		default: 30,
	},
	page: {
		type: Number,
		default: 1,
	},
})

const emit = defineEmits<{
	(e: 'updatePage', page: string): void
}>()

const pages = computed<number>(() => Math.ceil(props.count / props.perPage))

function prev() {
	if (props.page !== 1) {
		let pageCopy = props.page
		pageCopy--
		emit('updatePage', String(pageCopy))
	}
}

function next() {
	if (props.page < pages.value) {
		let pageCopy = props.page
		pageCopy++
		emit('updatePage', String(pageCopy))
	}
}
</script>

<style scoped>
button {
	@apply outline-none
  dark:bg-slate-800 bg-white
  border-2 border-transparent dark:border-slate-700 border-gray-200
  dark:shadow
  px-6
	transition duration-150
  dark:text-slate-300 text-gray-500
  dark:hover:bg-slate-400/20
	hover:bg-gray-100
  active:border-teal-400
	focus:border-teal-400
	dark:active:border-teal-400
	dark:focus:border-teal-400
  dark:disabled:text-slate-600
  dark:disabled:hover:bg-slate-800
  dark:disabled:active:border-slate-700
	disabled:text-gray-300
	disabled:active:border-gray-200
	disabled:hover:bg-white;
}
</style>
