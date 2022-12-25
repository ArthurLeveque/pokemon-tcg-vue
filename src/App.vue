<template>
  <div id="nav">
    <h1><span>Pokemon TCG</span> decks manager</h1>
    <div class="nav-links">
      <router-link to="/">Home</router-link> |
      <router-link to="/my-decks">My decks</router-link>
      <div class="to-create" @click="createDeck">
        <p>Create deck</p>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
import {mapActions} from 'vuex'

export default {
   methods:{
    ...mapActions('decks', ['createDeck']),
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

body{
  background-color: #160D33;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background: linear-gradient(150deg, rgba(22,13,51,1) 0%, rgba(83,42,131,1) 100%);
  color: white;
}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

#nav a:hover {
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #ffe163;
}

#nav a.router-link-exact-active:hover {
  cursor: default;
  text-decoration: none;
}

.nav-links{
  display: flex;
  align-items: center;
}

.to-create{
  padding: 10px;
  background-color: #160D33;
  margin-left: 15px;
  font-weight: bold;
}

.to-create:hover{
  cursor: pointer;
}

.cards-list{
  list-style-type: none;
}

.clickable{
  cursor: pointer;
}

h1{
  font-weight: normal;
}

h1 span{
  font-weight: bold;
  color: #ffe163;
}

.page{
  padding: 30px;
  color: white;
}

h2{
  font-size: 35px;
  text-align: left;
  margin-bottom: 20px;
}

.loading{
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
</style>
