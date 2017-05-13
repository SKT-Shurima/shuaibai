<template>
  <div class="wrap">
    <v-head></v-head>
    <v-nav></v-nav>
    <v-slider></v-slider>
    <v-con></v-con>
    <v-back></v-back>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import vHead from 'components/Head/Head'
  import vNav from 'components/Head/Nav'
  import vSlider from 'components/Slider/Slider'
  import vCon from 'components/Snapup/content'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vSlider,
      vNav,
      vCon,
      vFoot
    }
  }
</script>

<style>
@import '../../common/css/common.scss'
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
