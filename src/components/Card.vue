<template>
  <li class="card">
    <img :src="image.small" alt="card">
  </li>
</template>

<script>

export default {
  name: 'Card',
  props:{
    image: Object,
  },
}
</script>

<style scoped>
  .card{
    height: 206px;
    width: 156px;
    margin: 10px;
    display: inline-block;
  }
  .card img{
    width: 100%;
    height: 100%;
  }
  
</style>