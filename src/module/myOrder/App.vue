<template>
  <div class="wrap">
    <div class="head_wrap">
      <div class="headTop">
        <v-head></v-head>
      </div>
    </div>
    <v-content></v-content>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import vHead from 'components/Head/headTop'
  import vContent from 'components/MyOrder/content'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vContent,
      vFoot
    }
  }
</script>

<style lang='scss'>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .head_wrap{
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: #f7f7f7;
      border-bottom: #eee solid 1px;
      line-height: 30px;
      position: relative;
      z-index: 90;
      .headTop{
        width: 1250px;
        margin: 0px auto;
      }
    }
</style>
