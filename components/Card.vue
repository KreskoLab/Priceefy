<template>
  <div class="card px-6">

    <div class="card-image has-text-centered">
      <nuxt-picture :src="good.img" format="webp" width="350" height="350" :alt="good.title" />
    </div>

    <div class="media mt-1 mb-0">
      <div class="media-content has-text-centered">
        <p class="has-text-dark">{{good.title}}</p>
      </div>
    </div>

    <div class="card-content">
      <div class="content has-text-centered">
        <span class="tag is-danger is-light" v-if="good.priceStopAfter">
          <span class="is-size-5">
            <грн> {{good.price}}<span class="is-size-6"> до {{ good.priceStopAfter }}</span> 
          </span>
        </span>
    
        <span class="tag is-success is-light" v-else>
          <span class="is-size-5"><грн> {{good.price}}</span>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    good: {
      type: Object
    },
    store: {
      type: Object
    }
  }
}
</script>