<template>
  <li v-if="(!filters.types || filters.types == pokemon_type) && (!filters.rarities || filters.rarities === pokemon_rarity) && (!filters.sets || filters.sets === set) && (!filters.name || pokemon_name.toUpperCase().includes(filters.name.toUpperCase()))" class="card">
    <img :src="image.small" alt="card">
    <template v-for="(card, index) in cardsInDeck" :key="index">
      <span class="in-deck" v-if="card.card_id == cardId">{{ card.quantity }}</span>
    </template>
  </li>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props:{
    image: Object,
    cardId: String,
    cardsInDeck: Object,
    clickable: Boolean,
    deck_id: String,
    card_type: String,
    pokemon_type: Object,
    pokemon_rarity: String,
    set: String,
    pokemon_name: String,
    filters: Object,
  },
   methods:{
    ...mapActions('cards', ['addCard']),
  }
}
</script>

<style scoped>
  .card{
    height: 206px;
    width: 156px;
    margin: 10px;
    display: inline-block;
    position: relative;
  }
  .card img{
    width: 100%;
    height: 100%;
  }

  .in-deck{
    position: absolute;
    top: 10px;
    right: 10px;
    background: #160D33;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>