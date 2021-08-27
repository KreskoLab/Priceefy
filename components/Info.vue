<template>
  <div>
    <div class="is-flex is-align-items-center">
      <b-icon icon="information-outline" />
      <h2 class="is-size-5 has-text-weight-medium has-text-dark ml-2">Інформація</h2>
    </div>
    <nav class="level is-mobile is-size-6 has-text-grey-dark notification is-light p-3 mb-2 mt-3" v-if="info.country">  
      <div class="level-left">
        <p class="level-item">
          Країна
        </p>
      </div>
      <div class="level-right">
        <p class="level-item">
          {{info.country}}
        </p>
      </div>
    </nav>

    <nav class="level is-mobile is-size-6 has-text-grey-dark notification is-light p-3 mb-2 mt-3" v-if="info.producer">  
      <div class="level-left">
        <p class="level-item">
          ТМ
        </p>
      </div>
      <div class="level-right">
        <p class="level-item">
          {{info.producer}}
        </p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  }
}
</script>