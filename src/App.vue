<template>
  <div id="app">
    <span class='testText'>内测版</span>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
    }
  },
  created(){
  },
  methods:{
  },
  components:{
  }
}
</script>

<style lang="less">
  @import './assets/css/main.less';
  @import './assets/iconfont/iconfont.css';
  @import './assets/css/font.css';
  *{
    padding: 0;
    margin: 0;
  }
  html, body{
    /* webkit-overflow-scrolling : touch; */
    height: 100%;
    margin: 0;
    width:100%;
    background: url('../src/assets/imgs/background.png') 50% 50% no-repeat;
    background-size:cover;
    overflow:hidden;
  }
  #app {
    font-family: 'PFSC','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
  .testText{
    color:rgba(255,255,255,0.3);
    font-size:72px;
    line-height: 1.5;
    position: absolute;
    left:40px;
    top:10px;
  }
</style>
