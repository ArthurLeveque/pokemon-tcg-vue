<template>
  <div class="page">
    <div class="name">
      <input type="text" :value="decks.name" name="deck-name" id="deck-name" @input="nameModified">

      <span class="image-picker">
        <button @click="show_image_picker = !show_image_picker">
          <span v-if="decks.image" class="emoji">{{decks.image}}</span>
          <span v-else class="emoji">🃏</span>
        </button>
        <ul v-if="show_image_picker" class="images-list">
          <li class="close"><span @click="show_image_picker = false">X</span></li>
          <images v-for="(emoji, index) in emojis" :key="index" :emoji="emoji"></images>
        </ul>
      </span>
    </div>
    
    <div class="buttons">
      <p>Cards : {{ decks.cards_count }} / 60</p>

      <div>
        <button @click="deleteDeck">Delete this deck</button>

        <router-link :to="{ name: 'Details', params: { deck_id: deck_id }}">Stop editing</router-link>
      </div>
    </div>

    <filters></filters>

    <div class="flex">
      <div v-if="!loading">
        <ul class="cards-list">
          <template v-if="cards.data != ''">
            <deck-cards v-for="(card, index) in cards.data" :key="index" 
            :image="card.images"  :card_type="card.supertype" :cardsInDeck="decks.cards" :cardId="card.id" :clickable="true" :deck_id="deck_id"></deck-cards>
          </template>
          <p v-else>There is no cards matching your research</p>
        </ul> 
      </div>
      <img v-else src="../assets/loading.gif" alt="" class="loading">

      <div class="cards-indeck-list" v-if="cardsInDeck.length !== 0">
        <p>Cards in deck</p>
        <compact-deck-cards v-for="(card, index) in cardsInDeck" :key="index" 
        :image="card.data.data[0].images" :cardsInDeck="decks.cards" :cardId="card.data.data[0].id" :name="card.data.data[0].name" :deck_id="deck_id" 
        :clickable="true"></compact-deck-cards>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'


import DeckCards from '../components/DeckCards.vue'
import CompactDeckCards from '../components/CompactDeckCards.vue'
import Filters from '../components/Filters.vue'
import Images from '../components/Images.vue'

export default {
  components: { DeckCards, Filters, CompactDeckCards, Images},
  data(){
      return {
        deck_id: this.$route.params.deck_id,
        show_image_picker: false,
      }
  },
  mounted() {
    this.RESET_FILTERS()
    this.getCards()
    this.findDeck(this.deck_id)
  },
  computed:{
    ...mapState('decks', ['decks', 'emojis']),
    ...mapState('cards', ['cards', 'loading', 'cardsInDeck']),
  },
  methods:{
    ...mapMutations('cards', ['RESET_FILTERS']),
    ...mapActions('decks', ['findDeck', 'nameModified', 'deleteDeck']),
    ...mapActions('cards', ['getCards', 'getCardsFromDeck']),
  }
}
</script>

<style scoped>
  h2{
    text-align: left;
  }

  .loading{
    width: 100px;
    height: 100px;
  }

  .cards-list{
    height: fit-content;
  }

  .flex{
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

  .image-picker{
    position: relative;
  }

  .image-picker button{
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .image-picker button img{
    width: 50px;
    height: 50px;
  }

  .image-picker ul{
    position: absolute;
    left: 50%;
    background-color: white;
    width: 300px;
    z-index: 999;
  }

  .emoji{
    margin-left: 10px;
    font-size: 30px;
  }

  .name{
    display: flex;
    align-items: center;
  }

  .name input{
    font-size: 18px;
    padding: 5px;
  }

  .close{
    list-style-type: none;
    color: black;
    text-align: end;
    padding: 10px;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 1px solid #ededed;
  }

  .close span:hover{
    cursor: pointer;
  }

  .buttons{
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
  }

  .buttons div{
    display: flex;
    align-items: center;
  }

  .buttons div a{
    padding: 10px 20px;
    text-decoration: none;
    color: white;
    background-color: #512980;
    font-weight: bold;
    margin-left: 15px;
  }

  .buttons div button{
    padding: 10px 20px;
    text-decoration: none;
    color: white;
    background-color: #db1f1f;
    font-weight: bold;
    border: none;
    font-size: 16px;
  }

  .buttons div button:hover{
    cursor: pointer;
  }
</style>