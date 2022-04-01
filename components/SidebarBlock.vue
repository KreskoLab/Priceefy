<template>
  <h2 class="text-slate-100 text-xl">{{title}}</h2>

  <div class="flex flex-col space-y-4 pt-3 pb-8">
    <button
        class="
          flex items-center space-x-2
          bg-slate-800
          border-t border-t-slate-700
          outline-none
          hover:bg-slate-400/20
          rounded-md
          py-2 px-3
          text-slate-400
          transition duration-150 ease-in
        "
        v-for="item in items"
        :key="item.slug"
        :class="item.slug === props.state.slug ? 'btn_selected': ''"
        @click="select(item)"
    >
      <img class="w-6 h-6" :src="`${config.baseImages}/${item.image}`" :alt="item.name">
      <span class="float-left">{{ item.name }}</span>
    </button>
  </div>

</template>

<script setup>
const props = defineProps({
  title: String,
  items: {
    type: Array,
    default: []
  },
  state: Object
})

const config = useRuntimeConfig();

const select = (item) => {
  if (props.state.slug === item.slug) {
    Object.keys(props.state).forEach(key => delete props.state[key]);
  }
  else {
    Object.assign(props.state, item)
  }
}
</script>

<style scoped>
 .btn_selected {
   @apply
   ring-2 ring-teal-400
   text-slate-300
 }
</style>