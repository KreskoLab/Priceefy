<template>
	<ul class="flex flex-col space-y-4 mt-3 mb-8">
		<h2 class="text-slate-100 text-xl">{{ title }}</h2>

		<li
			v-for="item in items"
			:key="item.slug"
		>
			<button
				class="flex items-center w-full space-x-2 bg-slate-800 border-t border-t-slate-700 outline-none hover:bg-slate-400/20 rounded-md py-2 px-3 text-slate-400 transition duration-150 ease-in"
				:class="item.slug === selected.slug ? 'btn_selected' : ''"
				@click="select(item)"
			>
				<img
					class="w-6 h-6"
					:src="`${config.baseImages}/_/static/${item.image}`"
					:alt="item.name"
				/>
				<span class="float-left truncate">{{ item.name }}</span>
			</button>
		</li>
	</ul>
</template>

<script
	setup
	lang="ts"
>
import type { Store } from '@/models/store'
import type { Category } from '@/models/category'

const props = defineProps<{
	title: string
	modelValue: object
	items: (Store | Category)[]
}>()

const config = useRuntimeConfig()

const selected = reactive<Store | Category>({
	name: '',
	image: '',
	slug: '',
})

const emit = defineEmits<{
	(e: 'update:modelValue', selected: object): void
}>()

function select(item: Store | Category) {
	if (selected.slug === item.slug) {
		unSelect()
		emit('update:modelValue', selected)
	} else {
		Object.assign(selected, item)
		emit('update:modelValue', selected)
	}
}

function unSelect() {
	Object.keys(selected).forEach((key) => delete selected[key])
}

watch(
	() => props.modelValue,
	(val) => {
		if (Object.keys(val).length === 0) unSelect()
		else Object.assign(selected, val)
	},
	{
		deep: true,
		immediate: true,
	}
)
</script>

<style scoped>
.btn_selected {
	@apply ring-2 ring-teal-400
  text-slate-300;
}
</style>
