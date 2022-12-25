<template>
  <router-link :to="{ name: 'Details', params: { deck_id: id }}" class="deck">
    <div class="deck-picture-container">
      <span v-if="image" class="emoji">{{image}}</span>
      <span v-else class="emoji">🃏</span>
    </div>
    <p :class="count === 60 ? 'is-complete' : 'is-incomplete'">{{ name.length >= 30 ? name.substr(0,30)+"..." : name }}</p>

    <span v-if="count !== 60" class="tooltip">Your deck is incomplete, you only have {{ count }} cards out of 60 !</span>
  </router-link>
</template>

<script>
export default {
  name: 'Deck',
  props:{
    id: Number,
    image: String,
    name: String,
    count: Number
  },
}
</script>

<style scoped>
  .emoji{
    font-size: 100px;
  }

  .deck{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 250px;
    margin-right: 20px;
    margin-bottom: 20px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    position: relative;
  }

  .deck-picture-container{
    width: 180px;
    height: 180px;
    padding: 10px;
    outline: 8px solid #ffe163;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .deck-picture-container img{
    width: 100%;
    height: 100%;
  }

  p{
    margin-top: 20px;
  }

  .is-incomplete{
    color: red;
  }

  .is-complete{
    color: white;
  }

  .tooltip {
    visibility: hidden;
    width: 200px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .deck:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
</style>