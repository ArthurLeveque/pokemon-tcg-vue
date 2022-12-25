<template>
  <template v-for="(card, index) in cardsInDeck" :key="index">
    <template v-if="card.card_id == cardId">
      <div class="card" v-bind:class="{'clickable': clickable}" @click="clickable && deleteCard({card_id: card.id, deck_id: deck_id})">
        <div class="card-bg" v-bind:style="{ backgroundImage: 'url(' + image.small + ')' }"></div>

        <div class="card-text">
          <span >{{ card.quantity }}</span>
          <p>{{ name.length >= 15 ? name.substr(0,15)+"..." : name }}</p>
        </div>

      </div>
    </template>
  </template>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Card',
  props:{
    image: Object,
    cardId: String,
    cardsInDeck: Object,
    name: String,
    clickable: Boolean,
    deck_id: String
  },
  methods:{
    ...mapActions('cards', ['deleteCard']),
  }
}
</script>

<style scoped>
  .card{
    width: 250px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
  }

  .card-bg{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-size: 300px 352px;
    background-position: 50% 25%;
    width: 100%;
    height: 100%;
    filter: blur(1px);
    -webkit-filter: blur(1px);
  }

  .card-text {
    z-index: 2;
    display: flex;
    padding: 10px;
    position: relative;
  }

  span{
    margin-right: 20px;
  }

  p, span{
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 2px black;
    font-size: 130%;
  }
</style>