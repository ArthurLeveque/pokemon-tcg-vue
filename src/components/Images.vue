<template>
  <li class="image clickable" @click="imageModified(emoji)">
    {{ emoji }}
  </li>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props:{
    emoji: String,
  },
  methods:{
    ...mapActions('decks', ['imageModified']),
  }
}
</script>

<style scoped>
  .image{
    margin: 10px;
    display: inline-block;
    font-size: 30px;
  }
  
</style>