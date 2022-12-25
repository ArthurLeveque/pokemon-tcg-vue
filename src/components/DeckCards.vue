<template>
  <li class="card" v-bind:class="{'clickable': clickable}" @click="clickable && addCard({card_id: cardId, deck_id: deck_id, card_type: card_type})">
    <img :src="image.small" alt="card">
    <template v-for="(card, index) in cardsInDeck" :key="index">
      <span class="in-deck" v-if="card.card_id == cardId">{{ card.quantity }}</span>
    </template>
  </li>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Card',
  props:{
    image: Object,
    cardId: String,
    cardsInDeck: Object,
    clickable: Boolean,
    deck_id: String,
    card_type: String
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

  .in-deck::after{
    position: absolute;
    content: '';
    outline: 4px solid red;
    width: 156px;
    height: 206px;
    top: -10px;
    right: -10px;
  }

  .clickable:hover{
    outline: 4px solid red;
  }
</style>