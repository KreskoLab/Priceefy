<template>
  <div class="h-screen overflow-auto bg-slate-900">
    <Navbar />

    <div class="flex space-x-2 container mx-auto px-4 sm:px-0 lg:px-8 pt-10">
      <Sidebar />
      <slot/>
    </div>

  </div>
</template>

<script>
export default {
  name: "default"

}
</script>

<style scoped>

</style>