<template>
  <div class="notification is-white" style="border-radius:2%">
    <h2 class="is-size-5 has-text-success mb-2">Магазин</h2>

    <b-radio class="mb-2 is-flex" 
      type="is-success" 
      v-model="store" 
      v-for="(item,i) in stores" 
      :key="item.i"
      :native-value="item"
      v-if="item[city]"
    >
      <figure class="image is-16x16 mx-2">
        <img :src="item.img" :alt="`${item.name} logo`">
      </figure>
      <span class="has-text-dark" style="white-space:pre">{{item.name}}</span>
    </b-radio>

    <h2 class="is-size-5 has-text-success mb-2">Товари</h2>

    <b-radio class="mb-2 is-flex" 
      type="is-success" 
      v-model="category" 
      v-for="(item,i) in categories" 
      :key="item.i" 
      :native-value="item"
    >
      <b-icon type="is-dark" class="mx-1" :icon="item.icon" />
      <span class="has-text-dark" style="white-space:pre">{{item.name}}</span>
    </b-radio>
  </div>
</template>

<script>
import categoriesJson from '~/static/categories.json'
import storesJson from '~/static/stores.json'

export default {
  data() {
    return {
      store: this.$store.getters.getStore,
      category: this.$store.getters.getCategory,
      stores: storesJson,
      categories: categoriesJson
    }
  },
  computed: {
    city() {
      return this.$store.getters.getCity
    },
    newStore() {
      return this.$store.getters.getStore
    }
  },
  watch: {
    store(val) {
      this.$store.commit('updateStore', val)
    },
    newStore(val) {
      this.store = val
    },
    category(val) {
      this.$store.commit('updateCategory', val)
    }
  }
}
</script>

<style>
span.icon.is-left{
  margin: 16px;
}
span.control-label{
  display: contents;
}
</style>