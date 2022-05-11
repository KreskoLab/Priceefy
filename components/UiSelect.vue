<template>
	<div class="flex relative w-full">
		<button
			ref="dropdown"
			class="flex items-center space-x-2 outline-none"
			@click="active = !active"
		>
			<slot name="icon" />
			<span class="text-slate-300 text-left w-16">{{ selected.title }}</span>
		</button>

		<ul
			v-if="active"
			class="absolute top-full -right-1 w-max bg-slate-800 border-t border-t-slate-700 shadow-md rounded-lg text-slate-300 py-2 mt-2"
		>
			<li
				v-for="option in options"
				:key="option.title"
				class="pl-4 pr-10 py-1 transition duration-100 ease-in-out hover:bg-slate-600/30 hover:text-slate-200 hover:cursor-pointer"
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
