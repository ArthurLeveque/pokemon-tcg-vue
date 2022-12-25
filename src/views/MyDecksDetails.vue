<template>
  <div class="page">
    <div class="name">
      <h2>{{ decks.name }}</h2>
      <span v-if="decks.image" class="emoji">{{decks.image}}</span>
      <span v-else class="emoji">🃏</span>
    </div>

    <div class="flex-details">
      <p>Cards : {{ decks.cards_count }} / 60</p>
      <router-link :to="{ name: 'Manager', params: { deck_id: deck_id }}" class="to-edit">Edit deck</router-link>
    </div>
    
    <filters-deck></filters-deck>

    <div v-if="!loading" class="flex-deck">
      <template v-if="Object.keys(cardsInDeck).length === 0">
        <div class="cards-list">
          <p>There is no cards in this deck yet.</p>
        </div>
      </template>
      <template v-else>
        <ul class="cards-list">
          <filtered-deck-cards v-for="(card, index) in cardsInDeck" :key="index" 
          :image="card.data.data[0].images" 
          :cardsInDeck="decks.cards" 
          :cardId="card.data.data[0].id" 
          :filters="filters" :pokemon_type="card.data.data[0].types" :pokemon_rarity="card.data.data[0].rarity" :set="card.data.data[0].set.id" :pokemon_name="card.data.data[0].name"></filtered-deck-cards>
        </ul>
        <div class="cards-indeck-list">
          <p>Cards in deck</p>
          <compact-deck-cards v-for="(card, index) in cardsInDeck" :key="index" 
          :image="card.data.data[0].images" :cardsInDeck="decks.cards" :cardId="card.data.data[0].id" :name="card.data.data[0].name"></compact-deck-cards>
        </div>
      </template>
    </div>
    <img v-else src="../assets/loading.gif" alt="" class="loading">

  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

import FilteredDeckCards from '../components/FilteredDeckCards.vue'
import CompactDeckCards from '../components/CompactDeckCards.vue'
import FiltersDeck from '../components/FiltersDeck.vue'

export default {
  components: { FilteredDeckCards, CompactDeckCards, FiltersDeck },
  data(){
      return {
        deck_id: this.$route.params.deck_id
      }
  },
  mounted() {
    this.RESET_FILTERS()
    this.findDeck(this.deck_id)
  },
  computed:{
    ...mapState('decks', ['decks']),
    ...mapState('cards', ['cardsInDeck', 'loading', 'filteredCards', 'filters']),
  },
  methods:{
    ...mapMutations('cards', ['RESET_FILTERS']),
    ...mapActions('decks', ['findDeck']),
  }
}
</script>

<style scoped>
  .deck-details{
    padding: 30px;
  }

  .cards-list{
    height: fit-content;
  }

  p{
    text-align: left;
  }

  .name{
    display: flex;
    align-items: center;
  }

  .name h2{
    margin-bottom: 0;
  }

  .name img{
    width: 50px;
    height: 50px;
    margin-left: 20px;
  }

  .flex-deck{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .cards-indeck-list{
    margin-left: 10px;
    padding: 20px 10px;
    background: linear-gradient(317deg, rgba(22,13,51,1) 0%, rgba(83,42,131,1) 100%);
    height: fit-content;
    box-shadow: 1px 1px 12px black;
  }

  .cards-indeck-list p {
    text-align: center;
    font-weight: bold;
    font-size: 150%;
    margin-bottom: 20px;
  }

  .emoji{
    margin-left: 10px;
    font-size: 30px;
  }

  .flex-details{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
  }

  .flex-details p{
    font-weight: bold;
  }

  .to-edit{
    padding: 10px 20px;
    text-decoration: none;
    color: white;
    background-color: #512980;
    font-weight: bold;
  }
</style>