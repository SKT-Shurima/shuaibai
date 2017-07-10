<template>
  <div class="wrap" style="width:100%">
    <v-head ref='head'></v-head>
    <v-content @sendShopCar='getShopCar' @getCol='getColList'></v-content>
    <v-slider></v-slider>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import vHead from 'components/Head/Head'
  import vSlider from 'components/Slider/Slider'
  import vContent from 'components/GoodDetails/content'
  import vFoot from 'components/Foot/Foot'

  export default {
    name: 'app',
    components: {
      vHead,
      vSlider,
      vContent,
      vFoot
    },
    methods:{
      // 获取收藏列表
      getColList(){
         this.$refs.head.$refs.headTop.initList() ;
      },
      // 获取购物车信息
      getShopCar(){
        this.$refs.head.$refs.search.initList() ;
      }
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
