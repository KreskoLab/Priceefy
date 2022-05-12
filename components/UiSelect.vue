<template>
	<div class="flex relative w-max">
		<button
			ref="dropdown"
			class="flex items-center space-x-2 outline-none py-1 px-2 dark:bg-slate-800/90 bg-gray-100 border-t dark:border-t-slate-700 border-t-gray-200 rounded-full text-center"
			@click="active = !active"
		>
			<span class="dark:text-slate-300 text-gray-600 text-sm w-16">{{ selected.title }}</span>
		</button>

		<ul
			v-if="active"
			class="absolute top-full -left-1 w-max dark:bg-slate-800 bg-white border-t dark:border-t-slate-700 border-t-gray-200 shadow-md rounded-lg dark:text-slate-300 text-gray-600 py-2 mt-2"
		>
			<li
				v-for="option in options"
				:key="option.title"
				class="pl-4 pr-10 py-1 transition duration-100 ease-in-out dark:hover:bg-slate-600/30 hover:bg-gray-200/30 dark:hover:text-slate-200 hover:text-gray-800 hover:cursor-pointer"
				:class="{ 'text-teal-400 hover:text-teal-400': option.title === selected.title }"
				@click="select(option)"
			>
				{{ option.title }}
			</li>
		</ul>
	</div>
</template>

<script
	setup
	lang="ts"
>
import { City } from '~/models/city'
import { SelectOption } from '~/models/select-option'

const props = defineProps<{
	options: SelectOption[]
	defaultOption: SelectOption
	modelValue: City
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', option: object): void
}>()

const active = ref<boolean>(false)
const dropdown = ref<HTMLElement | null>(null)

const selected = reactive({ title: '', value: {} })

onMounted(() => onClickOutside(dropdown, () => (active.value = false)))

const select = (option: SelectOption) => {
	selected.title = option.title
	selected.value = option.value

	active.value = false
	emit('update:modelValue', option.value)
}

if (props.defaultOption && Object.keys(props.defaultOption).length > 0) {
	select(props.defaultOption)
} else {
	select(props.options[0])
}
</script>
