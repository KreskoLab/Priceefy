<template>
  <section class="section pt-0 pb-6">
    <div class="columns mt-5">
      <div class="column is-offset-one-fifth is-three-fifths notification is-white p-5">
        <template v-if="$fetchState.pending">
          <b-skeleton height="500px" />
        </template>

        <template v-else>
          <h1 class="is-size-4 has-text-dark has-text-centered mb-2">{{good.title}}</h1>

          <div class="has-text-centered">
            <nuxt-picture :src="good.img" format="webp" width="300" height="300" :alt="good.title" />
          </div>
          
          <div v-if="good.country || good.producer">
            <Info :info="good" />
          </div>

          <div class="is-flex is-align-items-center mt-4">
            <b-icon icon="tag-outline" />
            <h2 class="is-size-5 has-text-dark has-text-weight-medium ml-2">Ціни</h2>
          </div>

          <div v-for="(price,i) in pricesSort" :key="price.i">  
            <Prices :item="price" />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import storesJSON from '~/static/stores.json'

export default {
  layout: 'none',
  async fetch() {
    await this.scan()
  },
  head() {
    if(this.good) {
      return {
        title: this.good.title + ' - Skiku'
      }
    }
  },
  computed: {
    city() {
      return this.$store.getters.getCity
    },
    pricesSort() {
      return this.prices.sort((a,b) => a.price - b.price)
    },
    stores() {
      return storesJSON.filter(store => store.name !== 'Сільпо')
    }
  },
  watch: {
    city() {
      this.prices = []
      this.$fetch()
    }
  },
  methods:{
    async scan() {
      for(var item of this.stores)
      {
        await this.$axios.$get(`zakaz/stores/${item[this.city]}/products/${this.$route.params.id}`, {
          headers: {
            'Accept-Language': 'uk'
          }
        })
        .then((res) => {
          this.good = {
            title: res.title,
            country: res.country ? res.country[0].toUpperCase() + res.country.slice(1) : '',
            producer: res.producer.trademark,
            img: res.img.s350x350
          }
          var price = {
            logo: item.img,
            store: item.name,
            img: item.img,
            price: res.price.toString().substring(0, res.price.toString().length - 2) + '.' + res.price.toString().slice(-2)
          }
          this.prices.push(price)
        })
        .catch(err => {})
      }
    }
  },
  data(){
    return{
      good: null,
      prices: [],
      store: this.$store.getters.getStore
    }
  }
}
</script>