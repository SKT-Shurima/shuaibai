<template>
  <div class="wrap" style="width:100%">
    <v-head></v-head>
    <v-nav></v-nav>
    <v-con></v-con>
    <v-foot></v-foot>
  </div>
</template>

<script>
  
  import vHead from 'components/Head/Head'
  import vNav from 'components/Head/nav'
  import vCon from 'components/Theme/goodIntegral'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vNav,
      vCon,
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
