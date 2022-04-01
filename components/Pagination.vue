<template>
  <div class="flex flex-row justify-center w-full h-full">

    <button
        class="btn_arrow rounded-l-3xl"
        :disabled="page === 1"
        @click="prev()"
    >
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <div class="flex bg-slate-800 border-y-2 border-slate-700 text-slate-300 shadow py-3 px-12">
      <span class="px-2 block w-6 text-slate-400">{{page}}</span>
      <span class="mx-2">/</span>
      <span class="px-2 block w-6">{{pages}}</span>
    </div>

    <button
        class="btn_arrow rounded-r-3xl"
        :disabled="page >= pages"
        @click="next()"
    >
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>

  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    default: 0
  },
  perPage: {
    type: Number,
    default: 30
  },
  query: {
    type: String,
    required: true
  },
  defaultPage: {
    type: String,
    default: "1"
  }
})

const router = useRouter();
const route = useRoute();

const pages = computed<number>(() => {
  return Math.ceil(props.count / props.perPage)
})

let page = useState<number>("page", () => 1)

page.value = Number(props.defaultPage)

function prev() {
  if (page.value !== 1) {
    page.value--
    router.push({path: route.path, query: {...route.query, [props.query]: page.value}})
  }
}

function next() {
  if (page.value < pages.value) {
    page.value++
    router.push({path: route.path, query: {...route.query, [props.query]: page.value}})
  }
}
</script>

<style scoped>
.btn_arrow {
  @apply
  outline-none
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
  disabled:active:border-slate-700
}
</style>