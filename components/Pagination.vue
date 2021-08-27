<template>
  <b-pagination :total="items" v-model="page" :per-page="30" range-before="1" range-after="1" order="is-centered">

    <b-pagination-button
      slot-scope="props"
      :page="props.page"
      tag="nuxt-link"
      :to="`/store/${store}/${category}/${props.page.number}`">
      {{ (props.page.number) }}
    </b-pagination-button>

    <b-pagination-button slot="previous" slot-scope="props" :page="props.page" tag="nuxt-link" :to="`/store/${store}/${category}/${props.page.number}`">
      <span><-</span>
    </b-pagination-button>

    <b-pagination-button slot="next" slot-scope="props" :page="props.page" tag="nuxt-link" :to="`/store/${store}/${category}/${props.page.number}`">
      </span>-></span>
    </b-pagination-button>     

  </b-pagination>   
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {
      store: this.$route.params.id,
      category: this.$route.params.category
    }
  },
  computed: {
    page() {
      return Number(this.$route.params.page)
    }
  }
}
</script>