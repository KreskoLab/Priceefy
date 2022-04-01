<template>
  <div class="fixed w-64 h-full hidden xl:block">

    <div class="h-max px-2 py-4">
      <SidebarBlock title="Магазини" :items="stores" :state="store"/>

      <SidebarBlock title="Категорії" :items="categories" :state="category"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useSelectedStore, useSelectedCategory } from "~/composables/states";

const config = useRuntimeConfig();
const store = useSelectedStore();
const category = useSelectedCategory();

const { data: stores } = await useFetch(`${config.baseAPI}/store`)

const { data: categories } = await useFetch(`${config.baseAPI}/category`, {
  transform: (res: Array<object>) => res.map(({name, slug, icon}) => ({name, slug, image: icon}))
})
</script>
