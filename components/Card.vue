<template>
  <div
      class="
        flex flex-col space-y-12
        w-full h-full min-w-[320px]
        bg-slate-800
        outline outline-2 outline-slate-700
        border-4 border-transparent
        rounded-md
        hover:border-teal-400 hover:outline-transparent
        transition duration-200 ease-in-out
        p-5
      "
  >
    <div class="flex space-x-6">

      <div class="flex justify-center items-center shrink-0 w-24 h-24 bg-slate-700/90 rounded-md">
        <img
            class="h-16 w-16"
            :src="`${config.baseImages}/products/${image}`"
            :alt="props.name"
        >
      </div>

      <div class="flex flex-col space-y-2 pt-0.5">
        <h2 class="text-lg text-slate-200 line-clamp-2">{{props.name}}</h2>
        <span class="w-max bg-teal-600/40 rounded px-2 text-slate-200">&lt;грн&gt; 13 - &lt;грн&gt; 50</span>
      </div>

    </div>

    <div class="flex space-x-4 items-center text-sm text-slate-400">

      <div class="flex items-center space-x-2">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
        <span>{{weight}} {{unit}}</span>
      </div>

      <div class="flex items-center space-x-2">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{country}}</span>
      </div>

      <div class="flex items-center space-x-2 overflow-hidden !ml-auto">
        <svg class="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5.295 11V5.995H7V5H2.403v.994h1.701V11h1.19zm3.397 0V7.01h.058l1.428 3.239h.773l1.42-3.24h.057V11H13.5V5.001h-1.2l-1.71 3.894h-.039l-1.71-3.894H7.634V11h1.06z"/>
          <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
        </svg>
        <span class="w-16 truncate">{{trademark}}</span>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {defineProps} from "@vue/runtime-core";

const props = defineProps<{
  name: string,
  image: string,
  country: string,
  weight: number,
  unit: string,
  trademark: string,
  prices: object[]
}>()

const config = useRuntimeConfig()
</script>