<template>
  <div class="wrap" style="width:100%">
    <v-head></v-head>
    <v-con></v-con>
    <v-foot></v-foot>
  </div>
</template>

<script>
  
  import vHead from 'components/Head/LoginHeader'
  import vCon from 'components/Login/content'
  import vFoot from 'components/Foot/LoginFoot'

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
  height: 100%;
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
