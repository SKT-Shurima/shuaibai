<template>
  <div class="wrap" style="width:100%">
    <v-head></v-head>
    <v-con></v-con>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import vHead from 'components/Head/submitHead'
  import vCon from 'components/AfterSale/content'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vCon,
      vFoot
    }
  }
</script>

<style>
html,body{
  width: 100%;
}
body{
  position: relative;
}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
