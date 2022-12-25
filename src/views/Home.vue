<template>
  <div class="page">
    <h2>Cards list :</h2>

    <filters></filters>

    <ul v-if="!loading" class="cards-list">
      <template v-if="cards.data != ''">
        <card v-for="(card, index) in cards.data" :key="index" :image="card.images"></card>
      </template>
      <p v-else>There is no cards matching your research...</p>
    </ul>
    <img v-else src="../assets/loading.gif" alt="" class="loading">
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'

import Card from '../components/Card.vue'
import Filters from '../components/Filters.vue'

export default {
  name: 'Home',
  components: { Card, Filters },
  mounted() {
    this.RESET_FILTERS()
    this.getCards()
  },
  computed:{
    ...mapState('cards', ['cards', 'loading']),
  },
  methods:{
    ...mapMutations('cards', ['RESET_FILTERS']),
    ...mapActions('cards', ['getCards']),
  }
}
</script>

<style scoped>
</style>