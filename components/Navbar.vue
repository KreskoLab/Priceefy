<template>
  <div class="nav px-5 has-padding-top-15 has-padding-bottom-15">
    <NuxtLink class="is-inline-flex" to="/"> 
      <figure class="image is-32x32">
        <img src="/logo.svg" alt="Skiku">
      </figure>
      <p class="is-size-5 ml-2 mt-1">Skiku</p>
    </NuxtLink>

    <b-dropdown class="has-text-dark is-pulled-right" v-model="city" aria-role="list" position="is-bottom-left" :mobile-modal="false"> 
      <div class="is-clickable is-unselectable" slot="trigger" role="button">
        <b-icon icon="map-marker" />
        <span>{{city}}</span>
      </div>
      <b-dropdown-item :value="item" v-for="item in cities" :key="item">
        {{item}}
      </b-dropdown-item>
    </b-dropdown>

  </div>
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

.nav {
  position: relative;
  width: 100%;
  z-index: 4;
  top: 0;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: hsla(0,0%,100%,.75)
}

@media(max-width: 767px) {
  .nav {
    position: fixed;
    width: 100%;
    z-index: 4;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    background-color: hsla(0,0%,100%,.75)
  }
}
</style>