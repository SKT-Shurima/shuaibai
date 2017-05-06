<template>
  <div class="wrap">
    <v-head></v-head>
    <v-slider></v-slider>
    <v-index></v-index>
    <v-content></v-content>
    <v-recommend></v-recommend>
    <v-back></v-back>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import vHead from 'components/Head/Head'
  import vSlider from 'components/Slider/Slider'
  import vIndex from 'components/Home/index'
  import vContent from 'components/Home/content'
  import vRecommend from 'components/Home/recommend'
  import vBack from 'components/Slider/Back_top'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vSlider,
      vIndex,
      vContent,
      vRecommend,
      vBack,
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
