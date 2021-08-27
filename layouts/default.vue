<template>
  <div>
    <Navbar />
    <div class="container is-fluid mt-6">
      <div class="columns">
        <Sidebar class="sidebar column is-3 mr-2 is-hidden-mobile" />
        <b-collapse :open="false" class="is-hidden-tablet">
          <template #trigger>
            <b-button class="has-text-dark"
              label="Фільтри"
              type="is-white"
              expanded
            />
          </template>
          <Sidebar />
        </b-collapse>
        <div class="column is-9-desktop is-8-tablet">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'route'
}
</script>

<style lang="scss">
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s;
}

.page-enter, .page-leave-to {
  opacity: 0;
}

.sidebar {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  overflow-y: hidden;
  max-height: 100vh;
}

.sidebar:hover {
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0.4em;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 3px;

  &:hover {
   background: #818181;
  }
}
</style>
