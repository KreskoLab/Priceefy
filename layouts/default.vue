<template>
  <div>
    <Navbar />
    <div class="container is-fluid has-margin-top-90-mobile has-margin-top-40-tablet">
      <div class="columns">
        <Sidebar class="sidebar column is-3 mr-2 mt-3 is-hidden-mobile" />

        <b-button type="is-success" :icon-right="modal ? 'close' : 'menu'" size="is-medium" class="is-hidden-tablet" id="menu" @click="modal = !modal" />

        <b-modal
          v-model="modal"
          full-screen
          :can-cancel="false"
          scroll="clip"
        >
          <Sidebar />
        </b-modal>

        <div class="column is-9-desktop is-8-tablet">
          <Nuxt />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'route',
  data() {
    return {
      modal: false
    }
  }
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

#menu {
  position: fixed;
  bottom: 70px;
  right: 20px;
  z-index: 50;
  border-radius: 50%;
}

a {
  color: #363636;
}

a:hover {
  color: #94C7A6;
  cursor: pointer;
  text-decoration: none;
}
</style>
