<template>
  <section class="indexBox">
    <!-- <div style="width:100%;height:2px;background:red;position:relative;top:542px;"></div> -->
    <div class='title'>
        <img src="../../assets/imgs/title.svg" alt="">
      </div>
      <div class="topBox"></div>
      <div class="content">
          <LeftChar class="leftBox"></LeftChar>
          <CenterChar class="centerBox"></CenterChar>
          <RightChar class="rightBox"></RightChar>
      </div>
  </section>
  
</template>

<script>
  import { mapState } from 'vuex'
  import LeftChar from './left.vue'
  import CenterChar from './center.vue'
  import RightChar from './right.vue'
  export default {
    name: 'index',
    components: {
      LeftChar,
      CenterChar,
      RightChar,
    },
    data () {
      return { 
        formData:{
          userName:'lss',
          passWord:'asd123',
        },
      }
    },
    methods: {
    },
    mounted() {
    },
    computed: mapState({
    }),
  }
</script>

<style lang="less">
 .indexBox{
   width:3840px;
   height:1080px;
 }
 .title{
   padding-top:44px;
 }
 .title img{
   display: block;
   width:674px;
   height:60px;
   margin:0 auto;
 }
 .topBox{
   width: 3840px;
   height:48px;
   background: url('../../assets/imgs/Group8.svg') 50% 50% no-repeat;
   background-size:cover;
   /* background-size:3840px 48px; */
 }
 .content{
   display: flex;
   margin-top:-20px;
 }
.leftBox{
  flex:1;
}
.rightBox{
  flex:1;
}
.centerBox{
  width:1540px;
  margin:0 40px;
}
</style>
  