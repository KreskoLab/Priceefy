<template>
	<div class="flex flex-row justify-center w-full h-full">
		<button
			class="btn_arrow rounded-l-3xl"
			:disabled="page === 1"
			@click="prev()"
		>
			<svg
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
		</button>

		<div class="flex bg-slate-800 border-y-2 border-slate-700 text-slate-300 shadow py-3 px-12">
			<div class="w-max px-2 text-slate-400">{{ page }}</div>
			<div class="">/</div>
			<div class="w-max px-2">{{ pages }}</div>
		</div>

		<button
			class="btn_arrow rounded-r-3xl"
			:disabled="page >= pages"
			@click="next()"
		>
			<svg
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 5l7 7-7 7"
				/>
			</svg>
		</button>
	</div>
</template>

<script
	setup
	lang="ts"
>
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
.btn_arrow {
	@apply outline-none
  bg-slate-800
  border-2 border-transparent border-slate-700
  shadow
  px-6
  text-slate-300
  transition duration-150
  hover:bg-slate-400/20
  active:border-2 active:border-teal-400
  disabled:text-slate-600
  disabled:hover:bg-slate-800
  disabled:active:border-slate-700;
}
</style>
