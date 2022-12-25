<template>
  <div class="page">
    <h2>My decks</h2>

    <div class="decks-list" v-if="!loadingDecks">
      <p v-if="decks.length === 0">You have no deck !</p>
      <div v-else>
        <deck v-for="(deck, index) in decks" :key="index" :image="deck.image" :name="deck.name" :count="deck.cards_count" :id="deck.id"></deck>
      </div>
    </div>
    <img v-else src="../assets/loading.gif" alt="" class="loading">
    
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

import Deck from '../components/Deck.vue'

export default {
  components: { Deck },
  beforeMount() {
    this.getDecks()
  },
  computed:{
    ...mapState('decks', ['decks', 'loadingDecks']),
  },
  methods:{
    ...mapActions('decks', ['getDecks']),
  }
}
</script>

<style scoped>
  .decks{
    padding: 30px;
  }

  .decks-list div{
    display: flex;
    flex-wrap: wrap;
  }

  .decks-list p{
    font-weight: bold;
  }
</style>