<template>
  <div class="mt-3">
    <nav class="level is-mobile is-size-6 has-text-weight-normal notification is-light p-3 mb-3">
      <div class="level-left">
        <div class="level-item has-text-grey-dark">
          <figure class="image is-24x24 mr-2">
            <img :src="item.img">
          </figure>
          {{item.store}}
        </div>
      </div>
      <div class="level-right">
        <p class="level-item has-text-success-dark">
          <грн> {{item.price}}
        </p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>