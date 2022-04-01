<template>
  <div class="flex relative w-full">
    <button
        class="flex items-center space-x-2 outline-none"
        @click="active = !active"
    >
      <slot name="icon" />
      <span class="text-slate-300 text-left w-16">{{selected.title}}</span>
    </button>

    <div
        class="
          absolute
          top-full -right-1
          w-max
          bg-slate-800
          border-t border-t-slate-700
          shadow-md
          rounded-lg
          text-slate-300
          py-2 mt-2
        "
        v-if="active"
    >
      <p
          class="
            pl-4 pr-10 py-1
            transition duration-100 ease-in-out
            hover:bg-slate-600/30
            hover:text-slate-200
            hover:cursor-pointer
          "
          v-for="option in options"
          :key="option.title"
          :class="option.title === selected.title ? 'text-teal-400 hover:text-teal-400' : ''"
          @click="select(option)"
      >
        {{option.title}}
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: Array<object>,
  defaultOption: object,
  modelValue: any
}>()

const emit = defineEmits<{
    (e: "update:modelValue", option: object): void
}>()

let active = useState<boolean>("active", () => false)
let selected = useState<object>("selected", () => ({}))

const select = (option) => {
  selected.value = option
  active.value = false

  emit("update:modelValue", option.value)
}

if (props.defaultOption && Object.keys(props.defaultOption).length > 0) {
  select(props.defaultOption)
} else {
  select(props.options[0])
}
</script>