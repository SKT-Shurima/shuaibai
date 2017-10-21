<template>
  <div class="wrap" style="width:100%">
    <v-head></v-head>
    <v-slider></v-slider>
    <v-content></v-content>
    <v-foot></v-foot>
  </div>
</template>

<script>
  
  import vHead from 'components/Head/Head'
  import vSlider from 'components/Slider/Slider'
  import vContent from 'components/StoreDetail/content'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vSlider,
      vContent,
      vFoot
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
