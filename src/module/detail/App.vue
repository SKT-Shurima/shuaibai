<template>
  <div class="wrap">
    <v-head></v-head>
    <v-content></v-content>
    <v-container></v-container>
    <v-slider></v-slider>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import vHead from 'components/Head/Head'
  import vSlider from 'components/Slider/Slider'
  import vContent from 'components/Details/content'
  import vContainer from 'components/Details/container'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vSlider,
      vContent,
      vContainer,
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
