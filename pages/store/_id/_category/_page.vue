<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <b-skeleton width="20%" v-if="$fetchState.pending" />
      <Level :total="count" v-else />
    </div>

    <div class="column is-12-mobile is-6-tablet is-4-desktop" v-for="n in 12" v-if="$fetchState.pending">
      <b-skeleton height="300px" width="100%" />
    </div>
    
    <div class="column is-12-mobile is-6-tablet is-4-desktop" v-for="(item,i) in goods" :key="item.i" v-if="!$fetchState.pending">
      <Card 
        v-if="store.name == 'Сільпо'" 
        :good="item" 
        :store="store" 
      />
      <NuxtLink v-else :to="`/good/${item.ean}`">
        <Card 
          id="good" 
          :good="item" 
          :store="store" 
        />
      </NuxtLink>
    </div>
  
    <div class="column is-12">
      <Pagination :items="count" />
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    var storeID = this.store[this.city] // Город
    var categoryID = this.category[this.store.code] // Категория
    var end = 30 * this.page
    var start = end - 30 + 1

    if (this.store.name == 'Сільпо') { 
      await this.$axios.$post('silpo/api/2.0/exec/EcomCatalogGlobal', {
        method: "GetSimpleCatalogItems",
        data: {
          "categoryId": categoryID,
          "filialId": storeID,
          "From": start,
          "To": end,
          "sortBy": this.sort.code
        }
      })
      .then((res) => {
        this.goods = res.items.map(item => ({
          title: item.name,
          ean: item.id,
          img: item.mainImage,
          price: item.price,
          priceStopAfter: item.priceStopAfter ? item.priceStopAfter.toString().substr(0, 5) : item.priceStopAfter
        }))
        this.count = res.itemsCount
      })
    }
    else {
      await this.$axios.$get(`zakaz/stores/${storeID}/categories/${categoryID}/products/?page=${this.page}&sort=${this.sort.code}`, {
        headers: {
          'Accept-Language': 'uk'
        }
      })
      .then((res) => {
        this.goods = res.results.map(item => ({
          title: item.title,
          slug: item.slug,
          ean: item.ean,
          img: item.img.s350x350,
          price: item.price.toString().substring(0, item.price.toString().length - 2) + '.' + item.price.toString().slice(-2),
          priceStopAfter: item.discount.due_date ? item.discount.due_date.toString().substr(8, 4) +'.'+ item.discount.due_date.substr(5, 2) : item.discount.due_date
        }))
        this.count = res.count
      })
    }
  },
  computed: {
    sort() {
      return this.$store.getters.getSort
    },
    city() {
      return this.$store.getters.getCity
    },
    store() {
      return this.$store.getters.getStore
    },
    category() {
      return this.$store.getters.getCategory
    }
  },
  watch: {
    city() {
      this.$fetch()
    },
    sort() {
      this.$fetch()
    },
    store() {
      this.$store.commit('updateSort', this.sort)
      this.$router.push(`/store/${this.store.code}/${this.category[this.store.code]}/1`)
    },
    category() {
      this.$store.commit('updateSort', this.sort)
      this.$router.push(`/store/${this.store.code}/${this.category[this.store.code]}/1`)
    }
  },
  data() {
    return {
      goods: [],
      count: null,
      open: false,
      page: this.$route.params.page
    }
  }
}
</script>

<style>
.card{
  height: 100%;
}
#good {
  transition: 0.5s ease box-shadow, 0.3s ease transform;
}
#good:hover {
  box-shadow: 0px 10px 10px rgba(0,0,0,0.04); 
}
</style>