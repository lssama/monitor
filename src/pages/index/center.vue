<template>
    <div class="cTop">
      <NumCount></NumCount>
      <Effect></Effect>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Effect from '../common/effect.vue'
  import NumCount from '../common/numCount.vue'
  export default {
    name: 'center',
    components: {
    },
    data () {
      return { 
        nowTime:'',
        clearTime:'',
      }
    },
    mounted(){
    },
    methods: {
      getTime(){
      }
    },
    components:{
      Effect,
      NumCount,
    },
    computed: mapState({
    }),
  }
</script>
 
<style lang="less">
  @import '../../assets/css/main.less';
  .cTop{
    width:1540px;
    height:100%;
    background: url('../../assets/imgs/zhongjianxin.svg') 50% 50% no-repeat;
    background-size: contain;
    margin-top:55px;
    position: relative;
    left:-12px;
  }
</style>
  