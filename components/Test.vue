<template>
  <b-navbar class="px-3 has-padding-top-10-tablet has-padding-bottom-10-tablet" :fixed-top="false" :mobile-burger="false">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="/logo.svg"
          alt="Skiku"
        >
        <span class="is-size-5 ml-2">Skiku</span>
      </b-navbar-item>
      <b-navbar-item class="navbar-item is-hidden-desktop" tag="div" style="margin-left:auto">
        <b-dropdown v-model="city" aria-role="list" position="is-bottom-left" :mobile-modal="false"> 
          <div class="navbar-item is-clickable" slot="trigger" role="button">
            <b-icon icon="map-marker" />
            <span class="is-unselectable">{{city}}</span>
          </div>
          <b-dropdown-item :focusable="false" :value="item" v-for="item in cities" :key="item">
            {{item}}
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
    </template>

    <template #end>
      <b-dropdown class="mr-2 has-text-dark" v-model="city" aria-role="list" position="is-bottom-left"> 
        <div class="navbar-item is-clickable" slot="trigger" role="button">
          <b-icon icon="map-marker" />
          <span class="is-unselectable">{{city}}</span>
        </div>
        <b-dropdown-item :focusable="false" :value="item" v-for="item in cities" :key="item">
          {{item}}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-navbar>
</template>

<script>
import storesJson from '~/static/stores.json'

export default {
  data(){
    return{
      cities: ['Київ', 'Львів', 'Дніпро', 'Одеса', 'Харків'],
      city: this.$store.getters.getCity,
      stores: storesJson
    }
  },
  computed: {
    store() {
      return this.$store.getters.getStore
    }
  },
  created() {
    this.$store.dispatch('check')
  },
  watch: {
    city(val) {
      if (!Object.keys(this.store).includes(this.city)) { 
        var newStore = this.stores.find(item => Object.keys(item).includes(this.city))
        this.$store.commit('updateStore', newStore)
      } 
      this.$store.commit('updateCity', val)
    }
  }
}

</script>

<style>
.dropdown-content{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem;border:1px solid #dbdbdb;border-radius:6px}
.dropdown-menu{min-width:110px!important;transition-duration:86ms;transition-property:opacity,transform}
.dropdown-item{padding:.375rem 1rem;padding-right:3rem;white-space:nowrap}

.navbar{
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: hsla(0,0%,100%,.75)!important
}

</style>