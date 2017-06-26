<template>
  <div class="wrap">
    <v-head></v-head>
    <v-index></v-index>
    <v-content></v-content>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import vHead from 'components/Head/Head'
  import vIndex from 'components/Home/index'
  import vContent from 'components/Home/content'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vIndex,
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
