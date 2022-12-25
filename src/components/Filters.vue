<template>
  <div class="inputs">
    <div class="filters">
      <p>Filters :</p>

      <select name="types" id="types" @change="filterModified">
        <option value="null">Type</option>
        <option v-for="(type, index) in types.data" :key="index" :value="type" v-bind:selected="filters.types == type">{{ type }}</option>
      </select>

      <select name="rarities" id="rarities" @change="filterModified">
        <option value="null">Rarity</option>
        <option v-for="(rarity, index) in rarities.data" :key="index" :value="rarity" v-bind:selected="filters.rarities == rarity">{{ rarity }}</option>
      </select>

      <select name="sets" id="sets" @change="filterModified">
        <option value="null">Set</option>
        <option v-for="(set, index) in sets.data" :key="index" :value="set.id" v-bind:selected="filters.sets == set.id">{{ set.name }}</option>
      </select>
    </div>

    <div class="search">
      <input type="text" name="name" id="name" placeholder="Search card by name..." @input="filterModified" :value="filters.name">
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  props:{
    deck: Boolean,
  },
  mounted() {
    this.getTypes()
    this.getRarities()
    this.getSets()
  },
  computed:{
    ...mapState('cards', ['types', 'rarities', 'sets', 'filters']),
  },
  methods:{
    ...mapActions('cards', ['getTypes', 'getRarities', 'getSets', 'filterModified']),
  }
}
</script>

<style scoped>
 .inputs{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;
    background-color: #512980;
    padding: 8px 10px;
    border-radius: 8px;
    box-shadow: 1px 1px 12px black;
  }

  .filters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 50%;
  }

  .filters p{
    font-weight: bold;
  }

  .filters p, .filters select {
    margin-right: 20px;
  }

  .filters select{
    padding: 3px;
    border-radius: 5px;
    font-weight: bold;
    background-color: #160D33;
    color: white;
    border: none;
    outline: none;
  }

  .filters select:last-child {
    margin-right: 0px;
  }

  .search input {
    display: flex;
    border: 8px solid #ffe163;
    border-radius: 5px;
    padding: 5px 3px;
  }
</style>