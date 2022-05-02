<template>
    <div class="flex flex-col rounded-md w-full lg:w-40 bg-slate-700/90 pt-0">
        <div class="w-max bg-slate-800/50 self-start rounded-br-lg rounded-tl-lg px-3 mb-1">
            <span class="uppercase text-slate-400 text-xs tracking-wider leading-6">{{header}}</span>
        </div>

        <div class="flex justify-center items-center mb-2">
            <span class="text-slate-300 text-center capitalize font-medium">{{text}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    header: string,
    text: string
}>()
</script>